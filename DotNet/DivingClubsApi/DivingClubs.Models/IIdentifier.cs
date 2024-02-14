namespace DivingClubs.Models
{
    public interface IIdentifier : IIdentifier<int> { }
    public interface IIdentifier<TId> where TId : notnull
    {
        public TId Id { get; set; }
    }
}
