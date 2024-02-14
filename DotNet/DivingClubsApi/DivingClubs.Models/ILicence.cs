namespace DivingClubs.Models
{
    public interface ILicence : IPerson
    {
        public int PersonNumber { get; set; }
        public int Rank { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public IDivingClub Club { get; set; }
    }
}
