using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using MyBand.Models;
using MyBand.Repositories;
using Azure;

namespace MyBand.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class BandController : ControllerBase
    {
        private readonly IBandRepository _bandRepository;
        public BandController(IBandRepository bandRepository)
        {
            _bandRepository = bandRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bandRepository.GetAllBands());
        }

        [HttpGet("GetByIdWithUsers")]
        public IActionResult GetByIdWithUsers(int id)
        {
            var band = _bandRepository.GetByIdWithUsers(id);
            if (band == null)
            {
                return NotFound();
            }
            return Ok(band);
        }

        [HttpPost]
        public IActionResult AddBand(Band band)
        {
            _bandRepository.Add(band);
            return Ok(band.id);
        }

        [HttpGet("GetByIdWithLeaders")]
        public IActionResult GetByIdWithLeaders(int id)
        {
            var band = _bandRepository.GetByIdWithLeaders(id);
            if (band == null)
            {
                return NotFound();
            }
            return Ok(band);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(Band band)
        {
            _bandRepository.Update(band);
            return Ok(band);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bandRepository.Delete(id);
            return Ok(_bandRepository.GetAllBands());
        }

        [HttpGet("GetByIdWithRequests")]
        public IActionResult GetByIdWithRequests(int id)
        {
            var band = _bandRepository.GetByIdWithRequests(id);
            if (band == null)
            {
                return NotFound();
            }
            return Ok(band);
        }
    }
}

