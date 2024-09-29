import { useSelector } from "react-redux";
import "./UserMenu.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { Button, Typography } from '@mui/material';

export function UserMenu(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);

    function logout() {
        userService.logout();
        notify.success("Bye bye");
    }

    return (
        <div className="UserMenu">
            {!user ? (
                <>
                    <Typography variant="body1">Hello Guest | </Typography>
                    <NavLink to="/register">
                        <Button variant="contained" color="primary">Register</Button>
                    </NavLink>
                    <span> | </span>
                    <NavLink to="/login">
                        <Button variant="contained" color="primary">Login</Button>
                    </NavLink>
                </>
            ) : (
                <>
                    <Typography variant="body1">Hello {user.firstName} {user.lastName} | </Typography>
                    <NavLink to="/login" onClick={logout}>
                        <Button variant="contained" color="secondary">Logout</Button>
                    </NavLink>
                </>
            )}
        </div>
    );
}
