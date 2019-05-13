using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RosterAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace RosterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RostersController : ControllerBase
    {
        private readonly DBContext _context;

        public RostersController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Rosters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roster>>> Getrosters()
        {
            return await _context.rosters.ToListAsync();
        }

        // GET: api/Rosters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Roster>> GetRoster(int id)
        {
            var roster = await _context.rosters.FindAsync(id);

            if (roster == null)
            {
                return NotFound();
            }

            return roster;
        }

        // PUT: api/Rosters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoster(int id, Roster roster)
        {
            if (id != roster.RosterID)
            {
                return BadRequest();
            }

            _context.Entry(roster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RosterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rosters
        [HttpPost]
        public async Task<ActionResult<Roster>> PostRoster(Roster roster)
        {
            _context.rosters.Add(roster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoster", new { id = roster.RosterID }, roster);
        }

        // DELETE: api/Rosters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Roster>> DeleteRoster(int id)
        {
            var roster = await _context.rosters.FindAsync(id);
            if (roster == null)
            {
                return NotFound();
            }

            _context.rosters.Remove(roster);
            await _context.SaveChangesAsync();

            return roster;
        }

        private bool RosterExists(int id)
        {
            return _context.rosters.Any(e => e.RosterID == id);
        }
    }
}
