using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Dao.SqlServer.Models;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class DivingClubDaoGet : BaseGetControler<IDivingClub>, IGetDao<IDivingClub>
    {
        public DivingClubDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public override IQueryable<IDivingClub> Get()
            => this.GetContext()
            .Set<DivingClubEntity>()
            .Include(x => x.Address)
            .Select(Expression);

        internal static Expression<Func<DivingClubEntity, IDivingClub>> Expression
            => (x) => new DivingClub
            {
                Id = x.Id,
                Name = x.Name,
                PhoneNumber = x.PhoneNumber,
                Address = new Address
                {
                    Id = x.Address.Id,
                    City = x.Address.City,
                    Street = x.Address.Street,
                    StreetNumber = x.Address.StreetNumber,
                    ZipCode = x.Address.ZipCode
                }
            };
    }
}
