import BookingStatus from "@/components/MockInterviewBooking";
import { Box, Typography, Grid, Card, CardContent, Avatar, Rating, List, ListItem, ListItemText, Button } from "@mui/material";
import Image from "next/image";

export default function TeacherHome() {
  
  return (
   
      <Grid container spacing={2}  >
        {/* Left Section - Booking Status & Profile */}
        <Grid item xs={12} sm={9} md={8} lg={8}>
       
          {/* Profile Card */}
          <Card sx={{ p: 3, display: "flex", alignItems: "center", flexDirection: "column", boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <Avatar src="/assets/images/profile.png" sx={{ width: 80, height: 80, mb: 2 }} />
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              Senior Software Engineer
            </Typography>
            <Rating value={4.5} readOnly sx={{ mt: 1 }} />
          </Card>
        </Grid>

        {/* Right Section - Mentor Names */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <Typography variant="h5" fontWeight="bold">
              Mentors Available
            </Typography>
            <List sx={{ mt: 2 }}>
              <ListItem>
                <ListItemText primary="Alice Johnson" secondary="Google" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Michael Smith" secondary="Amazon" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sarah Brown" secondary="Microsoft" />
              </ListItem>
              <ListItem>
                <ListItemText primary="David Lee" secondary="Meta" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
  

  );
}
