import { Container, Box, CssBaseline, Fab } from '@mui/material';
import Copyrights from '../Copyrights/Copyrights';
import Routing from '../Routing/Routing';
import NavMenu from '../NavMenu/NavMenu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Layout(): JSX.Element {
  return (
    <Container component="main" maxWidth={false} disableGutters>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'space-between', // Ensures footer stays at the bottom
        }}
      >
        <Box
          component="nav"
          position="sticky"
          sx={{
            width: '100%',
            top: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1, // Stay above other elements like drawers
            // Ensure it sticks to the viewport
          }}
        >
          <NavMenu />
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routing />
        </Box>
        <Box component="footer">
          <Copyrights />
        </Box>
        {/* Floating WhatsApp link */}
        <Fab
          href="https://wa.me/1234567890" // Replace with your WhatsApp number
          target="_blank"
          color="success"
          aria-label="WhatsApp"
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 2, // Ensure it stays above other elements
            backgroundColor: '#25D366', // WhatsApp green color
            '&:hover': {
              backgroundColor: '#128C7E',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30, color: 'white' }} />
        </Fab>

       
      </Box>
    </Container>
  );
}

export default Layout;
