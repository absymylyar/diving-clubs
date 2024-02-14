namespace DivingClubs.Models
{
    public interface IMonitor : IPerson
    {
        public int Rank { get; set; }
        public int MonitorNumber { get; set; }
    }
}
