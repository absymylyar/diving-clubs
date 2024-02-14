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
    internal class MonitorsDaoGet : BaseGetControler<IMonitor>, IGetDao<IMonitor>
    {
        public MonitorsDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public override IQueryable<IMonitor> Get()
            => this.GetContext()
            .Set<MonitorEntity>()
            .Include(x => x.Person)
            .ThenInclude(x => x.Address)
            .Select(Expression);

        internal static Expression<Func<MonitorEntity, IMonitor>> Expression
            => (x) => new Models.Monitor
            {
                BirthDate = x.Person.BirthDate,
                BloodGroup = x.Person.BloodGroup,
                FirstName = x.Person.FirstName,
                LastName = x.Person.LastName,
                Id = x.Person.Id,
                MonitorNumber = x.Id,
                PhoneNumber = x.Person.PhoneNumber,
                Rank = x.Rank,
                Address = new Address
                {
                    City = x.Person.Address.City,
                    Id = x.Person.Address.Id,
                    Street = x.Person.Address.Street,
                    StreetNumber = x.Person.Address.StreetNumber,
                    ZipCode = x.Person.Address.ZipCode
                }
            };
    }
}
