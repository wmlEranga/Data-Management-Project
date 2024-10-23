using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class up6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CropVarietyId",
                table: "Crop",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CropTypes",
                columns: table => new
                {
                    CropTypeId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CropTypeName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CropTypes", x => x.CropTypeId);
                });

            migrationBuilder.CreateTable(
                name: "CropVarieties",
                columns: table => new
                {
                    CropVarietyId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CropTypeId = table.Column<int>(type: "integer", nullable: false),
                    Variety = table.Column<string>(type: "text", nullable: false),
                    HarvestDuration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CropVarieties", x => x.CropVarietyId);
                    table.ForeignKey(
                        name: "FK_CropVarieties_CropTypes_CropTypeId",
                        column: x => x.CropTypeId,
                        principalTable: "CropTypes",
                        principalColumn: "CropTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crop_CropVarietyId",
                table: "Crop",
                column: "CropVarietyId");

            migrationBuilder.CreateIndex(
                name: "IX_CropVarieties_CropTypeId",
                table: "CropVarieties",
                column: "CropTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Crop_CropVarieties_CropVarietyId",
                table: "Crop",
                column: "CropVarietyId",
                principalTable: "CropVarieties",
                principalColumn: "CropVarietyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crop_CropVarieties_CropVarietyId",
                table: "Crop");

            migrationBuilder.DropTable(
                name: "CropVarieties");

            migrationBuilder.DropTable(
                name: "CropTypes");

            migrationBuilder.DropIndex(
                name: "IX_Crop_CropVarietyId",
                table: "Crop");

            migrationBuilder.DropColumn(
                name: "CropVarietyId",
                table: "Crop");
        }
    }
}
