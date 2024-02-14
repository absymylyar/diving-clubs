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
    internal class LicenceDaoGet : BaseGetControler<ILicence>, IGetDao<ILicence>, ILicenceDaoGet
    {
        public LicenceDaoGet(IConfiguration configuration) : base(configuration)
        {
        }

        public IEnumerable<ILicence> GetPersonLicences(int personId)
        {
            return this.Get()
                .Where(x => x.PersonNumber.Equals(personId))
                .ToArray();
        }

        public override IQueryable<ILicence> Get()
            => this.GetContext()
            .Set<LicenceEntity>()
            .Include(x => x.Club)
            .ThenInclude(x => x.Address)
            .Include(x => x.Person)
            .ThenInclude(x => x.Address)
            .Select(Expression);

        internal static Expression<Func<LicenceEntity, ILicence>> Expression
            => (x) => new Licence
            {
                Id = x.Id,
                PersonNumber = x.Person.Id,
                BirthDate = x.Person.BirthDate,
                BloodGroup = x.Person.BloodGroup,
                DateEnd = x.DateEnd,
                DateStart = x.DateStart,
                FirstName = x.Person.FirstName,
                LastName = x.Person.LastName,
                PhoneNumber = x.Person.PhoneNumber,
                Rank = x.Rank,
                Address = new Address
                {
                    City = x.Person.Address.City,
                    Id = x.Person.Address.Id,
                    Street = x.Person.Address.Street,
                    StreetNumber = x.Person.Address.StreetNumber,
                    ZipCode = x.Person.Address.ZipCode,
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
                        ZipCode = x.Club.Address.ZipCode,
                    }
                }
            };
    }
}
