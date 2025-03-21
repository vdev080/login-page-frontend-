import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const UserForm = () => {
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

        try {
            const response = await axios.post("http://localhost:9000/api/register", formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "❌ Registration failed!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Register</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField label="Full Name" name="name" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Username" name="username" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Confirm Password" name="confirmPass" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Register</Button>
            </Box>
            {message && <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
        </Container>
    );
};

export default UserForm;
