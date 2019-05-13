using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosterAPI.Models
{
    public class DBContext:DbContext
    {
      public ColorContext(DbContextOptions<ColorContext> options):base(options)
      {
        
      }
      public DbSet<Color> Colors { get; set; }
      public DbSet<Roster> Rosters { get; set; }
  }
}
