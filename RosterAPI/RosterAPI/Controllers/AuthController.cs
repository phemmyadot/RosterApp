using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RosterAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace RosterAPI.Controllers
{
  [Route("Token/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    // GET api/values

    private readonly DBContext _context;
    private readonly JWT _appSettings;

    public AuthController(DBContext context, IOptions<JWT> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }
    
    [HttpPost]
    public IActionResult Login(User user)
    {
      var userDetails = _context.users.Where(x => x.Username == user.Username && x.Password == user.Password).FirstOrDefault();

      if (userDetails == null)
        {
          return Unauthorized();
        }
        else
        {
          var tokenDescription = new SecurityTokenDescriptor
          {
            Subject = new ClaimsIdentity(new Claim[]
            {
              new Claim("UserName", user.Username)
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.key)), SecurityAlgorithms.HmacSha256)
          };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescription);
        var token = tokenHandler.WriteToken(securityToken);
        return Ok(new { token });
        }
      
    }
  }
}
