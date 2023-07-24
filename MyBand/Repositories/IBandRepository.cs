using System;
using MyBand.Models;
using System.Collections.Generic;

namespace MyBand.Repositories
{
	public interface IBandRepository
	{
        public List<Band> GetAllBands();

    }
}

