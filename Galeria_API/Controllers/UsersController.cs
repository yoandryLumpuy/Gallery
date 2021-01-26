using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Galeria_API.Core;
using Galeria_API.Core.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Galeria_API.DataTransferObjects;
using Galeria_API.Extensions;
using Galeria_API.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Galeria_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IOptions<PictureSettings> _pictureSettings;

        public UsersController(UserManager<User> userManager, 
            IRepository repository, IUnitOfWork unitOfWork, IMapper mapper,
            IHostingEnvironment hostingEnvironment,
            IOptionsSnapshot<PictureSettings> pictureSettings)
        {
            _userManager = userManager;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
            _pictureSettings = pictureSettings;
        }

        [HttpGet("{userId}", Name = "GetUser")]
        [Authorize(Policy = Constants.PolicyNameAdmin)]
        public async Task<IActionResult> GetUser(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user != null)
                return Ok(_mapper.Map<UserForListDto>(user));

            return NotFound("User not found!");
        }

        [HttpGet(Name = "GetUsers")]
        [Authorize(Policy = Constants.PolicyNameAdmin)]
        public async Task<IActionResult> GetUsers([FromQuery] QueryObject queryObject)
        {
            var usersFromDbContext = await _repository.GetUsers(queryObject);
            return Ok(_mapper.Map<PaginationResult<UserForListDto>>(usersFromDbContext));
        }

        [HttpPost("{userId}/photo", Name = "UploadUserPhoto")]
        [Authorize(Policy = Constants.PolicyNameOnlyWatch)]
        public async Task<IActionResult> UploadUserPhoto(int userId , IFormFile file)
        {
            if (userId != int.Parse(User.FindFirst(claim => claim.Type == ClaimTypes.NameIdentifier).Value))
                return Unauthorized("You have not access to modify this user's photo!");

            var user = await _repository.GetUser(userId);
            if (user == null) return NotFound("User not found!");

            var directory = Path.Combine(_hostingEnvironment.WebRootPath, "ProfilesPhotos");
            if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);
            var filePath = Path.Combine(directory, Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));

            if (file == null) return BadRequest("Null file!");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > _pictureSettings.Value.MaxBytes) return BadRequest("File size exceeded!");
            if (!_pictureSettings.Value.IsSupported(Path.GetExtension(file.FileName))) return BadRequest("Unsupported file extension!");

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            
            user.PhotoUrl = filePath;
            await _unitOfWork.CompleteAsync();
            
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("{userId}/photo", Name = "GetUserPhoto")]
        public async Task<IActionResult> GetUserPhoto(int userId)
        {
            var user = await _repository.GetUser(userId);
            if (user == null) return NotFound("User doesn't exist!");
            if (!System.IO.File.Exists(user.PhotoUrl)) return NotFound("User's photo not found in internal server folder!");

            var memoryStream = new MemoryStream();

            using (var stream = new FileStream(user.PhotoUrl, FileMode.Open))
            {
                await stream.CopyToAsync(memoryStream);
            }

            memoryStream.Position = 0;

            string outStringContentType;
            new FileExtensionContentTypeProvider().TryGetContentType(Path.GetFileName(user.PhotoUrl), out outStringContentType);
            return File(memoryStream, outStringContentType ?? "application/octet-stream", user.UserName + Path.GetExtension(user.PhotoUrl));
        }
    }
}