using System;
using Microsoft.AspNetCore.Mvc;
using MyBand.Repositories;



namespace MyBand.Controllers
{

    [Route("api/[controller]")]
    [ApiController]


    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_roleRepository.GetAllRoles());
        }
    }
}

