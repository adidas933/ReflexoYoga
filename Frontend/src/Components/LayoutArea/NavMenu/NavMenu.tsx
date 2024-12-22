import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserMenu } from '../../UserArea/UserMenu/UserMenu';
import { useState } from 'react';
import Header from '../Header/Header';
import BasicsMenu from './BasicsMenu';
import PracticeMenu from './PracticeMenu';
import DrawerMenu from './DrawerMenu';

function NavMenu(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainMenu = [
    { label: 'בית', to: '/home' },
    { label: 'הזמן עכשיו!', to: '/bookme' },
    { label: 'עלינו', to: '/about' },
    { label: 'רפלקסולוגיה', to: '/reflexology' },
    { label: 'ריטריטים', to: '/retreats' },
    { label: 'צור קשר', to: '/contact' },
    { label: 'איזור אישי', to: '/user-page' },
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


  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'SteelBlue',
        width: '100%',
        height: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: 0,
      }}
    >
      <Toolbar>
       <Header/>
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
          <PracticeMenu menuItems={practiceMenu} />
          <BasicsMenu menuItems={basicsMenu} />
        </Box>
        {/* Hamburger icon when on small screen */}
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
          sx={{
            '& .MuiDrawer-paper': { direction: 'rtl' },
          }}
        >
          <DrawerMenu items={mainMenu} onClose={() => setDrawerOpen(false)} />
          <List sx={{ width: 250, direction: 'rtl' }}>
            <PracticeMenu menuItems={practiceMenu} variant='drawer'/>
            <BasicsMenu menuItems={basicsMenu} variant='drawer'/>
        
          </List>
        </Drawer>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default NavMenu;
