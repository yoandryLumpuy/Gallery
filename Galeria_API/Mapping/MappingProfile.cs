using System.Linq;
using AutoMapper;
using Galeria_API.Core.Model;
using Galeria_API.DataTransferObjects;

namespace Galeria_API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //from Dtos to Domain Model 
            CreateMap<UserForListDto, User>();
            CreateMap<UserForLoginDto, User>();


            //from Domain Model to Dtos
            CreateMap<User, UserForListDto>()
                .ForMember(userDto => userDto.Roles, 
                    memberOptions => memberOptions.MapFrom(user => user.UserRoles.Select(userRole => userRole.Role.Name).ToArray()));
            CreateMap<Picture, PicturesDto>();
            CreateMap<PaginationResult<Picture>, PaginationResult<PicturesDto>>();
        }
    }
}
