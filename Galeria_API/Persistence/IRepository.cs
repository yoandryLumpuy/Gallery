using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core.Model;

namespace Galeria_API.Persistence
{
    public interface IRepository
    {
        Task<User> GetUser(int id);
        Task<Picture> GetPicture(int id);
    }
}
