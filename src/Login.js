import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://login-page-backend-998p.onrender.com/api/login", formData);
            localStorage.setItem("token", response.data.token);
            onLogin();
        } catch (error) {
            setMessage(error.response?.data?.error || "❌ Login failed!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Login</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField label="Email" name="email" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
            </Box>
            {message && <Typography color="error">{message}</Typography>}
        </Container>
    );
};

export default Login;
