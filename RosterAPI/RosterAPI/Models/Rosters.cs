using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RosterAPI.Models
{
    public class Roster
    {
    [Key]
    public int RosterID { get; set; }
    [Required]
    [Column(TypeName = "nvarchar(10)")]
    public string RosterName { get; set; }
    [Required]
    [Column(TypeName = "nvarchar(20)")]
    public string RosterDescription { get; set; } 
    [Required]
    [Column(TypeName = "nvarchar(10)")]
    public string ColorName { get; set; }
  }
}
