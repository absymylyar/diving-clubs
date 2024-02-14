using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class PersonsDaoSave : BaseSaveControler<IPerson>, ISaveDao<IPerson>
    {
        public PersonsDaoSave(
            IGetDao<IPerson> getDao,
            IConfiguration configuration
            ) : base(getDao, configuration)
        {
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dbSet1 = c.Set<LicenceEntity>();
            dbSet1.RemoveRange(
                dbSet1.Where(x => x.PersonId.HasValue && id.Contains(x.PersonId.Value))
                );
            var dbSet2 = c.Set<MonitorEntity>();
            dbSet2.RemoveRange(
                dbSet2.Where(x => x.PersonId.HasValue && id.Contains(x.PersonId.Value))
                );
            var dbSet3 = c.Set<PersonEntity>();
            dbSet3.RemoveRange(
                dbSet3.Where(x => id.Contains(x.Id))
                );
            return c.SaveChanges() > 0;
        }

        protected override int SaveEntity(IPerson model)
            => this.SaveEntity<PersonEntity>(model, Mapping);
        internal static PersonEntity Mapping(PersonEntity entity, IPerson model, DbContext context)
        {
            entity.BirthDate = model.BirthDate;
            entity.BloodGroup = model.BloodGroup;
            entity.FirstName = model.FirstName;
            entity.LastName = model.LastName;
            entity.PhoneNumber = model.PhoneNumber;

            if (model.Address != null)
            {
                entity.Address = AddressesDaoSave.ProcessEntity<AddressEntity>(model.Address, context, AddressesDaoSave.Mapping);
            }
            return entity;
        }
    }
}
