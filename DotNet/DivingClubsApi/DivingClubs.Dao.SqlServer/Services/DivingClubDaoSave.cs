using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class DivingClubDaoSave : BaseSaveControler<IDivingClub>, ISaveDao<IDivingClub>
    {
        private readonly ISaveDao<IAddress> addressSaveDao;
        public DivingClubDaoSave(
            IGetDao<IDivingClub> getDao,
            ISaveDao<IAddress> addressSaveDao,
            IConfiguration configuration) : base(getDao, configuration)
        {
            this.addressSaveDao = addressSaveDao;
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dbSet1 = c.Set<LicenceEntity>();
            dbSet1.RemoveRange(
                dbSet1.Where(x => x.ClubId.HasValue && id.Contains(x.ClubId.Value))
                );
            var dbSet2 = c.Set<DivingClubEntity>();
            dbSet2.RemoveRange(
                dbSet2.Where(x => id.Contains(x.Id))
                );
            return c.SaveChanges() > 0; ;
        }

        protected override int SaveEntity(IDivingClub model)
            => this.SaveEntity<DivingClubEntity>(model, Mapping);
        internal DivingClubEntity Mapping(DivingClubEntity entity, IDivingClub model, DbContext context)
        {
            entity.Name = model.Name;
            entity.PhoneNumber = model.PhoneNumber;
            if (model.Address != null)
            {
                entity.Address = AddressesDaoSave.ProcessEntity<AddressEntity>(model.Address, context, AddressesDaoSave.Mapping);
            }
            return entity;
        }
    }
}
