using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core.Model;

namespace Galeria_API.DataTransferObjects
{
    public class PicturesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual UserForListDto OwnerUser { get; set; }
        public DateTime UploadedDateTime { get; set; }
        public ICollection<PointOfViewDto> TopPointsOfView { get; set; }
    }
}
