// Header.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box
      component={NavLink}
      to="/home"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'white',
        textTransform: 'none',
        '&:hover': { backgroundColor: 'transparent' },
        marginRight: 'auto',
        textDecoration: 'none', // Ensure there is no underline on the link

      }}
    >
      {/* foot logo: */}
      <Box
        component="img"
        src="/images/foot-logo.jpg" // Replace with your image path
        alt="Foot Logo"
        sx={{
          width: 40, // Set width to icon size
          height: 40, // Set height to icon size
          borderRadius: '50%', // Optional: Makes it circular
          objectFit: 'cover', // Ensures the image scales well
        }}
      />
      <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
        ReflexoYoga
      </Typography>
      {/* yoga logo: */}
      <Box
        component="img"
        src="/images/yoga-logo.jpg" // Replace with your image path
        alt="Yoga Logo"
        sx={{
          width: 40, // Set width to icon size
          height: 40, // Set height to icon size
          borderRadius: '50%', // Optional: Makes it circular
          objectFit: 'cover', // Ensures the image scales well
        }}
      />
    </Box>
  );
};

export default Header;
