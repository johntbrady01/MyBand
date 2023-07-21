import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import UserList from "./UserList";


export default function ApplicationViews({ isLoggedIn, profile }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <UserList /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};