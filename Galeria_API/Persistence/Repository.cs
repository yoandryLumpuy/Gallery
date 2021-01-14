using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core.Model;
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
    }
}
