using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyBand.Models;
using MyBand.Utils;

namespace MyBand.Repositories
{
	public class BandRepository : BaseRepository, IBandRepository
    {
        public BandRepository(IConfiguration configuration) : base(configuration) { }

        public List<Band> GetAllBands()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM [Band]";

                    var bands = new List<Band>();


                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        bands.Add(new Band()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            name = DbUtils.GetString(reader, "name"),
                            bio = DbUtils.GetString(reader, "bio"),
                            profilePic = DbUtils.GetString(reader, "profilePic"),
                            genres = DbUtils.GetString(reader, "genres"),
                            searchingFor = DbUtils.GetString(reader, "searchingFor"),
                        });

                    }
                    return bands;
                }
            }
        }

        public Band GetByIdWithUsers(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT  b.profilePic AS BandProfilePic, b.name AS BandName, b.Id AS BandId,
                        bUR.isAccepted, bUR.roleId, r.Name As RoleName, b.bio, b.genres, b.searchingFor, u.Id AS UserId, u.firebaseId, u.name AS UserName, u.profilePic AS UserProfilePic
                        FROM Band b
                        JOIN BandUserRequest bUR ON b.id = bUR.bandId
                        JOIN [User] u ON bUR.userId=u.id
                        JOIN [Role] r on bUR.roleId=r.id
                        WHERE isAccepted=1
                        AND b.id=@Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {


                        Band band = null;

                        while (reader.Read())
                        {
                            if (band == null)
                            {

                                band=new Band()
                                {
                                    id = DbUtils.GetInt(reader, "BandId"),
                                    name = DbUtils.GetString(reader, "BandName"),
                                    bio = DbUtils.GetString(reader, "bio"),
                                    profilePic = DbUtils.GetString(reader, "BandProfilePic"),
                                    genres = DbUtils.GetString(reader, "genres"),
                                    searchingFor = DbUtils.GetString(reader, "searchingFor"),
                                    users = new List<User>()
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "isAccepted"))
                            {
                                band.users.Add(new User()
                                {
                                    id = DbUtils.GetInt(reader, "UserId"),
                                    name = DbUtils.GetString(reader, "UserName"),
                                    firebaseId= DbUtils.GetString(reader, "firebaseId"),
                                    profilePic = DbUtils.GetString(reader, "UserProfilePic"),
                                    role = DbUtils.GetString(reader, "RoleName")
                                });
                            }
                        }

                        return band;


                    }
                }
            }

        }

        public void Add(Band band)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Band (name, bio, profilePic, genres, searchingFor)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @bio, @profilePic, @genres, @searchingFor)";

                    DbUtils.AddParameter(cmd, "@name", band.name);
                    DbUtils.AddParameter(cmd, "@bio", band.bio);
                    DbUtils.AddParameter(cmd, "@profilePic", band.profilePic);
                    DbUtils.AddParameter(cmd, "@genres", band.genres);
                    DbUtils.AddParameter(cmd, "@searchingFor", band.searchingFor);

                    band.id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

