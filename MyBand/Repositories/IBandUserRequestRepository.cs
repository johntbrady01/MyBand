using System;
using MyBand.Models;
using System.Collections.Generic;

namespace MyBand.Repositories
{
	public interface IBandUserRequestRepository
	{
        public void Add(BandUserRequest bandUserRequest);
        public List<BandUserRequest> GetAllBandUserRequests();
        public void Update(BandUserRequest bandUserRequest);
        public List<BandUserRequest> GetByBandId(int id);
        public BandUserRequest GetByIdWithEverything(int id);
        public void Delete(int id);

    }
}

