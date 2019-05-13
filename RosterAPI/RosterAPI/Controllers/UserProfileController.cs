using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RosterAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace RosterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly DBContext _context;

        public UserProfileController(DBContext context)
        {
            _context = context;
        }
        // GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
       
    }
}
