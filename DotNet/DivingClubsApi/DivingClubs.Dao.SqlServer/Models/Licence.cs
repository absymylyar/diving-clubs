using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class Licence : Person, ILicence
    {
        public int PersonNumber { get; set; }
        public int Rank { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public IDivingClub Club { get; set; }
    }
}
