using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Galeria_API.Core;

namespace Galeria_API.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GalleryDbContext context;

        public UnitOfWork(GalleryDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
