using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Galeria_API.Core.Model
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles{ get; set; }
    }
}
