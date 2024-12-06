import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { notify } from '../../../Utils/Notify';
import { Button, Stack } from '@mui/material';
import { UserModel } from '../../../Models/UserModel';
import { AppState } from '../../../Redux/store';
import { userService } from '../../../Services/UserService';

export function UserMenu(): JSX.Element {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  function logout() {
    userService.logout();
    notify.success('להתראות');
  }

  return (
    <div className="UserMenu" style={{marginLeft: 20}}>
      {!user ? (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <NavLink to="/register">
            <Button variant="contained" color="primary">
              הרשמה
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button variant="contained" color="primary">
              התחברות
            </Button>
          </NavLink>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <NavLink to="/login" onClick={logout}>
            <Button variant="contained" color="secondary">
              התנתקות
            </Button>
          </NavLink>
        </Stack>
      )}
    </div>
  );
}
