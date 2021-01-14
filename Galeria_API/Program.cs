using Galeria_API.Core.Model;
using Galeria_API.Extensions;
using Galeria_API.Persistence;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace Galeria_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var hostBuilder = CreateWebHostBuilder(args).Build();
            using (var serviceScope = hostBuilder.Services.CreateScope())
            {
                var serviceProvider = serviceScope.ServiceProvider;
                try
                {
                    var dbContext = serviceProvider.GetRequiredService<GalleryDbContext>();
                    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
                    var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
                    dbContext.Database.Migrate();
                    ExtensionMethods.SeedUsers(userManager, roleManager);
                }
                catch (Exception ex)
                {
                    var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                    logger.Log(LogLevel.Error, $"An error has occured during migration!. - {ex.Message}" );
                }
            }
            hostBuilder.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
