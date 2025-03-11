import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const fields = ["Software Engineering", "Data Science", "Product Management", "Cybersecurity", "Cloud Computing"];

export default function FieldSelection({ selectedField, setSelectedField }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>Choose Your Field</Typography>
      <FormControl fullWidth>
        <InputLabel>Select Field</InputLabel>
        <Select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
          {fields.map((field, index) => (
            <MenuItem key={index} value={field}>{field}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
