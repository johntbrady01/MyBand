using System;
using MyBand.Models;
using Microsoft.Extensions.Configuration;
using MyBand.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace MyBand.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                          FROM [User]
                         WHERE firebaseId = @firebaseId";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            username = DbUtils.GetString(reader, "username"),
                            email = DbUtils.GetString(reader, "email"),
                            firebaseId = DbUtils.GetString(reader, "firebaseId"),
                            name = DbUtils.GetString(reader, "name"),
                            bio = DbUtils.GetString(reader, "bio"),
                            profilePic = DbUtils.GetString(reader, "profilePic"),
                            genres = DbUtils.GetString(reader, "genres"),
                            skills = DbUtils.GetString(reader, "skills"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM [User]";

                    var users = new List<User>();


                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            username = DbUtils.GetString(reader, "username"),
                            email = DbUtils.GetString(reader, "email"),
                            firebaseId = DbUtils.GetString(reader, "firebaseId"),
                            name = DbUtils.GetString(reader, "name"),
                            bio = DbUtils.GetString(reader, "bio"),
                            profilePic = DbUtils.GetString(reader, "profilePic"),
                            genres = DbUtils.GetString(reader, "genres"),
                            skills = DbUtils.GetString(reader, "skills"),
                        });

                    }
                        return users;
                }
            }
        }

        public User GetByIdWithBands(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id AS UserId, u.userName, u.email, u.firebaseId, u.name, 
                        u.bio AS UserBio, u.profilePic AS UserProfilePic, u.genres, u.skills,
                        b.profilePic AS BandProfilePic, b.name AS BandName, b.Id AS BandId,
                        BandUserRequest.isAccepted
                        FROM [User] u
                        LEFT JOIN [BandUserRequest] ON BandUserRequest.userId = u.id AND BandUserRequest.isAccepted = 1
                        LEFT JOIN Band b ON b.id = BandUserRequest.bandId
                        WHERE u.id =@Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {


                        User user = null;

                        while (reader.Read())
                        {
                            if (user == null)
                            {

                                user = new User()
                                {
                                    id = DbUtils.GetInt(reader, "UserId"),
                                    username = DbUtils.GetString(reader, "username"),
                                    email = DbUtils.GetString(reader, "email"),
                                    firebaseId = DbUtils.GetString(reader, "firebaseId"),
                                    name = DbUtils.GetString(reader, "name"),
                                    bio = DbUtils.GetString(reader, "UserBio"),
                                    profilePic = DbUtils.GetString(reader, "UserProfilePic"),
                                    genres = DbUtils.GetString(reader, "genres"),
                                    skills = DbUtils.GetString(reader, "skills"),
                                    bands = new List<Band>()
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "isAccepted"))
                            {
                                user.bands.Add(new Band()
                                {
                                    id = DbUtils.GetInt(reader, "BandId"),
                                    name = DbUtils.GetString(reader, "BandName"),
                                    profilePic = DbUtils.GetString(reader, "BandProfilePic"),
                                });
                            }
                        }

                        return user;


                    }
                }
            }

        }
    }
}

