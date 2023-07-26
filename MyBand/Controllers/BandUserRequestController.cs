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
    }
}

