import { AppBar, Toolbar, Typography } from '@mui/material';
import { UserMenu } from '../../UserArea/UserMenu/UserMenu';
import './Header.css';

function Header(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <UserMenu />
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          A Vacation For You
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
