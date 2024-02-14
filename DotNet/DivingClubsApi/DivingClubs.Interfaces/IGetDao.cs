using DivingClubs.Models;
using System.Linq.Expressions;

namespace DivingClubs.Interfaces
{
    public interface IGetDao<TModel> : IGetDao<TModel, int> where TModel : IIdentifier<int> { }
    public interface IGetDao<TModel, TId> where TModel : IIdentifier<TId> where TId : notnull
    {
        IQueryable<TModel> Get();
        TModel? Get(TId id);
        IEnumerable<TChildren>? GetChildren<TChildren>(TModel model, Expression<Func<TModel, IEnumerable<TChildren>>> children);
        IReadOnlyDictionary<TModel, IEnumerable<TChildren>?> GetChildren<TChildren>(IEnumerable<TModel> models, Expression<Func<TModel, IEnumerable<TChildren>>> children);
        TChild? GetChild<TChild>(TModel model, Expression<Func<TModel, TChild>> child);
        IReadOnlyDictionary<TModel, TChild?> GetChild<TChild>(IEnumerable<TModel> models, Expression<Func<TModel, TChild>> child);
    }
}