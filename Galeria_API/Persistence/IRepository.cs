using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core;
using Galeria_API.Core.Model;
using Galeria_API.DataTransferObjects;

namespace Galeria_API.Persistence
{
    public interface IRepository
    {
        Task<User> GetUser(int id);
        Task<Picture> GetPicture(int id);
        Task<PaginationResult<Picture>> GetPictures(QueryObject queryObject);
        Task<bool> AddComment(int userId, int pictureId, AddCommentDto commentDto);
        Task<PaginationResult<User>> GetUsers(QueryObject queryObject);
    }
}
