using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Galeria_API.Migrations
{
    public partial class ColumnAddUploadedDateTimeInTablePictures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedDateTime",
                table: "Pictures",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UploadedDateTime",
                table: "Pictures");
        }
    }
}
