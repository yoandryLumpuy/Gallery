using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core;
using Galeria_API.Core.Model;
using Galeria_API.DataTransferObjects;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Galeria_API.Persistence
{
    public class Repository : IRepository
    {
        private readonly GalleryDbContext _galleryDbContext;
        private readonly UserManager<User> _userManager;

        public Repository(GalleryDbContext galleryDbContext, UserManager<User> userManager)
        {
            _galleryDbContext = galleryDbContext;
            _userManager = userManager;
        }
        public async Task<User> GetUser(int id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<Picture> GetPicture(int id)
        {
            return await _galleryDbContext.Pictures.SingleOrDefaultAsync(pic => pic.Id == id);
        }

        public async Task<PaginationResult<Picture>> GetPictures(QueryObject queryObject)
        {
            var query = _galleryDbContext.Pictures.AsQueryable();

            if (queryObject.UserId.HasValue)
            {
                query = query.Where(pic => pic.OwnerUserId == queryObject.UserId.Value);
            }

            if (!string.IsNullOrWhiteSpace(queryObject.SortBy) &&
                string.Compare(queryObject.SortBy, "UploadedDateTime", StringComparison.OrdinalIgnoreCase) == 0)
            {
                query = queryObject.IsSortAscending 
                        ? query.OrderBy(pic => pic.UploadedDateTime) 
                        : query.OrderByDescending(pic => pic.UploadedDateTime);
            }

            return await PaginationResult<Picture>.CreateAsync(query, queryObject.Page, queryObject.PageSize);
        }

        public async Task<Picture> AddComment(int userId, int pictureId, AddCommentDto commentDto)
        {
            try
            {
                var pointOfView = _galleryDbContext.PointsOfView.AsQueryable()
                    .Where(pOv => pOv.UserId == userId && pOv.PictureId == pictureId).FirstOrDefault();
                var added = pointOfView == null;

                pointOfView = pointOfView ?? new PointOfView()
                {
                    Points = commentDto.Points,
                    Comment = commentDto.Comment,
                    PictureId = pictureId,
                    UserId = userId,
                    AddedDateTime = DateTime.Now
                };
                pointOfView.Points = commentDto.Points;
                pointOfView.Comment = commentDto.Comment;
                pointOfView.AddedDateTime = DateTime.Now;
                
                if (added) await _galleryDbContext.PointsOfView.AddAsync(pointOfView);

                await _galleryDbContext.SaveChangesAsync();
                return await GetPicture(pictureId);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<Picture> Uncomment(int userId, int pictureId)
        {
            try
            {
                var pointOfView = _galleryDbContext.PointsOfView.AsQueryable()
                    .Where(pOv => pOv.UserId == userId && pOv.PictureId == pictureId)
                    .FirstOrDefault();
                if (pointOfView == null) return null;

                _galleryDbContext.PointsOfView.Remove(pointOfView);
                
                await _galleryDbContext.SaveChangesAsync();
                return await GetPicture(pictureId);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<Picture> ModifyFavorites(int userId, int pictureId)
        {
            try
            {
                var favorite = await _galleryDbContext.UserLikes
                    .FirstOrDefaultAsync(fav => fav.UserId == userId && fav.PictureId == pictureId);

                if (favorite == null)
                    await _galleryDbContext.UserLikes.AddAsync(new UserLikesPicture()
                    {
                        UserId = userId,
                        PictureId = pictureId
                    });
                else
                    _galleryDbContext.UserLikes.Remove(favorite);

                await _galleryDbContext.SaveChangesAsync();
                return await GetPicture(pictureId);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<PaginationResult<User>> GetUsers(QueryObject queryObject)
        {
            var query = _galleryDbContext.Users.AsQueryable();

            if (queryObject.UserId.HasValue)
            {
                query = query.Where(user =>  user.Id == queryObject.UserId.Value);
            }
            return await PaginationResult<User>.CreateAsync(query, queryObject.Page, queryObject.PageSize);
        }
        
        public async Task<bool> YouLikeIt(int userId, int pictureId)
        {
            return await _galleryDbContext.UserLikes.AnyAsync(userLikes =>
                userLikes.UserId == userId && userLikes.PictureId == pictureId);
        }

        public async Task<PointOfView> YourComment(int userId, int pictureId)
        {
            return await _galleryDbContext.PointsOfView.SingleOrDefaultAsync(pOv => pOv.UserId == userId && pOv.PictureId == pictureId);
        }
    }
}
