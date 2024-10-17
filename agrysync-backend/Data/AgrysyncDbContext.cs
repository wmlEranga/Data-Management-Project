using Microsoft.EntityFrameworkCore;
using agrysync_backend.Models;

namespace agrysync_backend.Data
{
    public class AgrysyncDbContext : DbContext
    {
        // Constructor to pass options to the base DbContext class
        public AgrysyncDbContext(DbContextOptions<AgrysyncDbContext> options)
            : base(options)
        {
        }

        // DbSet properties represent tables in the database
        public DbSet<Farmer> Farmers { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Crop> Crops { get; set; }
        public DbSet<CultivationData> CultivationData { get; set; }
        public DbSet<YieldData> YieldData { get; set; }
        public DbSet<Pesticide> Pesticides { get; set; }
        public DbSet<Disease> Diseases { get; set; }
        public DbSet<PesticideDiseaseMapping> PesticideDiseaseMappings { get; set; }

        // Override this method to configure relationships, table names, etc.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add configurations if needed (e.g., relationships, constraints)
            modelBuilder.Entity<Crop>()
                .HasOne(c => c.Field)
                .WithMany(f => f.Crops)
                .HasForeignKey(c => c.FieldId);

            // Add configurations for other relationships if necessary
        }
    }
}
