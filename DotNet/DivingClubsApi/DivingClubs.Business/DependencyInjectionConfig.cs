using DivingClubs.Business.Core;
using DivingClubs.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace DivingClubs.Business
{
    public static class DependencyInjectionConfig
    {
        public static void AddScope(IServiceCollection services)
        {
            services.AddScoped(typeof(IBusiness<>), typeof(CoreBusiness<>));
        }
    }
}
