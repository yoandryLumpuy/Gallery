using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core.Model;

namespace Galeria_API.DataTransferObjects
{
    public class UserForListDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        
        public string Email { get; set; }

        public string[] Roles { get; set; }
    }
}
