using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Galeria_API.DataTransferObjects
{
    public class PointOfViewDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int PictureId { get; set; }
        public string Comment { get; set; }
        public byte Points { get; set; }
        public DateTime AddedDateTime { get; set; }
    }
}
