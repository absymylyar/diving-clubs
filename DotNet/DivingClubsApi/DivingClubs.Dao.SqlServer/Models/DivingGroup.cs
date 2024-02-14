using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class DivingGroup : Identifier, IDivingGroup
    {
        public DateTime Date { get; set; }
        public int MinimumRank { get; set; }
        public IDivingClub Club { get; set; }
        public IMonitor Monitor { get; set; }
        public ICollection<ILicence> Licences { get; set; }
    }
}
