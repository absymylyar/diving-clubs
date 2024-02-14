using DivingClubs.Interfaces;
using DivingClubs.Models;
using System.Linq.Expressions;
using System.Reflection;

namespace DivingClubs.Business.Core
{
    internal class CoreBusiness<TModel> : CoreBusiness<TModel, int>, IBusiness<TModel>
        where TModel : IIdentifier<int>
    {
        public CoreBusiness(IGetDao<TModel> getDao, ISaveDao<TModel> saveDao) : base(getDao, saveDao)
        {
        }
    }
    internal class CoreBusiness<TModel, TId> : CoreBusiness<TModel, TId, IGetDao<TModel, TId>, ISaveDao<TModel, TId>>
        where TModel : IIdentifier<TId>
        where TId : notnull
    {
        public CoreBusiness(IGetDao<TModel, TId> getDao, ISaveDao<TModel, TId> saveDao) : base(getDao, saveDao)
        {
        }
    }
    internal abstract class CoreBusiness<TModel, TId, TGetDao, TSaveDao> : IBusiness<TModel, TId>
        where TModel : IIdentifier<TId>
        where TGetDao : IGetDao<TModel, TId>
        where TSaveDao : ISaveDao<TModel, TId>
        where TId : notnull
    {
        protected readonly TGetDao getDao;
        protected readonly TSaveDao saveDao;
        public CoreBusiness(TGetDao getDao, TSaveDao saveDao)
        {
            this.getDao = getDao;
            this.saveDao = saveDao;
        }
        public virtual bool Delete(TId id)
            => this.saveDao.Delete(id);

        public bool Delete(IEnumerable<TId> ids)
            => this.saveDao.Delete(ids);

        public virtual IQueryable<TModel> Get()
            => this.getDao.Get();

        public virtual TModel? Get(TId id)
            => this.getDao.Get(id);

        public virtual TChild? GetChild<TChild>(TModel model, Expression<Func<TModel, TChild>> children, bool forceReload = false)
            => forceReload
            ? this.getDao.GetChild(model, children)
            : children.Compile()(model) ?? this.getDao.GetChild(model, children);

        public virtual IReadOnlyDictionary<TModel, TChild> GetChild<TChild>(IEnumerable<TModel> models, Expression<Func<TModel, TChild>> child, bool forceReload = false)
            => this.CheckChild(models, child, (m) => this.getDao.GetChild(m, child), forceReload);

        public virtual IEnumerable<TChildren>? GetChildren<TChildren>(TModel model, Expression<Func<TModel, IEnumerable<TChildren>>> children, bool forceReload = false)
            => forceReload
            ? this.getDao.GetChildren(model, children)
            : children.Compile()(model) ?? this.getDao.GetChildren(model, children);

        public virtual IReadOnlyDictionary<TModel, IEnumerable<TChildren>> GetChildren<TChildren>(IEnumerable<TModel> models, Expression<Func<TModel, IEnumerable<TChildren>>> children, bool forceReload = false)
            => this.CheckChildren(models, children, (m) => this.getDao.GetChildren(m, children), forceReload);

        public virtual TModel? Save(TModel model)
            => this.saveDao.Save(model);
        protected IReadOnlyDictionary<TModel, int> CheckChild(
            IEnumerable<TModel> models,
            Expression<Func<TModel, int>> child,
            Func<IEnumerable<TModel>, IReadOnlyDictionary<TModel, int>> getChildFunc,
            bool forceReload)
        {

            if (forceReload)
            {
                return getChildFunc.Invoke(models);
            }
            var childFunc = child.Compile();
            Func<TModel, bool> predicate = (x) => childFunc(x) < 1;
            if (models?.All(predicate) ?? false)
            {
                return getChildFunc.Invoke(models);
            }
            Func<TModel, bool> toFill = (x) => childFunc(x) > 0;
            var alreadyFilled = models.Where(toFill).ToDictionary(x => x, childFunc);
            return getChildFunc.Invoke(models.Where(toFill)).Concat(alreadyFilled).ToDictionary(x => x.Key, x => x.Value);
        }
        protected IReadOnlyDictionary<TModel, int?> CheckChild(
            IEnumerable<TModel> models,
            Expression<Func<TModel, int?>> child,
            Func<IEnumerable<TModel>, IReadOnlyDictionary<TModel, int?>> getChildFunc,
            bool forceReload)
        {

            if (forceReload)
            {
                return getChildFunc.Invoke(models);
            }
            var childFunc = child.Compile();
            bool predicate(TModel x) => childFunc(x).HasValue;
            if (models?.All(predicate) ?? false)
            {
                return getChildFunc.Invoke(models);
            }
            bool predicateFilled(TModel x) => !childFunc(x).HasValue;
            var alreadyFilled = models.Where(predicateFilled).ToDictionary(x => x, childFunc);
            return this.GetChild(models.Where(predicate), child).Concat(alreadyFilled).ToDictionary(x => x.Key, x => x.Value);
        }
        protected IReadOnlyDictionary<TModel, TChild> CheckChild<TChild>(
            IEnumerable<TModel> models,
            Expression<Func<TModel, TChild>> child,
            Func<IEnumerable<TModel>, IReadOnlyDictionary<TModel, TChild>> getChildFunc,
            bool forceReload)
        {

            var func = child.Compile();
            Func<TModel, bool> predicateNull = (x) => func(x) == null;

            if (forceReload || (models?.All(predicateNull) ?? false))
            {
                return getChildFunc.Invoke(models);
            }

            var alreadyFilled = models.Where(x => func(x) != null);

            if (alreadyFilled.Count() == models.Count())
            {
                return models.ToDictionary(x => x, x => func(x));
            }

            return this.GetChild(models.Where(predicateNull), child).Concat(alreadyFilled.ToDictionary(x => x, func)).ToDictionary(x => x.Key, x => x.Value);
        }
        protected IReadOnlyDictionary<TModel, IEnumerable<TChildren>> CheckChildren<TChildren>(
            IEnumerable<TModel> models,
            Expression<Func<TModel, IEnumerable<TChildren>>> children,
            Func<IEnumerable<TModel>, IReadOnlyDictionary<TModel, IEnumerable<TChildren>>> getChildrenFunc,
            bool forceReload)
        {
            var func = children.Compile();
            Func<TModel, bool> predicateNull = (x) => func(x) == null;

            if (forceReload || (models?.All(predicateNull) ?? false))
            {
                return getChildrenFunc.Invoke(models);
            }

            var alreadyFilled = models.Where(x => func(x) != null);

            if (alreadyFilled.Count() == models.Count())
            {
                return models.ToDictionary(x => x, x => func(x));
            }

            return this.GetChildren(models.Where(predicateNull), children).Concat(alreadyFilled.ToDictionary(x => x, func)).ToDictionary(x => x.Key, x => x.Value);
        }
        protected static string? ExtractPropertyName(LambdaExpression expression)
            => ((expression.Body as MemberExpression)?.Member as PropertyInfo).Name;
    }
}
