using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCropTypesAndVarieties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Crop_CropVarieties_CropVarietyId",
                table: "Crop");

            migrationBuilder.DropIndex(
                name: "IX_Crop_CropVarietyId",
                table: "Crop");

            migrationBuilder.DropColumn(
                name: "CropVarietyId",
                table: "Crop");

            migrationBuilder.AddColumn<int>(
                name: "CropTypeNavigationCropTypeId",
                table: "CropVarieties",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CropVarieties_CropTypeNavigationCropTypeId",
                table: "CropVarieties",
                column: "CropTypeNavigationCropTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CropVarieties_CropTypes_CropTypeNavigationCropTypeId",
                table: "CropVarieties",
                column: "CropTypeNavigationCropTypeId",
                principalTable: "CropTypes",
                principalColumn: "CropTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CropVarieties_CropTypes_CropTypeNavigationCropTypeId",
                table: "CropVarieties");

            migrationBuilder.DropIndex(
                name: "IX_CropVarieties_CropTypeNavigationCropTypeId",
                table: "CropVarieties");

            migrationBuilder.DropColumn(
                name: "CropTypeNavigationCropTypeId",
                table: "CropVarieties");

            migrationBuilder.AddColumn<int>(
                name: "CropVarietyId",
                table: "Crop",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Crop_CropVarietyId",
                table: "Crop",
                column: "CropVarietyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Crop_CropVarieties_CropVarietyId",
                table: "Crop",
                column: "CropVarietyId",
                principalTable: "CropVarieties",
                principalColumn: "CropVarietyId");
        }
    }
}
