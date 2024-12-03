import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserMenu } from '../../UserArea/UserMenu/UserMenu';
import React, { useState } from 'react';

function NavMenu(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElPractice, setAnchorElPractice] = useState<null | HTMLElement>(
    null
  );
  const [anchorElBasics, setAnchorElBasics] = useState<null | HTMLElement>(
    null
  );

  const mainMenu = [
    { label: 'בית', to: '/home' },
    { label: 'הזמן עכשיו!', to: '/bookme' },
    { label: 'עלינו', to: '/about' },
    { label: 'רפלקסולוגיה', to: '/reflexology' },
    { label: 'ריטריטים', to: '/retreats' },
    { label: 'צור קשר', to: '/contact' },
  ];

  const practiceMenu = [
    { label: 'יוגה', to: '/yoga' },
    { label: 'אמבטיית קרח', to: '/icebath' },
    { label: 'עמידה על מסמרים', to: '/nails' },
    { label: 'מדיטציה', to: '/meditation' },
  ];

  const basicsMenu = [
    { label: 'מדריכים', to: '/tutorials' },
    { label: 'למתחילים', to: '/beginners' },
    { label: 'נשימה', to: '/breathing' },
  ];

  const handlePracticeMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPractice(event.currentTarget);
  };

  const handleBasicsMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBasics(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElPractice(null);
    setAnchorElBasics(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: 'SteelBlue', width: '100%', height: '100%' , zIndex: (theme) => theme.zIndex.drawer + 1,
        top: 0,
      }}
    >
      <Toolbar>
        <Button
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
          }}
        >
          {/* foot icon: */}
          <Box
            component="img"
            src="/images/foot-logo.jpg" // Replace with your image path
            alt="Icon"
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
          {/* yoga icon: */}
          <Box
            component="img"
            src="/images/yoga-logo.jpg" // Replace with your image path
            alt="Icon"
            sx={{
              width: 40, // Set width to icon size
              height: 40, // Set height to icon size
              borderRadius: '50%', // Optional: Makes it circular
              objectFit: 'cover', // Ensures the image scales well
            }}
          />
        </Button>

        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}>
          {mainMenu.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.to}
              sx={{
                color: 'white',
                backgroundColor: '#365a7e',
                '&:hover': { backgroundColor: '#1565C0' },
                borderRadius: '20px',
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            onClick={handlePracticeMenuClick}
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            תרגול
          </Button>
          <Menu
            anchorEl={anchorElPractice}
            open={Boolean(anchorElPractice)}
            onClose={handleCloseMenu}
          >
            {practiceMenu.map((item) => (
              <MenuItem
                key={item.label}
                component={NavLink}
                to={item.to}
                onClick={handleCloseMenu}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
          <Button
            onClick={handleBasicsMenuClick}
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            יסודות
          </Button>
          <Menu
            anchorEl={anchorElBasics}
            open={Boolean(anchorElBasics)}
            onClose={handleCloseMenu}
          >
            {basicsMenu.map((item) => (
              <MenuItem
                key={item.label}
                component={NavLink}
                to={item.to}
                onClick={handleCloseMenu}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{
            display: { xs: 'block', lg: 'none' },
            padding: '0px 6px',
            border: '1px solid white',
            borderRadius: '10%',
            zIndex: 1,
          
          }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List sx={{ width: 250 }}>
            {mainMenu.map((item) => (
              <ListItem
                key={item.label}
                component={NavLink}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  '&:hover': { backgroundColor: '#BBDEFB' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            {/* Practice Menu in Drawer */}
            <ListItem button onClick={handlePracticeMenuClick}>
              <ListItemText primary="תרגול" />
            </ListItem>
            <Menu
              anchorEl={anchorElPractice}
              open={Boolean(anchorElPractice)}
              onClose={handleCloseMenu}
            >
              {practiceMenu.map((item) => (
                <MenuItem
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
            {/* Basics Menu in Drawer */}
            <ListItem button onClick={handleBasicsMenuClick}>
              <ListItemText primary="יסודות" />
            </ListItem>
            <Menu
              anchorEl={anchorElBasics}
              open={Boolean(anchorElBasics)}
              onClose={handleCloseMenu}
            >
              {basicsMenu.map((item) => (
                <MenuItem
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </List>
        </Drawer>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default NavMenu;
