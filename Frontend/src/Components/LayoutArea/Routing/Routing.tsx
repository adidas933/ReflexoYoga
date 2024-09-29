import { Navigate, Route, Routes } from 'react-router-dom';
import Page404 from '../page404/page404';
import './Routing.css';
import List from '../../VacationsArea/List/List';
import { Register } from '../../UserArea/Register/Register';
import { Login } from '../../UserArea/Login/Login';
import { AddVacation } from '../../VacationsArea/Add/AddVacation';
import { Box } from '@mui/material';
import AdminReport from '../../VacationsArea/Report/AdminReport';

function Routing(): JSX.Element {
  return (
    <Box className="Routing" sx={{ padding: 2, minHeight: '80vh' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/home" element={<Navigate to="/list" />} />
        <Route path="/list" element={<List />} />
        <Route path="/new" element={<AddVacation />} />
        <Route path="/report" element={<AdminReport />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Box>
  );
}

export default Routing;
