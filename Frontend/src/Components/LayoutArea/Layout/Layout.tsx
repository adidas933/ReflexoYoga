import { Container, Box, CssBaseline } from '@mui/material';
import Copyrights from "../Copyrights/Copyrights";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header>
                    <Header />
                </header>
                <nav>
                    <Menu />
                </nav>
                <main style={{ flex: 1 }}>
                    <Routing />
                </main>
                <footer>
                    <Copyrights />
                </footer>
            </Box>
        </Container>
    );
}

export default Layout;
