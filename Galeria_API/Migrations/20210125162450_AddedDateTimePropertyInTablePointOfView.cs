using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Galeria_API.Migrations
{
    public partial class AddedDateTimePropertyInTablePointOfView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedDateTime",
                table: "PointsOfView",
                nullable: false,
                defaultValue: DateTime.Now);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedDateTime",
                table: "PointsOfView");
        }
    }
}
