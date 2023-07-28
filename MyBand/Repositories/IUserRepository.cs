using System.Collections.Generic;
using MyBand.Models;

namespace MyBand.Repositories
{
    public interface IUserRepository
    {
        
        User GetByFirebaseId(string firebaseId);
        public List<User> GetAllUsers();
        public User GetByIdWithBands(int id);
        public void Update(User user);
        public void Add(User user);


    }
}
