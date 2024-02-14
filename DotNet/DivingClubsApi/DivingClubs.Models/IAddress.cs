namespace DivingClubs.Models
{
    public interface IAddress : IIdentifier
    {
        public string StreetNumber { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
    }
}
