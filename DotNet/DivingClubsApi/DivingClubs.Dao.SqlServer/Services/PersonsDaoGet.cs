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
    internal class PersonsDaoGet : BaseGetControler<IPerson>, IGetDao<IPerson>
    {
        public PersonsDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public override IQueryable<IPerson> Get()
            => GetContext()
            .Set<PersonEntity>()
            .Include(x => x.Address)
            .Select(Expression);

        internal static Expression<Func<PersonEntity, IPerson>> Expression
            => (x) => new Person
            {
                BirthDate = x.BirthDate,
                BloodGroup = x.BloodGroup,
                FirstName = x.FirstName,
                Id = x.Id,
                LastName = x.LastName,
                PhoneNumber = x.PhoneNumber,
                Address = new Address
                {
                    City = x.Address.City,
                    Id = x.Address.Id,
                    Street = x.Address.Street,
                    StreetNumber = x.Address.StreetNumber,
                    ZipCode = x.Address.ZipCode,
                }
            };
    }
}
