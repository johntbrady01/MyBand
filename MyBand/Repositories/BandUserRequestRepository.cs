using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyBand.Models;
using MyBand.Utils;

namespace MyBand.Repositories
{
    public class BandUserRequestRepository : BaseRepository, IBandUserRequestRepository
    {
        public BandUserRequestRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(BandUserRequest bandUserRequest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO BandUserRequest (userId, bandId, roleId, isLeader, isAccepted, note, sentByBand)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @bandId, @roleId, @isLeader, @isAccepted, @note, @sentByBand)";

                    DbUtils.AddParameter(cmd, "@userId", bandUserRequest.userId);
                    DbUtils.AddParameter(cmd, "@bandId", bandUserRequest.bandId);
                    DbUtils.AddParameter(cmd, "@roleId", bandUserRequest.roleId);
                    DbUtils.AddParameter(cmd, "@isLeader", bandUserRequest.isLeader);
                    DbUtils.AddParameter(cmd, "@isAccepted", bandUserRequest.isAccepted);
                    DbUtils.AddParameter(cmd, "@note", bandUserRequest.note);
                    DbUtils.AddParameter(cmd, "@sentByBand", bandUserRequest.sentByBand);

                    bandUserRequest.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<BandUserRequest> GetAllBandUserRequests()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM [BandUserRequest]";

