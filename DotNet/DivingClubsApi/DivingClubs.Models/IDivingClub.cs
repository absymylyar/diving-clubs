namespace DivingClubs.Models
{
    public interface IDivingClub : IHasAddress
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
    }
}
