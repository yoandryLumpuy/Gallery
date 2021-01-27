using System;
using System.Collections.Generic;

namespace Galeria_API.DataTransferObjects
{
    public class PicturesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual UserForListDto OwnerUser { get; set; }
        public DateTime UploadedDateTime { get; set; }
        public bool YouLikeIt { get; set; }
        public PointOfViewDto YourComment { get; set; }
        public ICollection<PointOfViewDto> TopPointsOfView { get; set; }
    }
}
