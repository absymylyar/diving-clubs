using DivingClubs.Models;
using System.Linq.Expressions;

namespace DivingClubs.Interfaces
{
    public interface IBusiness<TModel> : IBusiness<TModel, int> where TModel : IIdentifier<int> { }
    public interface IBusiness<TModel, TId> where TModel : IIdentifier<TId>
    {
        IQueryable<TModel> Get();
        TModel? Get(TId id);
        TModel? Save(TModel model);
        bool Delete(TId id);
        bool Delete(IEnumerable<TId> ids);
        IEnumerable<TChildren>? GetChildren<TChildren>(TModel model, Expression<Func<TModel, IEnumerable<TChildren>>> children, bool forceReload = false);
        IReadOnlyDictionary<TModel, IEnumerable<TChildren>> GetChildren<TChildren>(IEnumerable<TModel> model, Expression<Func<TModel, IEnumerable<TChildren>>> children, bool forceReload = false);
        TChild? GetChild<TChild>(TModel model, Expression<Func<TModel, TChild>> children, bool forceReload = false);
        IReadOnlyDictionary<TModel, TChild> GetChild<TChild>(IEnumerable<TModel> models, Expression<Func<TModel, TChild>> child, bool forceReload = false);
    }
}
