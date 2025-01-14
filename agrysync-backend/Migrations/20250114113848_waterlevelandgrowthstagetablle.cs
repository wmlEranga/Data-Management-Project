using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace agrysync_backend.Migrations
{
    /// <inheritdoc />
    public partial class waterlevelandgrowthstagetablle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_Diseases_DiseaseId",
                table: "CultivationData");

            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_Pesticides_PesticideId",
                table: "CultivationData");

            migrationBuilder.DropColumn(
                name: "GrowthStage",
                table: "CultivationData");

            migrationBuilder.DropColumn(
                name: "WaterLevel",
                table: "CultivationData");

            migrationBuilder.AlterColumn<string>(
                name: "PesticideUsed",
                table: "CultivationData",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "PesticideId",
                table: "CultivationData",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "FertilizerUsed",
                table: "CultivationData",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "DiseaseReport",
                table: "CultivationData",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<int>(
                name: "DiseaseId",
                table: "CultivationData",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "GrowthStageId",
                table: "CultivationData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WaterLevelId",
                table: "CultivationData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "GrowthStages",
                columns: table => new
                {
                    GrowthStageId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GrowthStageName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrowthStages", x => x.GrowthStageId);
                });

            migrationBuilder.CreateTable(
                name: "WaterLevels",
                columns: table => new
                {
                    WaterLevelId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WaterLevelName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterLevels", x => x.WaterLevelId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CultivationData_GrowthStageId",
                table: "CultivationData",
                column: "GrowthStageId");

            migrationBuilder.CreateIndex(
                name: "IX_CultivationData_WaterLevelId",
                table: "CultivationData",
                column: "WaterLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_Diseases_DiseaseId",
                table: "CultivationData",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "DiseaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_GrowthStages_GrowthStageId",
                table: "CultivationData",
                column: "GrowthStageId",
                principalTable: "GrowthStages",
                principalColumn: "GrowthStageId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_Pesticides_PesticideId",
                table: "CultivationData",
                column: "PesticideId",
                principalTable: "Pesticides",
                principalColumn: "PesticideId");

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_WaterLevels_WaterLevelId",
                table: "CultivationData",
                column: "WaterLevelId",
                principalTable: "WaterLevels",
                principalColumn: "WaterLevelId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_Diseases_DiseaseId",
                table: "CultivationData");

            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_GrowthStages_GrowthStageId",
                table: "CultivationData");

            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_Pesticides_PesticideId",
                table: "CultivationData");

            migrationBuilder.DropForeignKey(
                name: "FK_CultivationData_WaterLevels_WaterLevelId",
                table: "CultivationData");

            migrationBuilder.DropTable(
                name: "GrowthStages");

            migrationBuilder.DropTable(
                name: "WaterLevels");

            migrationBuilder.DropIndex(
                name: "IX_CultivationData_GrowthStageId",
                table: "CultivationData");

            migrationBuilder.DropIndex(
                name: "IX_CultivationData_WaterLevelId",
                table: "CultivationData");

            migrationBuilder.DropColumn(
                name: "GrowthStageId",
                table: "CultivationData");

            migrationBuilder.DropColumn(
                name: "WaterLevelId",
                table: "CultivationData");

            migrationBuilder.AlterColumn<string>(
                name: "PesticideUsed",
                table: "CultivationData",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PesticideId",
                table: "CultivationData",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FertilizerUsed",
                table: "CultivationData",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DiseaseReport",
                table: "CultivationData",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DiseaseId",
                table: "CultivationData",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GrowthStage",
                table: "CultivationData",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WaterLevel",
                table: "CultivationData",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_Diseases_DiseaseId",
                table: "CultivationData",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "DiseaseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CultivationData_Pesticides_PesticideId",
                table: "CultivationData",
                column: "PesticideId",
                principalTable: "Pesticides",
                principalColumn: "PesticideId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
