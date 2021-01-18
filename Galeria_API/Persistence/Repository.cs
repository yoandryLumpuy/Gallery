using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core;
using Galeria_API.Core.Model;
using Galeria_API.DataTransferObjects;
using Microsoft.AspNetCore.Identity;
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

        public async Task<PagedList<Picture>> GetPictures(QueryObject queryObject)
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

            return await PagedList<Picture>.CreateAsync(query, queryObject.Page, queryObject.PageSize);
        }
    }
}
