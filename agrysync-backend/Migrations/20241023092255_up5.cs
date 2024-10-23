using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class up5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FieldName",
                table: "Field",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FieldName",
                table: "Field");
        }
    }
}
