using DivingClubs.Models;

namespace DivingClubs.Interfaces
{
    public interface ISaveDao<TModel> : ISaveDao<TModel, int> where TModel : IIdentifier<int> { }
    public interface ISaveDao<TModel, TId> where TModel : IIdentifier<TId>
    {
        TModel? Save(TModel model);
        bool Delete(TId id);
        bool Delete(IEnumerable<TId> id);
    }
}
