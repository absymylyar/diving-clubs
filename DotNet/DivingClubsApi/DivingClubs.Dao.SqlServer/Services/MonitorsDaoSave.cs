using DivingClubs.Dao.SqlServer.Core;
using DivingClubs.Dao.SqlServer.Datas;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Services
{
    internal class MonitorsDaoSave : BaseSaveControler<IMonitor>, ISaveDao<IMonitor>
    {
        private readonly ISaveDao<ILicence> licenceSaveDao;
        public MonitorsDaoSave(IGetDao<IMonitor> getDao,
            ISaveDao<ILicence> licenceSaveDao,
            IConfiguration configuration) : base(getDao, configuration)
        {
            this.licenceSaveDao = licenceSaveDao;
        }

        public override bool Delete(IEnumerable<int> id)
        {
            using var c = this.GetContext();
            var dg = c.Set<DivingGroupEntity>()
                .Where(x => x.MonitorId.HasValue && id.Contains(x.MonitorId.Value))
                .Select(x => x.Id)
                .ToArray();
            this.licenceSaveDao.Delete(dg);
            var dbSet = c.Set<MonitorEntity>();
            dbSet.RemoveRange(
                dbSet.Where(x => id.Contains(x.Id))
                );
            return c.SaveChanges() > 0;
        }

        protected override int SaveEntity(IMonitor model)
            => this.SaveEntity<MonitorEntity>(model, Mapping);

        internal MonitorEntity Mapping(MonitorEntity entity, IMonitor model, DbContext context)
        {
            entity.Rank = model.Rank;
            entity.Person = PersonsDaoSave.Mapping(entity.Person ?? new PersonEntity(), model, context);
            return entity;
        }
    }
}
