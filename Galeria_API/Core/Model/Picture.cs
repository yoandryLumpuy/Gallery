using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Galeria_API.Core.Model
{
    public class Picture
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public virtual User OwnerUser { get; set; }
        public virtual int OwnerUserId { get; set; }
        public DateTime UploadedDateTime { get; set; }

        public virtual ICollection<UserLikesPicture> UserLikes { get; set; }
        public virtual ICollection<PointOfView> PointsOfView{ get; set; }
    }
}
