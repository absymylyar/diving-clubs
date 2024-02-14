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
    internal class DivingGroupDaoGet : BaseGetControler<IDivingGroup>, IGetDao<IDivingGroup>
    {
        public DivingGroupDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public override IQueryable<IDivingGroup> Get()
            => this.GetContext()
            .Set<DivingGroupEntity>()
            .Include(x => x.Monitor)
            .ThenInclude(x => x.Person)
            .ThenInclude(x => x.Address)
            .Include(x => x.Club)
            .ThenInclude(x => x.Address)
            .Select(Expression);
        internal static Expression<Func<DivingGroupEntity, IDivingGroup>> Expression
            => (x) => new DivingGroup
            {
                Date = x.Date,
                Id = x.Id,
                MinimumRank = x.MinimumRank,
                Monitor = new Models.Monitor
                {
                    MonitorNumber = x.Monitor.Id,
                    Rank = x.Monitor.Rank,
                    Id = x.Monitor.Person.Id,
                    BirthDate = x.Monitor.Person.BirthDate,
                    BloodGroup = x.Monitor.Person.BloodGroup,
                    FirstName = x.Monitor.Person.FirstName,
                    LastName = x.Monitor.Person.LastName,
                    PhoneNumber = x.Monitor.Person.PhoneNumber,
                    Address = new Address
                    {
                        City = x.Monitor.Person.Address.City,
                        Id = x.Monitor.Person.Address.Id,
                        Street = x.Monitor.Person.Address.Street,
                        StreetNumber = x.Monitor.Person.Address.StreetNumber,
                        ZipCode = x.Monitor.Person.Address.ZipCode
                    }
                },
                Club = new DivingClub
                {
                    Id = x.Club.Id,
                    Name = x.Club.Name,
                    PhoneNumber = x.Club.PhoneNumber,
                    Address = new Address
                    {
                        Id = x.Club.Address.Id,
                        City = x.Club.Address.City,
                        Street = x.Club.Address.Street,
                        StreetNumber = x.Club.Address.StreetNumber,
                        ZipCode = x.Club.Address.ZipCode
                    }
                }
            };
    }
}
