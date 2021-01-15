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


            //from Domain Model t0 Dtos
            CreateMap<User, UserForListDto>();
        }
    }
}
