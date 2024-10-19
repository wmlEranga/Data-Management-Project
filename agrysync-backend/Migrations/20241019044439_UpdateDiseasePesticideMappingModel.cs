using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDiseasePesticideMappingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Diseases",
                columns: table => new
                {
                    DiseaseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DiseaseName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Symptoms = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diseases", x => x.DiseaseId);
                });

            migrationBuilder.CreateTable(
                name: "Farmers",
                columns: table => new
                {
                    FarmerId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FarmerName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FarmerAddress = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    FarmerContact = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    FarmerEmail = table.Column<string>(type: "text", nullable: false),
                    DateRegistered = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Farmers", x => x.FarmerId);
                });

            migrationBuilder.CreateTable(
                name: "Pesticides",
                columns: table => new
                {
                    PesticideId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PesticideName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ActiveIngredient = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ApplicationMethod = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Dosage = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SafetyPrecautions = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pesticides", x => x.PesticideId);
                });

            migrationBuilder.CreateTable(
                name: "StandardGuides",
                columns: table => new
                {
                    GuideId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CropType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Variety = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Stage = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RecommendedWaterLevel = table.Column<double>(type: "double precision", nullable: false),
                    RecommendedFertilizer = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    RecommendedPesticides = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandardGuides", x => x.GuideId);
                });

            migrationBuilder.CreateTable(
                name: "Field",
                columns: table => new
                {
                    FieldId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FarmerId = table.Column<int>(type: "integer", nullable: false),
                    FieldSize = table.Column<double>(type: "double precision", nullable: false),
                    SoilType = table.Column<string>(type: "text", nullable: false),
                    IrrigationType = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Field", x => x.FieldId);
                    table.ForeignKey(
                        name: "FK_Field_Farmers_FarmerId",
                        column: x => x.FarmerId,
                        principalTable: "Farmers",
                        principalColumn: "FarmerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiseasePesticideMappings",
                columns: table => new
                {
                    DiseasePesticideMappingId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DiseaseId = table.Column<int>(type: "integer", nullable: false),
                    PesticideId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiseasePesticideMappings", x => x.DiseasePesticideMappingId);
                    table.ForeignKey(
                        name: "FK_DiseasePesticideMappings_Diseases_DiseaseId",
                        column: x => x.DiseaseId,
                        principalTable: "Diseases",
                        principalColumn: "DiseaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiseasePesticideMappings_Pesticides_PesticideId",
                        column: x => x.PesticideId,
                        principalTable: "Pesticides",
                        principalColumn: "PesticideId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuidanceUpdates",
                columns: table => new
                {
                    GuidanceUpdatesId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GuideId = table.Column<int>(type: "integer", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedWaterLevel = table.Column<double>(type: "double precision", nullable: false),
                    RecommendedWaterLevel = table.Column<double>(type: "double precision", nullable: false),
                    UpdatedFertilizer = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    UpdatedPesticides = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ReasonForUpdate = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuidanceUpdates", x => x.GuidanceUpdatesId);
                    table.ForeignKey(
                        name: "FK_GuidanceUpdates_StandardGuides_GuideId",
                        column: x => x.GuideId,
                        principalTable: "StandardGuides",
                        principalColumn: "GuideId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Crop",
                columns: table => new
                {
                    CropId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldId = table.Column<int>(type: "integer", nullable: false),
                    CropType = table.Column<string>(type: "text", nullable: false),
                    Variety = table.Column<string>(type: "text", nullable: false),
                    PlantingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpectedHarvestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Season = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crop", x => x.CropId);
                    table.ForeignKey(
                        name: "FK_Crop_Field_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Field",
                        principalColumn: "FieldId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeatherData",
                columns: table => new
                {
                    WeatherDataId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldId = table.Column<int>(type: "integer", nullable: false),
                    DateRecorded = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Temperature = table.Column<double>(type: "double precision", nullable: false),
                    Humidity = table.Column<double>(type: "double precision", nullable: false),
                    Rainfall = table.Column<double>(type: "double precision", nullable: false),
                    WindSpeed = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherData", x => x.WeatherDataId);
                    table.ForeignKey(
                        name: "FK_WeatherData_Field_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Field",
                        principalColumn: "FieldId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CultivationData",
                columns: table => new
                {
                    CultivationDataId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CropId = table.Column<int>(type: "integer", nullable: false),
                    DateRecorded = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GrowthStage = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    WaterLevel = table.Column<string>(type: "text", nullable: false),
                    FertilizerUsed = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PesticideUsed = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    DiseaseReport = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DiseaseId = table.Column<int>(type: "integer", nullable: false),
                    PesticideId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CultivationData", x => x.CultivationDataId);
                    table.ForeignKey(
                        name: "FK_CultivationData_Crop_CropId",
                        column: x => x.CropId,
                        principalTable: "Crop",
                        principalColumn: "CropId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CultivationData_Diseases_DiseaseId",
                        column: x => x.DiseaseId,
                        principalTable: "Diseases",
                        principalColumn: "DiseaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CultivationData_Pesticides_PesticideId",
                        column: x => x.PesticideId,
                        principalTable: "Pesticides",
                        principalColumn: "PesticideId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "YieldData",
                columns: table => new
                {
                    YieldDataId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CropId = table.Column<int>(type: "integer", nullable: false),
                    HarvestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    YieldAmount = table.Column<int>(type: "integer", nullable: false),
                    GrainQuality = table.Column<int>(type: "integer", nullable: false),
                    Season = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YieldData", x => x.YieldDataId);
                    table.ForeignKey(
                        name: "FK_YieldData_Crop_CropId",
                        column: x => x.CropId,
                        principalTable: "Crop",
                        principalColumn: "CropId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crop_FieldId",
                table: "Crop",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_CultivationData_CropId",
                table: "CultivationData",
                column: "CropId");

            migrationBuilder.CreateIndex(
                name: "IX_CultivationData_DiseaseId",
                table: "CultivationData",
                column: "DiseaseId");

            migrationBuilder.CreateIndex(
                name: "IX_CultivationData_PesticideId",
                table: "CultivationData",
                column: "PesticideId");

            migrationBuilder.CreateIndex(
                name: "IX_DiseasePesticideMappings_DiseaseId",
                table: "DiseasePesticideMappings",
                column: "DiseaseId");

            migrationBuilder.CreateIndex(
                name: "IX_DiseasePesticideMappings_PesticideId",
                table: "DiseasePesticideMappings",
                column: "PesticideId");

            migrationBuilder.CreateIndex(
                name: "IX_Field_FarmerId",
                table: "Field",
                column: "FarmerId");

            migrationBuilder.CreateIndex(
                name: "IX_GuidanceUpdates_GuideId",
                table: "GuidanceUpdates",
                column: "GuideId");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherData_FieldId",
                table: "WeatherData",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_YieldData_CropId",
                table: "YieldData",
                column: "CropId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CultivationData");

            migrationBuilder.DropTable(
                name: "DiseasePesticideMappings");

            migrationBuilder.DropTable(
                name: "GuidanceUpdates");

            migrationBuilder.DropTable(
                name: "WeatherData");

            migrationBuilder.DropTable(
                name: "YieldData");

            migrationBuilder.DropTable(
                name: "Diseases");

            migrationBuilder.DropTable(
                name: "Pesticides");

            migrationBuilder.DropTable(
                name: "StandardGuides");

            migrationBuilder.DropTable(
                name: "Crop");

            migrationBuilder.DropTable(
                name: "Field");

            migrationBuilder.DropTable(
                name: "Farmers");
        }
    }
}
