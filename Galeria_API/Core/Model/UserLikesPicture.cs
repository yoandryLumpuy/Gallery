using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Galeria_API.Core.Model
{
    public class UserLikesPicture
    {
        public virtual User User { get; set; }
        public  int UserId { get; set; }
        public virtual Picture Picture{ get; set; }
        public int PictureId { get; set; }
    }
}
