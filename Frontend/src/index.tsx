import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { store } from './Redux/store';

const globalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root': {
        '.css-19xx1rt': {
          padding: 0,
        },
      },
    }}
  />
);

const theme = createTheme({
  direction:'rtl',
  typography: {
    h1: {
      fontFamily: "'Assistant', sans-serif",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'Assistant', sans-serif",
    },
  },
  // You can customize your theme here
  palette: {
    primary: {
      main: '#1976d2', // Customize the primary color
    },
    secondary: {
      main: '#dc004e', // Customize the secondary color
    },
    // Add other customizations as needed
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles} {/* Inject global styles */}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
