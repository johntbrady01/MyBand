import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [profilePic, setprofilePic] = useState();
    const [genres, setGenres] = useState();
    const [skills, setSkills] = useState();
    const [bio, setBio] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                username,
                email,
                name,
                bio,
                profilePic,
                genres,
                skills
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="bio">Bio</Label>
                    <Input
                        id="bio"
                        type="text"
                        onChange={(e) => setBio(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="genres">Genres</Label>
                    <Input
                        id="genres"
                        type="text"
                        onChange={(e) => setGenres(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="skills">Skills</Label>
                    <Input
                        id="skills"
                        type="text"
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="profilePic">Profile Pic URL</Label>
                    <Input
                        id="profilePic"
                        type="text"
                        onChange={(e) => setprofilePic(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
