using System;
using System.ComponentModel.DataAnnotations;

namespace Galeria_API.Core.Model
{
    public class ValueBetween : ValidationAttribute
    {
        public int Min { get; set; } = 0;
        public int Max { get; set; } = 10;
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is int intValue) 
            {
                return intValue >= Min && intValue <= Max
                        ? ValidationResult.Success
                        : new ValidationResult($"value must be between {Min} and {Max}");
            }
            return ValidationResult.Success;
        }
    }
}
