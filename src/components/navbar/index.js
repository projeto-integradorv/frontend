import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Navbar() {
    return (
        <Container maxWidth={false} disableGutters={true} >
            <Box sx={{
                bgcolor: '#FF9800', height: '45vh', width: '100%', display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', alignItems: 'center'
            }} >
                <h1 style={{
                    color: 'white', height: '10vh'
                    , display: 'flex', flexDirection: 'column',
                    width: "70%", height: "22vh"
                    , alignItems: 'self-start', justifyContent: 'flex-start'
                    , fontSize: '45px'
                }}><span style={{fontSize:'35px'}}>Olá</span>Seja Bem-vindo ao Litmach</h1>
            </Box>
        </Container>
    );
}
