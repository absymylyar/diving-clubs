using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class Person : Identifier, IPerson
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string BloodGroup { get; set; }
        public IAddress Address { get; set; }
    }
}
