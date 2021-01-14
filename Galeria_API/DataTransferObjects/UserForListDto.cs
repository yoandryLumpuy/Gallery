using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Galeria_API.DataTransferObjects
{
    public class UserForListDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        
        public string Email { get; set; }
    }
}
