import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import UserList from "./UserList";
import BandList from "./BandList";
import { UserDetails } from "./UserDetails";
import { BandDetails } from "./BandDetails";
import { AddBand } from "./AddBand";
import { BandUserRequest } from "./BandUserRequest";
import SeeBandRequests from "./SeeBandRequests";
import { UpdateBand } from "./UpdateBand";
import { DeleteBand } from "./DeleteBand";


export default function ApplicationViews({ isLoggedIn, userProfile }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <UserList userProfile={userProfile} /> : <Navigate to="/login" />}
                    />
                    <Route path="bands" element={<BandList />} />
                    <Route path="login" element={<Login />} />
                    <Route path="User/:userId" element={<UserDetails />} />
                    <Route path="/bands/create" element={<AddBand userProfile={userProfile} />} />
                    <Route path="/bandrequest/:bandId" element={<BandUserRequest userProfile={userProfile} />} />
                    <Route path="/updateband/:bandId" element={<UpdateBand userProfile={userProfile} />} />
                    <Route path="/deleteband/:bandId" element={<DeleteBand userProfile={userProfile} />} />
                    <Route path="/bandrequests/:bandId" element={<SeeBandRequests userProfile={userProfile} />} />
                    <Route path="Band/:bandId" element={<BandDetails userProfile={userProfile} />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};