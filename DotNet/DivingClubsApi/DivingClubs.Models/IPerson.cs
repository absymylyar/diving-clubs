namespace DivingClubs.Models
{
    public interface IPerson : IIdentifier, IHasAddress
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string BloodGroup { get; set; }
    }
}
