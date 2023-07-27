using System;
using MyBand.Models;
using System.Collections.Generic;

namespace MyBand.Repositories
{
	public interface IBandRepository
	{
        public List<Band> GetAllBands();
        public Band GetByIdWithUsers(int id);
        public void Add(Band band);
        public Band GetByIdWithLeaders(int id);
        public void Update(Band band);

    }
}

