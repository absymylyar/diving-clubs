using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class DivingGroupDaoSave : BaseSaveControler<IDivingGroup>, ISaveDao<IDivingGroup>
    {
        public DivingGroupDaoSave(IGetDao<IDivingGroup> getDao, IConfiguration configuration) : base(getDao, configuration)
        {
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dbSet = c.Set<DivingGroupEntity>();
            var licences = dbSet
                .Include(x => x.LicenceEntities)
                .Where(x => id.Contains(x.Id))
                .ToList();
            licences.ForEach(x => x.LicenceEntities.Clear());
            dbSet.RemoveRange(licences);
            return c.SaveChanges() > 0;
        }

        protected override int SaveEntity(IDivingGroup model)
            => this.SaveEntity<DivingGroupEntity>(model, Mapping);
        internal static DivingGroupEntity Mapping(DivingGroupEntity entity, IDivingGroup model, DbContext context)
        {
            entity.Date = model.Date;
            entity.MinimumRank = model.MinimumRank;
            entity.MonitorId = model.Monitor?.Id ?? entity.MonitorId;
            entity.ClubId = model.Club?.Id ?? entity.ClubId;

            if (model.Licences != null)
            {
                entity.LicenceEntities = context
                    .Set<LicenceEntity>()
                    .Where(x => model.Licences.Select(y => y.Id).Contains(x.Id))
                    .ToList();
            }
            return entity;
        }
    }
}
