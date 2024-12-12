import { Navigate, Route, Routes } from 'react-router-dom';
import Page404 from '../page404/page404';
import { Register } from '../../UserArea/Register/Register';
import { Login } from '../../UserArea/Login/Login';
import { Box } from '@mui/material';
import { Home } from '../../PagesArea/Home/Home';
import { Yoga } from '../../PagesArea/Yoga/Yoga';
import { About } from '../../PagesArea/About/About';
import { Retreats } from '../../PagesArea/Retreats/Retreats';
import { Reflexology } from '../../PagesArea/Reflexology/Reflexology';
import { IceBath } from '../../PagesArea/IceBath/IceBath';
import { Nails } from '../../PagesArea/Nails/Nails';
import { Meditation } from '../../PagesArea/Meditation/Meditation';
import { Contact } from '../../PagesArea/Contact/Contact';
import BookingPage from '../../BookingPage/BookingPage';
import { Breathing } from '../../PagesArea/Breathing/Breathing';
import { Beginners } from '../../PagesArea/Beginners/Beginners';
import { Tutorials } from '../../PagesArea/Tutorials/Tutorials';
import ThankYouPage from '../../BookingPage/ThankYouPage';

function Routing(): JSX.Element {
  return (
    <Box className="Routing" sx={{ padding: 2, minHeight: '80vh' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/retreats" element={<Retreats />} />
        <Route path="/reflexology" element={<Reflexology />} />
        <Route path="/icebath" element={<IceBath />} />
        <Route path="/nails" element={<Nails />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/beginners" element={<Beginners />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookme" element={<BookingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Box>
  );
}

export default Routing;
