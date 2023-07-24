using System;
using System.Collections.Generic;
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
    }
}

