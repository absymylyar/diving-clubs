using DivingClubs.Business.Core;
using DivingClubs.Interfaces;
using DivingClubs.Models;

namespace DivingClubs.Business
{
    internal class LicenceBusiness : CoreBusiness<ILicence, int, ILicenceDaoGet, ISaveDao<ILicence>>
    {
        public LicenceBusiness(ILicenceDaoGet getDao, ISaveDao<ILicence> saveDao) : base(getDao, saveDao)
        {
        }

        public override ILicence? Save(ILicence model)
        {
            var licences = this.getDao.GetPersonLicences(model.PersonNumber)
                .Where(x => x.DateEnd == null)
                .ToList();
            licences.ForEach(licence =>
            {
                licence.DateEnd = model.DateStart.AddSeconds(-1);
                base.Save(licence);
            });
            return base.Save(model);
        }
    }
}
