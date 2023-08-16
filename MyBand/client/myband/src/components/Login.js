import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import logo from "../photos/logo.png"


export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return <>
        <div className="LoginPage">
            <div className="Login">
                <Form onSubmit={loginSubmit}>
                    <fieldset>
                        <h2>Login</h2>
                        <hr />
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
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
                            <Button style={{ backgroundColor: 'rgb(253,216,19)', color: 'black', width: '100%' }}>Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="/register">Register</Link>
                        </em>
                    </fieldset>
                </Form>
            </div>
            <img src={logo}
                style={{
                    width: '17rem',
                    height: '20rem',
                    marginRight: '17rem',
                    marginTop: '5rem'




                }} />
        </div>
    </>
}