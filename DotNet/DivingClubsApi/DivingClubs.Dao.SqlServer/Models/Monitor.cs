using DivingClubs.Models;

namespace DivingClubs.Dao.SqlServer.Models
{
    internal class Monitor : Person, IMonitor
    {
        public int Rank { get; set; }
        public int MonitorNumber { get; set; }
    }
}
