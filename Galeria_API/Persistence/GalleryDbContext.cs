using Galeria_API.Core.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Galeria_API.Persistence
{
    public class GalleryDbContext : IdentityDbContext<User, Role,int, IdentityUserClaim<int>,UserRole,IdentityUserLogin<int>,IdentityRoleClaim<int>,IdentityUserToken<int>>
    {
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<PointOfView> PointsOfView { get; set; }
        public DbSet<UserLikesPicture> UserLikes { get; set; }
        
        public GalleryDbContext(DbContextOptions<GalleryDbContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                // userRole (* <-> 1) User
                userRole.HasOne(ur => ur.User)
                    .WithMany(user => user.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);

                // userRole (* <-> 1) Role
                userRole.HasOne(ur => ur.Role)
                    .WithMany(role => role.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });

            //Pictures 
            builder.Entity<Picture>()
                .HasKey(picture => picture.Id);
            builder.Entity<Picture>()
                .Property(pic => pic.Name)
                .IsRequired();
            builder.Entity<Picture>()
                .Property(pic => pic.UploadedDateTime)
                .IsRequired();

            builder.Entity<Picture>()
                .HasOne(picture => picture.OwnerUser)
                .WithMany(user => user.Pictures)
                .HasForeignKey(picture => picture.OwnerUserId)
                .OnDelete(DeleteBehavior.Cascade);


            //UserLikesPicture
            builder.Entity<UserLikesPicture>()
                .HasKey(userLikesPicture => new {userLikesPicture.UserId, userLikesPicture.PictureId});

            builder.Entity<UserLikesPicture>(userLikesPicture =>
            {
                userLikesPicture.HasKey(uLp => new { uLp.UserId, uLp.PictureId });

                userLikesPicture.HasOne(uLp => uLp.Picture)
                    .WithMany(picture => picture.UserLikes)
                    .HasForeignKey(uLp => uLp.PictureId)
                    .OnDelete(DeleteBehavior.Cascade);

                userLikesPicture.HasOne(uLp => uLp.User)
                    .WithMany(user => user.UserLikesPicture)
                    .HasForeignKey(uLp => uLp.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            //PointOfView
            builder.Entity<PointOfView>()
                .HasKey(pointsOfView => new { pointsOfView.UserId, pointsOfView.PictureId });

            builder.Entity<PointOfView>(pointOfView =>
            {
                pointOfView.HasKey(pOv => new { pOv.UserId, pOv.PictureId});

                pointOfView.HasOne(pOv => pOv.Picture)
                    .WithMany(picture => picture.PointsOfView)
                    .HasForeignKey(uLp => uLp.PictureId)
                    .OnDelete(DeleteBehavior.Cascade);

                pointOfView.HasOne(pOv => pOv.User)
                    .WithMany(user => user.PointsOfView)
                    .HasForeignKey(uLp => uLp.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<PointOfView>()
                .Property(pOv => pOv.Comment).HasMaxLength(256);
        }
    }
}
