// components/Sidebar.js
import { Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function Sidebar() {
  const navItems = [
    { icon: <HomeIcon />, label: 'Home', active: true },
    { icon: <CardGiftcardIcon/>, label: 'Bookings' },
    { icon: <PeopleIcon />, label: 'Find People' },
    { icon: <PersonIcon />, label: 'Profile' },
  ];

  return (
    <Box
      width="280px"
      bgcolor="#ffffff"
      p={3}
      borderRight="1px solid #e0e0e0"
      height="100vh"
      position="fixed"
      boxShadow="0 2px 10px rgba(0,0,0,0.03)"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h6" fontWeight={600} color="#0A6E6E">
          Topplaced
        </Typography>
        <IconButton size="small" sx={{ color: '#0A6E6E' }}>
          <MenuIcon />
        </IconButton>
      </Box>
      
   

      {/* Navigation */}
      {navItems.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          p={1.5}
          mb={1}
          bgcolor={item.active ? '#0A6E6E' : 'transparent'}
          borderRadius={2}
          sx={{
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f5f7fa' },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {typeof item.icon === 'string' ? (
            <img src={item.icon} alt={item.label} width={20} style={{ marginRight: 12 }} />
          ) : (
            <Box sx={{ mr: 1.5, color: item.active ? 'white' : '#666' }}>{item.icon}</Box>
          )}
          <Typography
            variant="body1"
            fontWeight={item.active ? 600 : 500}
            color={item.active ? 'white' : '#444'}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}