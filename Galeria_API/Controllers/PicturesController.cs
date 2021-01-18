using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core;
using Galeria_API.Core.Model;
using Galeria_API.Extensions;
using Galeria_API.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.StaticFiles;

namespace Galeria_API.Controllers
{
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IUnitOfWork _unitOfWork;

        public PicturesController(IRepository repository, IHostingEnvironment hostingEnvironment, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("api/user/{userId}/pictures")]
        [Authorize(Policy = Constants.PolicyNameUploadingDownloading)]
        public async Task<IActionResult> UploadPicture(int userId, [FromHeader]IFormFile file)

        {
            var user = await _repository.GetUser(userId);
            if (user == null) return NotFound("User not found!");

            var directory = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);
            var filePath = Path.Combine(directory, Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            var pic = new Picture()
            {
                Path = filePath,
                Name = Path.GetFileNameWithoutExtension(file.FileName),
                OwnerUserId = userId,
                UploadedDateTime = DateTime.Now
            };
            user.Pictures.Add(pic);
            await _unitOfWork.CompleteAsync();
            
            return CreatedAtRoute("GetPicture",new {Controller = "Pictures", id = pic.Id}, pic);
        }

        [HttpGet("api/pictures/{id}", Name = "GetPicture")]
        [Authorize(Policy = Constants.PolicyNameUploadingDownloading)]
        public async Task<IActionResult> GetPicture(int id)
        {
            var pic = await _repository.GetPicture(id);
            if (pic == null) return NotFound("Picture doesn't exist!");
            if (!System.IO.File.Exists(pic.Path)) return NotFound("Picture not found in internal server folder!");

            var memoryStream = new MemoryStream();

            using (var stream = new FileStream(pic.Path, FileMode.Open))
            {
                await stream.CopyToAsync(memoryStream);
            }

            memoryStream.Position = 0;

            string outStringContentType;
            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(pic.Path), out outStringContentType);
            return File(memoryStream, outStringContentType ?? "application/octet-stream", pic.Name + Path.GetExtension(pic.Path));
        }
    }
}