using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosterAPI.Models
{
    public class DBContext : DbContext
    {
    public DBContext(DbContextOptions<DBContext> options) : base(options)
      {

      }

    public DBContext()
    {
    }
      public DbSet<Color> colors { get; set; }
      public DbSet<Roster> rosters { get; set; }
      public DbSet<User> users { get; set; }
    }
}
