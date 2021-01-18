using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Galeria_API.DataTransferObjects
{
    public class PagedList<T> : List<T> where T : class 
    {
        public int TotalItems { get; set; }
        public int Page { get; set; }
        public byte PageSize{ get; set; }
        public int TotalPages { get; set; }

        public PagedList(List<T> items, int count, int page, byte pageSize)
        {
            TotalItems = count;
            Page = page;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count/(double)pageSize);
            AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> queryable, int page, byte pageSize)
        {
            var count = await queryable.CountAsync();
            var items = await queryable.Skip((page - 1)*pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, page, pageSize);
        }
    }
}
