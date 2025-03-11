import { Box, Typography, Rating } from "@mui/material";

export default function SelfRating({ ratings, setRatings }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>Rate Yourself</Typography>
      {Object.keys(ratings).map((category) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography>{category.replace(/([A-Z])/g, " $1")}</Typography>
          <Rating value={ratings[category]} onChange={(e, newValue) => setRatings({ ...ratings, [category]: newValue })} />
        </Box>
      ))}
    </Box>
  );
}
