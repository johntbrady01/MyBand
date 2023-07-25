import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import UserList from "./UserList";
import BandList from "./BandList";
import { UserDetails } from "./UserDetails";


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
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};