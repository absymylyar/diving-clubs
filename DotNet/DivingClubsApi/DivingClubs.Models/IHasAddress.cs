namespace DivingClubs.Models
{
    public interface IHasAddress : IIdentifier
    {
        public IAddress Address { get; set; }
    }
}
