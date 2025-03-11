import { Box, Typography, TextField } from "@mui/material";

export default function DescriptionInput({ description, setDescription }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>Any Specific Requests?</Typography>
      <TextField fullWidth multiline rows={4} placeholder="Enter queries or interview preferences..." value={description} onChange={(e) => setDescription(e.target.value)} />
    </Box>
  );
}
