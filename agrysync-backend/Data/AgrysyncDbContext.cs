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
        public DbSet<Field> Field { get; set; }
        public DbSet<Crop> Crop { get; set; }
        public DbSet<CultivationData> CultivationData { get; set; }
        public DbSet<YieldData> YieldData { get; set; }
        public DbSet<Pesticide> Pesticides { get; set; }
        public DbSet<Disease> Diseases { get; set; }
        public DbSet<DiseasePesticideMapping> DiseasePesticideMappings { get; set; }

        public DbSet<WeatherData> WeatherData { get; set; }
        public DbSet<GuidanceUpdates> GuidanceUpdates { get; set; }

        public DbSet<StandardGuides> StandardGuides { get; set; }

        public DbSet<Feedback> Feedback { get; set; }


        // Override this method to configure relationships, table names, etc.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add configurations if needed (e.g., relationships, constraints)
            modelBuilder.Entity<Crop>()
                .HasOne(c => c.Field)
                .WithMany(f => f.Crops)
                .HasForeignKey(c => c.FieldId);

            // Add configurations for other relationships if necessary
            modelBuilder.Entity<DiseasePesticideMapping>()
                .HasOne(dpm => dpm.Disease)
                .WithMany(d => d.DiseasePesticideMappings)
                .HasForeignKey(dpm => dpm.DiseaseId);

            modelBuilder.Entity<DiseasePesticideMapping>()
                .HasOne(dpm => dpm.Pesticide)
                .WithMany(p => p.DiseasePesticideMappings)
                .HasForeignKey(dpm => dpm.PesticideId);

            modelBuilder.Entity<Field>()
                .HasOne(f => f.Farmer)
                .WithMany(f => f.Fields)
                .HasForeignKey(f => f.FarmerId);

            modelBuilder.Entity<CultivationData>()
                .HasOne(cd => cd.Crop)
                .WithMany(c => c.CultivationData)
                .HasForeignKey(cd => cd.CropId);

            modelBuilder.Entity<CultivationData>()
                .HasOne(cd => cd.Pesticide)
                .WithMany(p => p.CultivationData)
                .HasForeignKey(cd => cd.PesticideId);

            modelBuilder.Entity<CultivationData>()
                .HasOne(cd => cd.Disease)
                .WithMany(d => d.CultivationData)
                .HasForeignKey(cd => cd.DiseaseId);

            modelBuilder.Entity<GuidanceUpdates>()
                .HasOne(gu => gu.StandardGuides)
                .WithMany(sg => sg.GuidanceUpdates)
                .HasForeignKey(gu => gu.GuideId);

            modelBuilder.Entity<WeatherData>()
                .HasOne(wd => wd.Field)
                .WithMany(f => f.WeatherData)
                .HasForeignKey(wd => wd.FieldId);

            modelBuilder.Entity<YieldData>()
                .HasOne(yd => yd.Crop)
                .WithMany(c => c.YieldData)
                .HasForeignKey(yd => yd.CropId);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Farmer)
                .WithMany(f => f.Feedback)
                .HasForeignKey(f => f.FarmerId);


            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Crop)
                .WithMany(c => c.Feedback)
                .HasForeignKey(f => f.CropId);



        }
    }
}
