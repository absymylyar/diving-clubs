using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class DivingClub : Identifier, IDivingClub
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public IAddress Address { get; set; }
    }
}
