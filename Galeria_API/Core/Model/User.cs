using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Operations;

namespace Galeria_API.Core.Model
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }
        public virtual ICollection<UserLikesPicture> UserLikesPicture { get; set; }
        public virtual ICollection<PointOfView> PointsOfView { get; set; }
        
    }
}
