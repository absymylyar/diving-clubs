using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;
using System.Reflection;

namespace DivingClubs.Dao.SqlServer.Core
{

    internal abstract class BaseGetControler<TModel> : BaseGetControler<TModel, int>, IGetDao<TModel> where TModel : IIdentifier<int>
    {
        public BaseGetControler(IConfiguration configuration) : base(configuration) { }
    }
    internal abstract class BaseGetControler<TModel, TId> : BaseControler, IGetDao<TModel, TId> where TModel : IIdentifier<TId> where TId : notnull
    {
        public BaseGetControler(IConfiguration configuration) : base(configuration) { }

        public abstract IQueryable<TModel> Get();

        public virtual TModel? Get(TId id)
            => this.Get().FirstOrDefault(x => x.Id.Equals(x.Id));

        public virtual TChild? GetChild<TChild>(TModel model, System.Linq.Expressions.Expression<Func<TModel, TChild>> child)
            => this.GetChild(new[] { model }, child)[model] ?? default(TChild);

        public virtual IReadOnlyDictionary<TModel, TChild?> GetChild<TChild>(IEnumerable<TModel> models, System.Linq.Expressions.Expression<Func<TModel, TChild>> child)
            => models.ToDictionary(x => x, x => default(TChild));

        public virtual IEnumerable<TChildren>? GetChildren<TChildren>(TModel model, System.Linq.Expressions.Expression<Func<TModel, IEnumerable<TChildren>>> children)
            => this.GetChildren(new[] { model }, children)?[model];

        public virtual IReadOnlyDictionary<TModel, IEnumerable<TChildren>?> GetChildren<TChildren>(IEnumerable<TModel> models, System.Linq.Expressions.Expression<Func<TModel, IEnumerable<TChildren>>> children)
            => models.ToDictionary(x => x, x => default(IEnumerable<TChildren>));

        protected virtual PropertyInfo? GetChildrenProperty<TKey>(Expression<Func<TModel, TKey>> children)
        {
            return (children.Body as MemberExpression)?.Member as PropertyInfo;
        }
        protected TId[] GetIds(IEnumerable<TModel> models)
            => models.Select(x => x.Id)
            .ToArray();

    }
}
