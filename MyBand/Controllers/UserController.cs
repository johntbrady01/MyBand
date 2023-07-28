using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using MyBand.Models;
using MyBand.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace MyBand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
 

    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetUser(string firebaseId)
        {
            return Ok(_userRepository.GetByFirebaseId(firebaseId));
        }

        [HttpGet("DoesUserExist/{firebaseId}")]
        public IActionResult DoesUserExist(string firebaseId)
        {
            var user = _userRepository.GetByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("Me")]
        [Authorize]
        public IActionResult Me()
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        
        private User GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("GetByIdWithBands")]
        public IActionResult GetByIdWithBands(int id)
        {
            var user = _userRepository.GetByIdWithBands(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(User user)
        {
            _userRepository.Update(user);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
       
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseId = user.firebaseId },
                user);
        }
    }
}


