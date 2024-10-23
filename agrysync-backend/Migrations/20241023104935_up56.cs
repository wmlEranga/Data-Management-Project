using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class up56 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "HarvestDuration",
                table: "CropVarieties",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "HarvestDuration",
                table: "CropVarieties",
                type: "integer",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
