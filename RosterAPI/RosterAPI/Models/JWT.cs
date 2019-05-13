using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosterAPI.Models
{
    public class JWT
    {
    public string key { get; set; }
    public string issuer { get; set; }
    public string audience { get; set; }
    public string Client_URL { get; set; }
  }
}
