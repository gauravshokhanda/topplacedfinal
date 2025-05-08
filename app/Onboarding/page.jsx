"use client";
import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
} from "@mui/material";

export default function Onboarding() {
    const [domain, setDomain] = useState("");
    const [startYear, setStartYear] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [postRegularly, setPostRegularly] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ domain, startYear, linkedin, postRegularly });
        // Send data to API
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom right, #d0e8ff, #fff, #ffd5e5)",
                // padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    padding: 4,
                    borderRadius: 4,
                }}
            >
                <Box textAlign="center" mb={3}>
                    {/* <img src="/logo.png" alt="Logo" style={{ height: 40, marginBottom: 8 }} /> */}
                    <Typography sx={{ fontFamily: 'inherit', fontWeight: '800', fontSize: '18px' }} color="inherit" gutterBottom>
                        Tell us about Yourself
                    </Typography>
                    <Typography sx={{ fontSize: '11px', color: 'gray' }}>
                        Let’s setup your mentorship profile based on your professional details
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Domain Expertise"
                        fullWidth
                        required
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        size="small"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#d0d3d6",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#0A6E6E",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#0070f3",
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: "#333",       // Label color
                                fontSize: "14px",    // Label font size
                                fontWeight: 500,     // Optional: make it medium bold
                            },
                        }}
                    >
                        <MenuItem value="">Select Your Domain</MenuItem>
                        <MenuItem value="Frontend">Frontend</MenuItem>
                        <MenuItem value="Backend">Backend</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                    </TextField>

                    <TextField
                        type="number"
                        label="When did you start working?"
                        placeholder="XXXX - Enter Year"
                        fullWidth
                        required
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        margin="normal"
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#d0d3d6",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#0A6E6E",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#0070f3",
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: "#333",       // Label color
                                fontSize: "14px",    // Label font size
                                fontWeight: 500,     // Optional: make it medium bold
                            },
                        }}
                    />

                    <TextField
                        label="LinkedIn Profile"
                        type="url"
                        placeholder="https://www.linkedin.com/in/yourname"
                        fullWidth
                        required
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        size="small"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#d0d3d6",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#0A6E6E",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#0070f3",
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: "#333",
                                fontSize: "14px",
                                fontWeight: 500,
                            },
                        }}
                        helperText={
                            <a
                                href="https://www.linkedin.com/in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "#0A6E6E", fontSize: "12px", float: "right", fontWeight: 600 }}
                            >
                                Get Profile URL →
                            </a>
                        }
                    />

                    {/* <Box mt={3}>
                        <Typography variant="subtitle2" mb={1}>
                            Do you post regularly on any platform?
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={postRegularly}
                            onChange={(e, value) => {
                                if (value !== null) setPostRegularly(value);
                            }}
                        >
                            <ToggleButton value={true}>Yes, I Do</ToggleButton>
                            <ToggleButton value={false}>No, I Don’t</ToggleButton>
                        </ToggleButtonGroup>
                    </Box> */}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="small" // 👈 makes it smaller
                        sx={{
                            mt: 4,
                            py: 1, // reduce vertical padding
                            fontWeight: 600,
                            fontSize: "14px",
                            backgroundColor: "#0A6E6E", // ✅ custom background color
                            "&:hover": {
                                backgroundColor: "#095C5C", // optional: slightly darker on hover
                            },
                        }}
                    >
                        Save Details
                    </Button>

                </form>
            </Paper>
        </Box>
    );
}
