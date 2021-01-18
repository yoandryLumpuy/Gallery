using Galeria_API.Core;
using Galeria_API.Core.Model;
using Galeria_API.Extensions;
using Galeria_API.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;
using AutoMapper;
using Galeria_API.Mapping;

namespace Galeria_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<GalleryDbContext>(dbContextOptionsBuilder =>
            {
                dbContextOptionsBuilder.UseLazyLoadingProxies(); 
                dbContextOptionsBuilder.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            var identityBuilder = services.AddIdentityCore<User>(identityOptions =>
            {
                identityOptions.Password = new PasswordOptions()
                {
                    RequireDigit = true,
                    RequireNonAlphanumeric = true,
                    RequiredLength = 8,
                    RequireUppercase = true
                };
            });
            identityBuilder = new IdentityBuilder(identityBuilder.UserType, typeof(Role), identityBuilder.Services);
            identityBuilder.AddEntityFrameworkStores<GalleryDbContext>();
            identityBuilder.AddRoleValidator<RoleValidator<Role>>();
            identityBuilder.AddRoleManager<RoleManager<Role>>();
            identityBuilder.AddUserManager<UserManager<User>>();
            identityBuilder.AddSignInManager<SignInManager<User>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = 
                            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:SecurityKey").Value))
                    };
                });

            services.AddMvc(mvcOptions =>
                {
                    var authorizationPolicy = 
                        new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

                    mvcOptions.Filters.Add(new AuthorizeFilter(authorizationPolicy));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(mvcJasonOptions => 
                    mvcJasonOptions.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Constants.PolicyNameAdmin, policyBuilder => { policyBuilder.RequireRole(Constants.RoleNameAdmin); });
                options.AddPolicy(Constants.PolicyNameOnlyWatch, policyBuilder => { policyBuilder.RequireRole(Constants.RoleNameAdmin, Constants.RoleNameNormalUser, Constants.RoleNamePainter); });
                options.AddPolicy(Constants.PolicyNameUploadingDownloading, policyBuilder => { policyBuilder.RequireRole(Constants.RoleNameAdmin, Constants.RoleNamePainter); });
            });

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRepository, Repository>();

            var mapperConfiguration = new MapperConfiguration(options => { options.AddProfile(new MappingProfile()); });
            var mapper = mapperConfiguration.CreateMapper();
            services.AddSingleton(mapper);

            services.Configure<PictureSettings>(Configuration.GetSection("PictureSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();  
            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(name: "spa-Fallback",
                    defaults: new {Controller = "Fallback", Action = "Index"});
            });
        }
    }
}
