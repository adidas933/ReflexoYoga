import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItem,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

interface PracticeMenuProps {
  menuItems: { label: string; to: string }[];
  variant?: 'toolbar' | 'drawer';
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({
  menuItems,
  variant = 'toolbar',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (variant === 'toolbar') {
    return (
      <>
        <Button
          onClick={handleOpenMenu}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: '#1565C0' },
          }}
        >
          תרגול
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              component={NavLink}
              to={item.to}
              onClick={handleCloseMenu}
              sx={{
                '&:hover': { backgroundColor: '#BBDEFB' },
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  // Drawer version
  return (
    <>
      <ListItem
        button
        onClick={handleOpenMenu}
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: '#BBDEFB',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.2rem',
             color: '#000',
          }}
        >
          תרגול
        </Typography>
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            component={NavLink}
            to={item.to}
            onClick={handleCloseMenu}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              '&:hover': { backgroundColor: '#BBDEFB' },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PracticeMenu;
