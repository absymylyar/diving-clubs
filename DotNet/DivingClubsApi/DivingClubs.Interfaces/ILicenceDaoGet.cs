using DivingClubs.Models;

namespace DivingClubs.Interfaces
{
    public interface ILicenceDaoGet : IGetDao<ILicence>
    {
        public IEnumerable<ILicence> GetPersonLicences(int personId);
    }
}
