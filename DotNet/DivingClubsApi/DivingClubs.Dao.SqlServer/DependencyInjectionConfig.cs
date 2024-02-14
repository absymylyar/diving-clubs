using DivingClubs.Dao.SqlServer.Services;
using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.Extensions.DependencyInjection;

namespace DivingClubs.Dao.SqlServer
{
    public static class DependencyInjectionConfig
    {
        public static void AddScope(IServiceCollection services)
        {
            services.AddScoped<IGetDao<IAddress>, AddressesDaoGet>();
            services.AddScoped<IGetDao<IDivingClub>, DivingClubDaoGet>();
            services.AddScoped<IGetDao<IDivingGroup>, DivingGroupDaoGet>();
            services.AddScoped<IGetDao<IMonitor>, MonitorsDaoGet>();
            services.AddScoped<IGetDao<IPerson>, PersonsDaoGet>();

            services.AddScoped<ILicenceDaoGet, LicenceDaoGet>();

            services.AddScoped<ISaveDao<IAddress>, AddressesDaoSave>();
            services.AddScoped<ISaveDao<IDivingClub>, DivingClubDaoSave>();
            services.AddScoped<ISaveDao<IDivingGroup>, DivingGroupDaoSave>();
            services.AddScoped<ISaveDao<ILicence>, LicenceDaoSave>();
            services.AddScoped<ISaveDao<IMonitor>, MonitorsDaoSave>();
            services.AddScoped<ISaveDao<IPerson>, PersonsDaoSave>();
        }
    }
}
