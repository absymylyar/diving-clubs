using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class LicenceDaoSave : BaseSaveControler<ILicence>, ISaveDao<ILicence>
    {
        public LicenceDaoSave(ILicenceDaoGet getDao, IConfiguration configuration) : base(getDao, configuration)
        {
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dbSet = c.Set<LicenceEntity>();
            var query = dbSet
                .Include(x => x.DivingGroupEntities)
                .Where(x => id.Contains(x.Id))
                .ToList();
            query.ForEach(x => x.DivingGroupEntities.Clear());
            dbSet.RemoveRange(query);
            return c.SaveChanges() > 0;
        }

        protected override int SaveEntity(ILicence model)
            => this.SaveEntity<LicenceEntity>(model, Mapping);
        internal LicenceEntity Mapping(LicenceEntity entity, ILicence model, DbContext context)
        {
            entity.Rank = model.Rank;
            entity.DateStart = model.DateStart;
            entity.DateEnd = model.DateEnd;
            entity.ClubId = model.Club?.Id ?? entity.ClubId;
            entity.PersonId = model.PersonNumber;
            return entity;
        }
    }
}
