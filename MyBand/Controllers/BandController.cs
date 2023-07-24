using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using MyBand.Models;
using MyBand.Repositories;

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
    }
}

