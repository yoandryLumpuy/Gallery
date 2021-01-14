using Microsoft.EntityFrameworkCore.Migrations;

namespace Galeria_API.Migrations
{
    public partial class AddPropertyNameToPictures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Pictures",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Pictures");
        }
    }
}
