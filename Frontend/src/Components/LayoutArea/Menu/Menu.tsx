import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserModel } from '../../../Models/UserModel';
import { Role } from '../../../Models/enums';
import './Menu.css';

function Menu(): JSX.Element {
  // Access the user from the Redux state
  const user = useSelector((state: { user: UserModel | null }) => state.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Just For You
        </Typography>

        {/* Home Button (Visible to all users) */}
        <NavLink to="/home" style={{ textDecoration: 'none', color: 'white' }}>
          <Button color="inherit">Home</Button>
        </NavLink>

        {/* Conditionally render the "New" button only if the user is an admin */}
        {user && user.roleId === Role.Admin && (
          <Box>
            <NavLink
              to="/new"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color="inherit">New</Button>
            </NavLink>

            <NavLink
              to="/report"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color="inherit">Report</Button>
            </NavLink>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
