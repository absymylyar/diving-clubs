using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class Address : Identifier, IAddress
    {
        public string StreetNumber { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
    }
}
