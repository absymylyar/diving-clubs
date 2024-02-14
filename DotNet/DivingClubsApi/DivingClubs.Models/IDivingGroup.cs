namespace DivingClubs.Models
{
    public interface IDivingGroup : IIdentifier
    {
        public DateTime Date { get; set; }
        public int MinimumRank { get; set; }

        public IDivingClub Club { get; set; }
        public IMonitor Monitor { get; set; }
        public ICollection<ILicence> Licences { get; set; }
    }
}
