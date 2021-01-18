using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Galeria_API.Core.Model
{
    public class PictureSettings
    {
        public int MaxBytes { get; set; }
        public string[] SupportedFiles { get; set; }

        public bool IsSupported(string fileExtension)
        {
            return SupportedFiles.Any(ext => 
                string.Compare(fileExtension, ext, StringComparison.OrdinalIgnoreCase) == 0);
        }
    }
}
