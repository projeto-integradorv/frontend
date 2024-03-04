import PropTypes from 'prop-types';

import Box from '@mui/material/Box';


import Navbar from '@/components/navbar';
import Header from '@/components/header';
import BellWaiter from '@/components/bellWaiter';
// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
    const homePage = false;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

            <Navbar />
            <Header />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ...(!homePage && {
                        pt: { xs: 8, md: 10 },
                    }),
                }}
            >
                {children}
            </Box>
            <BellWaiter />
        </Box>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node,
};
