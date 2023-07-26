using System;
using MyBand.Models;
using System.Collections.Generic;

namespace MyBand.Repositories
{
	public interface IRoleRepository
	{
        public List<Role> GetAllRoles();

    }
}

