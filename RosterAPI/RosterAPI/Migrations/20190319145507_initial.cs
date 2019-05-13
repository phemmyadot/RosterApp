using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RosterAPI.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "colors",
                columns: table => new
                {
                    ColorID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ColorName = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    ColorCode = table.Column<string>(type: "nvarchar(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_colors", x => x.ColorID);
                });

            migrationBuilder.CreateTable(
                name: "rosters",
                columns: table => new
                {
                    RosterID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RosterName = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    RosterDescription = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    ColorName = table.Column<string>(type: "nvarchar(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rosters", x => x.RosterID);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    ConfirmPassword = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "colors");

            migrationBuilder.DropTable(
                name: "rosters");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
