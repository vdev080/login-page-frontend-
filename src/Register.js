import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPass: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPass) {
            setMessage("❌ Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("https://login-page-backend-998p.onrender.com/api/register", formData);
            setMessage(response.data.message);
            onRegister(); // Switch to Login Page
        } catch (error) {
            setMessage(error.response?.data?.error || "❌ Registration failed!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Sign Up</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField label="Full Name" name="name" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Username" name="username" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Confirm Password" name="confirmPass" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Register</Button>
            </Box>
            {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
            <Typography sx={{ mt: 2 }}>
                Already have an account? <Button onClick={onRegister}>Login</Button>
            </Typography>
        </Container>
    );
};

export default Register;
