using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class up567 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
