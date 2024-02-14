using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Dao.SqlServer.Models;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class AddressesDaoGet : BaseGetControler<IAddress>, IGetDao<IAddress>
    {
        public AddressesDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public override IQueryable<IAddress> Get()
            => GetContext()
            .Set<AddressEntity>()
            .Select(Expression);

        internal static Expression<Func<AddressEntity, IAddress>> Expression
            => (x) => new Address
            {
                City = x.City,
                Id = x.Id,
                Street = x.Street,
                StreetNumber = x.StreetNumber,
                ZipCode = x.ZipCode,
            };
    }
}
