using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace DivingClubs.Dao.SqlServer.Core
{
    internal abstract class BaseSaveControler<TModel> : BaseSaveControler<TModel, int>, ISaveDao<TModel> where TModel : IIdentifier
    {
        protected BaseSaveControler(IGetDao<TModel> getDao, IConfiguration configuration) : base(getDao, configuration)
        {
        }
    }
    internal abstract class BaseSaveControler<TModel, TId> : BaseControler, ISaveDao<TModel, TId> where TModel : IIdentifier<TId> where TId : notnull
    {
        protected readonly IGetDao<TModel, TId> getDao;
        public BaseSaveControler(IGetDao<TModel, TId> getDao,
            IConfiguration configuration) : base(configuration)
        {
            this.getDao = getDao;
        }

        public bool Delete(TId id)
            => this.Delete(new[] { id });

        public abstract bool Delete(IEnumerable<TId> id);

        public TModel? Save(TModel model)
        {
            var id = this.SaveEntity(model);
            return this.getDao.Get(id);
        }

        internal static TEntity ProcessEntity<TEntity>(
            TModel model,
            DbContext context,
            Func<TEntity, TModel, DbContext, TEntity> mapping)
            where TEntity : class, IIdentifier<TId>, new()
            => ProcessEntity(
                model,
                context,
                x => x.Id.Equals(model.Id),
                mapping
                );

        internal static TEntity ProcessEntity<TEntity>(
            TModel model,
            DbContext context,
            Expression<Func<TEntity, bool>> predicate,
            Func<TEntity, TModel, DbContext, TEntity> mapping)
            where TEntity : class, IIdentifier<TId>, new()
        {
            var entity =
                mapping(
                context.Set<TEntity>().FirstOrDefault(predicate) ?? new TEntity(),
                model,
                context
                );
            if (context.Entry(entity).State == EntityState.Detached)
            {
                context.Add(entity);
            }
            return entity;
        }

        protected abstract TId SaveEntity(TModel model);


        protected virtual TId SaveEntity<TEntity>(TModel model, Func<TEntity, TModel, DbContext, TEntity> mapping)
            where TEntity : class, IIdentifier<TId>, new()
            => this.SaveEntity(model, (m, c) => ProcessEntity(m, c, mapping));
        protected TId SaveEntity<TEntity>(TModel model, Func<TModel, DbContext,  TEntity>  processEntity)
            where TEntity : IIdentifier<TId>, new()
        {
            using var c = this.GetContext();
            var entity = processEntity(model, c);
            c.SaveChanges();
            return entity.Id;
        }

        protected DbContext GetContext()
            => base.GetContext(QueryTrackingBehavior.TrackAll);
    }
}
