using System.Collections.Generic;
using System.Linq;
using Galeria_API.Core.Model;
using Microsoft.AspNetCore.Identity;

namespace Galeria_API.Extensions
{
    public class ExtensionMethods
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (userManager.Users.Any()) return;

            var roles = new List<Role>()
            {
                new Role(){Name = Constants.RoleNameAdmin},
                new Role(){Name = Constants.RoleNamePainter},
                new Role(){Name = Constants.RoleNameNormalUser}
            };

            roles.ForEach(role => roleManager.CreateAsync(role).Wait()); 

            var adminUser = new User(){UserName = "admin"};
            userManager.CreateAsync(adminUser, "Password*123").Wait();
            userManager.AddToRoleAsync(adminUser, Constants.RoleNameAdmin).Wait();
        }
    }
}
