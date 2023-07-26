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
                            isLeader =reader.GetBoolean(reader.GetOrdinal("isLeader")),
                            isAccepted = reader.GetBoolean(reader.GetOrdinal( "isAccepted")),
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


    }
}