                    var bandUserRequests = new List<BandUserRequest>();


                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        bandUserRequests.Add(new BandUserRequest()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            bandId = DbUtils.GetInt(reader, "bandId"),
                            roleId = DbUtils.GetInt(reader, "roleId"),
                            isLeader = reader.GetBoolean(reader.GetOrdinal("isLeader")),
                            isAccepted = reader.GetBoolean(reader.GetOrdinal("isAccepted")),
                            note = DbUtils.GetString(reader, "note"),
                            sentByBand = reader.GetBoolean(reader.GetOrdinal("sentByBand"))

                        });

                    }
                    return bandUserRequests;
                }
            }
        }

        public void Update(BandUserRequest bandUserRequest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE BandUserRequest " +
                                      "SET [userId] = @userId, " +
                                      "[bandId] = @bandId, " +
                                      "[roleId] = @roleId, " +
                                      "[isLeader] = @isLeader, " +
                                      "[isAccepted] = @isAccepted, " +
                                      "[note] = @note, " +
                                      "[sentByBand] = @sentByBand " +
                                      "WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", bandUserRequest.id);
                    cmd.Parameters.AddWithValue("@userId", bandUserRequest.userId);
                    cmd.Parameters.AddWithValue("@bandId", bandUserRequest.bandId);
                    cmd.Parameters.AddWithValue("@roleId", bandUserRequest.roleId);
                    cmd.Parameters.AddWithValue("@isLeader", bandUserRequest.isLeader);
                    cmd.Parameters.AddWithValue("@isAccepted", bandUserRequest.isAccepted);
                    cmd.Parameters.AddWithValue("@note", bandUserRequest.note);
                    cmd.Parameters.AddWithValue("@sentByBand", bandUserRequest.sentByBand);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<BandUserRequest> GetByBandId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT  bUR.id AS requestId, bUR.userId, bUR.bandId, bUR.roleId, bUR.isLeader, bUR.isAccepted, bUR.note, bUR.sentByBand, 
                    b.id AS bandId, b.name AS bandName, u.id AS userId, u.name AS userName, r.name AS roleName
                    FROM BandUserRequest BUR
                    JOIN Band b on bUR.bandId=b.id
                    JOIN [User] u on bUR.userId=u.id
                    JOIN [Role] r on bUR.roleId=r.id
                    WHERE isAccepted=0
                    AND bandId=@Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var bandUserRequests = new List<BandUserRequest>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {




                        while (reader.Read())
                        {


                            bandUserRequests.Add(new BandUserRequest()
                            {
                                id = DbUtils.GetInt(reader, "requestId"),
                                userId = DbUtils.GetInt(reader, "userId"),
                                bandId = DbUtils.GetInt(reader, "bandId"),
                                roleId = DbUtils.GetInt(reader, "roleId"),
                                isLeader = reader.GetBoolean(reader.GetOrdinal("isLeader")),
                                isAccepted = reader.GetBoolean(reader.GetOrdinal("isAccepted")),
                                note = DbUtils.GetString(reader, "note"),
                                sentByBand = reader.GetBoolean(reader.GetOrdinal("sentByBand")),
                                band = new Band()
                                {
                                    id = DbUtils.GetInt(reader, "bandId"),
                                    name = DbUtils.GetString(reader, "bandName"),
                                },
                                user = new User()
                                {
                                    id = DbUtils.GetInt(reader, "userId"),
                                    name = DbUtils.GetString(reader, "userName"),
                                },
                                role = new Role()
                                {
                                    id = DbUtils.GetInt(reader, "roleId"),
                                    name = DbUtils.GetString(reader, "roleName"),
                                }
                            });

                        }

                        return bandUserRequests;

                    }
                }
            }

        }

        public BandUserRequest GetByIdWithEverything(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT  bUR.id AS requestId, bUR.userId, bUR.bandId, bUR.roleId, bUR.isLeader, bUR.isAccepted, bUR.note, bUR.sentByBand, 
                    b.id AS bandId, b.name AS bandName, b.bio AS bandBio, b.profilePic AS bandPic, b.genres AS bandGenres, b.searchingFor,
                     u.id AS userId, u.username, u.email, u.firebaseId, u.name AS userName, u.bio AS userBio, u.profilePic AS userPic, u.genres AS userGenres, u.skills,
                     r.name AS roleName
                    FROM BandUserRequest BUR
                    JOIN Band b on bUR.bandId=b.id
                    JOIN [User] u on bUR.userId=u.id
                    JOIN [Role] r on bUR.roleId=r.id
                    WHERE isAccepted=0
                    AND bUR.id=@Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {


                        BandUserRequest request = null;

                        while (reader.Read())
                        {
                            if (request == null)
                            {

                                request = new BandUserRequest()
                                {
                                    id = DbUtils.GetInt(reader, "requestId"),
                                    userId = DbUtils.GetInt(reader, "userId"),
                                    bandId = DbUtils.GetInt(reader, "bandId"),
                                    roleId = DbUtils.GetInt(reader, "roleId"),
                                    isLeader = reader.GetBoolean(reader.GetOrdinal("isLeader")),
                                    isAccepted = reader.GetBoolean(reader.GetOrdinal("isAccepted")),
                                    note = DbUtils.GetString(reader, "note"),
                                    sentByBand = reader.GetBoolean(reader.GetOrdinal("sentByBand")),
                                    band = new Band()
                                    {
                                        id = DbUtils.GetInt(reader, "bandId"),
                                        name = DbUtils.GetString(reader, "bandName"),
                                        bio = DbUtils.GetString(reader, "bandBio"),
                                        profilePic = DbUtils.GetString(reader, "bandPic"),
                                        genres = DbUtils.GetString(reader, "bandGenres"),
                                        searchingFor = DbUtils.GetString(reader, "searchingFor"),
                                    },
                                    user = new User()
                                    {
                                        id = DbUtils.GetInt(reader, "userId"),
                                        username = DbUtils.GetString(reader, "username"),
                                        email = DbUtils.GetString(reader, "email"),
                                        firebaseId = DbUtils.GetString(reader, "firebaseId"),
                                        name = DbUtils.GetString(reader, "userName"),
                                        bio = DbUtils.GetString(reader, "userBio"),
                                        profilePic = DbUtils.GetString(reader, "userPic"),
                                        genres = DbUtils.GetString(reader, "userGenres"),
                                        skills = DbUtils.GetString(reader, "skills"),
                                    },
                                    role = new Role()
                                    {
                                        id = DbUtils.GetInt(reader, "roleId"),
                                        name = DbUtils.GetString(reader, "roleName"),
                                    }
                                };
                            }
                        }

                        return request;


                    }
                }
            }

        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM BandUserRequest WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<BandUserRequest> GetMembersByBandId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT  bUR.id AS requestId, bUR.userId, bUR.bandId, bUR.roleId, bUR.isLeader, bUR.isAccepted, bUR.note, bUR.sentByBand, 
                    b.id AS bandId, b.name AS bandName, u.id AS userId, u.profilePic AS userPic, u.name AS userName, r.name AS roleName
                    FROM BandUserRequest BUR
                    JOIN Band b on bUR.bandId=b.id
                    JOIN [User] u on bUR.userId=u.id
                    JOIN [Role] r on bUR.roleId=r.id
                    WHERE isAccepted=1
                    AND bandId=@Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var bandUserRequests = new List<BandUserRequest>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {




                        while (reader.Read())
                        {


                            bandUserRequests.Add(new BandUserRequest()
                            {
                                id = DbUtils.GetInt(reader, "requestId"),
                                userId = DbUtils.GetInt(reader, "userId"),
                                bandId = DbUtils.GetInt(reader, "bandId"),
                                roleId = DbUtils.GetInt(reader, "roleId"),
                                isLeader = reader.GetBoolean(reader.GetOrdinal("isLeader")),
                                isAccepted = reader.GetBoolean(reader.GetOrdinal("isAccepted")),
                                note = DbUtils.GetString(reader, "note"),
                                sentByBand = reader.GetBoolean(reader.GetOrdinal("sentByBand")),
                                band = new Band()
                                {
                                    id = DbUtils.GetInt(reader, "bandId"),
                                    name = DbUtils.GetString(reader, "bandName"),
                                },
                                user = new User()
                                {
                                    id = DbUtils.GetInt(reader, "userId"),
                                    name = DbUtils.GetString(reader, "userName"),
                                    profilePic = DbUtils.GetString(reader, "userPic"),
                                },
                                role = new Role()
                                {
                                    id = DbUtils.GetInt(reader, "roleId"),
                                    name = DbUtils.GetString(reader, "roleName"),
                                }
                            });

                        }

                        return bandUserRequests;

                    }
                }
            }

        }
    }
}

