"use client";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgress, TextField, Typography, Box, Button } from "@mui/material";
import { API } from "@/app/config/apiConfig";

export default function ResumeUpload() {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rawText, setRawText] = useState("");

    // Fetch Resume Data on Load
    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        setLoading(true);
        try {
            const response = await API.get("resume", {
                headers: {
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUzNDI4MjA0NTdlOGY2ZjI4YzhhZiIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzQwMDM3NDE2LCJleHAiOjE3NDI2Mjk0MTZ9.nL4qznV5juQeTZjNOb07oxeeG__RQf2gwHeU7xCyWQs`
                }
            });
            setResumeData(response.data);
            setRawText(response.data.rawText || "");
        } catch (error) {
            console.error("Error fetching resume:", error);
        }
        setLoading(false);
    };

    // Dropzone setup
    const { getRootProps, getInputProps } = useDropzone({
        accept: ".pdf",
        onDrop: (acceptedFiles) => {
            setSelectedFile(acceptedFiles[0]);
        }
    });

    // Upload Resume Function
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a resume file first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("resume", selectedFile);

        // try {
        //     const response = await API.post("resume/upload", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUzNDI4MjA0NTdlOGY2ZjI4YzhhZiIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzQwMDM3NDE2LCJleHAiOjE3NDI2Mjk0MTZ9.nL4qznV5juQeTZjNOb07oxeeG__RQf2gwHeU7xCyWQs`
        //         },
        //     });
        //     setResumeData(response.data);
        //     setRawText(response.data.rawText || "");
        // } catch (error) {
        //     console.error("Error uploading resume:", error);
        // }
        setLoading(false);
    };

    // Update Resume
    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put("resume", { rawText }, {
                headers: {
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUzNDI4MjA0NTdlOGY2ZjI4YzhhZiIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzQwMDM3NDE2LCJleHAiOjE3NDI2Mjk0MTZ9.nL4qznV5juQeTZjNOb07oxeeG__RQf2gwHeU7xCyWQs`
                }
            });
            alert("Resume updated successfully!");
        } catch (error) {
            console.error("Error updating resume:", error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ maxWidth: 700, margin: "auto", textAlign: "center", padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Upload Resume</Typography>

            {/* Resume Upload Box */}
            <Box
                {...getRootProps()}
                sx={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    cursor: "pointer",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: 2
                }}
            >
                <input {...getInputProps()} />
                <Typography>{selectedFile ? selectedFile.name : "Drag & Drop Resume (PDF) or Click to Select"}</Typography>
            </Box>

            {/* Upload Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ marginBottom: 2 }}
                disabled={loading}
                onKeyPress={(e) => e.key === "Enter" && handleUpload()}
            >
                Upload Resume
            </Button>

            {/* Show Loading Indicator */}
            {loading && <CircularProgress sx={{ marginTop: 2 }} />}

            {/* Show Extracted Resume Data Below */}
            {resumeData && (
                <Box sx={{ marginTop: 3, textAlign: "left", backgroundColor: "#f9f9f9", padding: 2, borderRadius: "8px", border: "1px solid #ddd" }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Extracted Resume Data</Typography>

                    {/* Show Editable Raw Text */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Raw Resume Text (Editable)</Typography>
                    <TextField
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        multiline
                        fullWidth
                        minRows={10}
                        sx={{
                            backgroundColor: "#fff",
                            padding: 2,
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace"
                        }}
                    />

                    <Button variant="contained" color="success" onClick={handleSave} sx={{ marginTop: 2 }}>
                        Save Changes
                    </Button>
                </Box>
            )}
        </Box>
    );
}
