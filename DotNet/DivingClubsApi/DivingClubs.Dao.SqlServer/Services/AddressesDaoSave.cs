using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class AddressesDaoSave : BaseSaveControler<IAddress>, ISaveDao<IAddress>
    {
        public AddressesDaoSave(IGetDao<IAddress> getDao, IConfiguration configuration) : base(getDao, configuration)
        {
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dbSet = c.Set<AddressEntity>();
            dbSet.RemoveRange(
                dbSet.Where(x => id.Contains(x.Id))
                );
            return c.SaveChanges() > 0;
        }

        protected override int SaveEntity(IAddress model)
            => this.SaveEntity<AddressEntity>(model, Mapping);

        internal static AddressEntity Mapping(AddressEntity entity, IAddress model, DbContext context)
        {
            entity.Street = model.Street;
            entity.StreetNumber = model.StreetNumber;
            entity.ZipCode = model.ZipCode;
            entity.City = model.City;
            return entity;
        }
    }
}
