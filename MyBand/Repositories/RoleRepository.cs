using System;
using MyBand.Models;
using Microsoft.Extensions.Configuration;
using MyBand.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace MyBand.Repositories
{
	public class RoleRepository : BaseRepository, IRoleRepository
    {
        public RoleRepository(IConfiguration configuration) : base(configuration) { }


        public List<Role> GetAllRoles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM [Role]";

                    var roles = new List<Role>();


                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        roles.Add(new Role()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            name = DbUtils.GetString(reader, "name")
                            
                        });

                    }
                    return roles;
                }
            }
        }
    }
}

