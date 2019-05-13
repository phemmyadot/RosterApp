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
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly DBContext _context;

        public ColorsController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Colors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> Getcolors()
        {
            return await _context.colors.ToListAsync();
        }

        // GET: api/Colors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(int id)
        {
            var color = await _context.colors.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

        // PUT: api/Colors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(int id, Color color)
        {
            if (id != color.ColorID)
            {
                return BadRequest();
            }

            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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

        // POST: api/Colors
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            _context.colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.ColorID }, color);
        }

        // DELETE: api/Colors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Color>> DeleteColor(int id)
        {
            var color = await _context.colors.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            _context.colors.Remove(color);
            await _context.SaveChangesAsync();

            return color;
        }

        private bool ColorExists(int id)
        {
            return _context.colors.Any(e => e.ColorID == id);
        }
    }
}
