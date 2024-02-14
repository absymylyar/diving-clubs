using DivingClubs.Dao.SqlServer.Datas;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DivingClubs.Dao.SqlServer.Core
{
    internal abstract class BaseControler
    {
        protected readonly IConfiguration configuration;
        public BaseControler(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        protected DbContextOptions<TContext> CreateDbOptions<TContext>(QueryTrackingBehavior queryTrackingBehavior = QueryTrackingBehavior.NoTracking) where TContext : DbContext
        {
            var optionsBuilder = new DbContextOptionsBuilder<TContext>();
            optionsBuilder.UseSqlServer(configuration["ConnectionStrings:MyConnection"]);
            optionsBuilder.UseQueryTrackingBehavior(queryTrackingBehavior);
            return optionsBuilder.Options;
        }


        protected DbContext GetContext(QueryTrackingBehavior queryTrackingBehavior = QueryTrackingBehavior.NoTracking)
            => new DivingClubsContext(this.CreateDbOptions<DivingClubsContext>(queryTrackingBehavior));
    }
}
