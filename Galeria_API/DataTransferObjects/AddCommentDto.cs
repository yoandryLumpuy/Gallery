using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Galeria_API.DataTransferObjects
{
    public class AddCommentDto
    {
        [Required]
        public byte Points { get; set; }
        [Required]
        public string Comment { get; set; }
    }
}
