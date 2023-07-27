using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using MyBand.Models;
using MyBand.Repositories;

namespace MyBand.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class BandUserRequestController : ControllerBase
    {
        private readonly IBandUserRequestRepository _bandUserRequestRepository;
        public BandUserRequestController(IBandUserRequestRepository bandUserRequestRepository)
        {
            _bandUserRequestRepository = bandUserRequestRepository;
        }

        [HttpPost]
        public IActionResult Add(BandUserRequest bandUserRequest)
        {
            _bandUserRequestRepository.Add(bandUserRequest);
            return Ok(_bandUserRequestRepository.GetAllBandUserRequests());
        }

        [HttpPut]
        public IActionResult Edit(BandUserRequest bandUserRequest)
        {
            _bandUserRequestRepository.Update(bandUserRequest);
            return Ok(bandUserRequest);
        }

        [HttpGet("GetByBandId")]
        public IActionResult GetByBandId(int id)
        {
            var request = _bandUserRequestRepository.GetByBandId(id);
            if (request == null)
            {
                return NotFound();
            }
            return Ok(request);
        }

        [HttpGet("GetByIdWithEverything")]
        public IActionResult GetByIdWithEverything(int id)
        {
            var request = _bandUserRequestRepository.GetByIdWithEverything(id);
            if (request == null)
            {
                return NotFound();
            }
            return Ok(request);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bandUserRequestRepository.Delete(id);
            return Ok(_bandUserRequestRepository.GetAllBandUserRequests());
        }
    }
}

