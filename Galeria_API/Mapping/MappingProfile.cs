﻿using System.Linq;
using AutoMapper;
using Galeria_API.Core.Model;
using Galeria_API.DataTransferObjects;
using Galeria_API.Extensions;

namespace Galeria_API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //from Dtos to Domain Model 
            CreateMap<UserForListDto, User>();
            CreateMap<UserForLoginDto, User>();
            CreateMap<PointOfView, PointOfViewDto>()
                .ForMember(pointOfViewDto => pointOfViewDto.UserName, 
                    pointOfView => pointOfView.MapFrom(pOv => pOv.User.UserName));

            //from Domain Model to Dtos
            CreateMap<User, UserForListDto>()
                .ForMember(userDto => userDto.Roles, 
                    memberOptions => memberOptions.MapFrom(user => user.UserRoles.Select(userRole => userRole.Role.Name).ToArray()));
            CreateMap<Picture, PicturesDto>()
                .ForMember(dto => dto.TopPointsOfView,
                    pic 
                        => pic.MapFrom(picture => picture.PointsOfView
                                                            .OrderByDescending(elem => elem.AddedDateTime)
                                                            .Take(Constants.NumberOfTopComments)));
            CreateMap(typeof(PaginationResult<>), typeof(PaginationResult<>));
        }
    }
}
