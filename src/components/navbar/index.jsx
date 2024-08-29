'use client';

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Rectangle from '../../assets/Catalog.svg';
import shopping from '../../assets/shopping-bag.png';
import Voltar from '../../assets/voltar.png';
import ImgLogin from '../../assets/login.png';
import ImgCadastro from '../../assets/cadastro.png';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { usePathname, useRouter } from 'next/navigation';
import { ExitToAppOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../lib/features/login/loginSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userType, setUserType] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserType(parsedUserData.user_type);
        }
    }, []);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handlePedidosClick = () => {
        router.push('/pedidos');
        setDrawerOpen(false);
    };

    const handleCardapioClick = () => {
        router.push('/cardapio');
        setDrawerOpen(false);
    };

    const handleVoltarClick = () => {
        window.history.back();
    };

    const handleLoginClick = () => {
        router.push('/login');
        setDrawerOpen(false);
    };

    const handleCadastroClick = () => {
        router.push('/cadastro');
        setDrawerOpen(false);
    };

    const handleAdminClick = () => {
        router.push('/admin');
        setDrawerOpen(false);
    };

    const handleLogoutClick = () => {
        dispatch(logoutUser());
        localStorage.removeItem('userData');
        setUserType('');
        router.push('/login');
    }

    return (
        <Container disableGutters={true} maxWidth='' sx={{ backgroundColor: '#FF9800', width: '100%' }}>
            <Container maxWidth='lg' sx={{ display: 'flex', flexWrap: "wrap", width: '100%' }} disableGutters={true}>
                <Box width={'20%'} display='flex' alignItems='center' justifyContent='flex-start'>
                    {pathname !== '/' && (
                        <Button sx={{ color: 'white', display: 'flex', gap: '5px' }} onClick={handleVoltarClick}>
                            <Image src={Voltar} width={8} alt='voltar' />
                            Voltar
                        </Button>
                    )}
                </Box>
                <Box width={'80%'} display='flex' alignItems='center' justifyContent='flex-end'>
                    <IconButton sx={{ color: 'white', display: { xs: 'block', md: 'none' } }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                        <Button sx={{ color: 'white', display: 'flex', gap: '5px' }} onClick={handleCardapioClick}>
                            <Image src={Rectangle} width={15} alt='cardapio' />
                            Cardápio
                        </Button>
                        <Button onClick={handlePedidosClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                            <Image src={shopping} width={13} alt='pedido' />
                            Pedidos
                        </Button>
                        {!userType ? (
                            <>
                                <Button onClick={handleLoginClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                                    <Image src={ImgLogin} width={13} alt='login' />
                                    Login
                                </Button>
                                <Button onClick={handleCadastroClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                                    <Image src={ImgCadastro} width={13} alt='cadastro' />
                                    Cadastro
                                </Button>
                            </>
                        ) : (
                            <>
                                {userType === 'Manager' && (
                                    <Button onClick={handleAdminClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                                        <AdminPanelSettingsIcon sx={{ width: 20 }} />
                                        Admin
                                    </Button>
                                )}
                                <Button onClick={handleLogoutClick} sx={{ color: 'white', display: 'flex', gap: '5px', cursor: 'pointer' }}>
                                    <ExitToAppOutlined sx={{ width: 20 }} />
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>

                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: '#FF9800',
                                color: 'white',
                                width: 200,
                            }
                        }}
                        anchor='right'
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                    >
                        <List sx={{ backgroundColor: '#FF9800', color: 'white' }}>
                            <ListItem sx={{ gap: '5px' }} ListItemButton onClick={handleCardapioClick}>
                                <Image src={Rectangle} width={15} alt='cardapio' />
                                <ListItemText primary='Cardápio' />
                            </ListItem>
                            <ListItem sx={{ gap: '5px' }} ListItemButton onClick={handlePedidosClick}>
                                <Image src={shopping} width={13} alt='pedido' />
                                <ListItemText primary='Pedidos' />
                            </ListItem>
                            {!userType ? (
                                <>
                                    <ListItem ListItemButton sx={{ gap: '5px' }} onClick={handleLoginClick}>
                                        <Image src={ImgLogin} width={13} alt='login' />
                                        <ListItemText primary='Login' />
                                    </ListItem>
                                    <ListItem ListItemButton sx={{ gap: '5px' }} onClick={handleCadastroClick}>
                                        <Image src={ImgCadastro} width={13} alt='cadastro' />
                                        <ListItemText primary='Cadastro' />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    {userType === 'Manager' && (
                                        <ListItem ListItemButton sx={{ gap: '5px' }} onClick={handleAdminClick}>
                                            <AdminPanelSettingsIcon sx={{ width: 20 }} />
                                            <ListItemText primary='Admin' />
                                        </ListItem>
                                    )}
                                    <ListItem ListItemButton sx={{ gap: '5px' }} onClick={handleLogoutClick}>
                                        <ExitToAppOutlined sx={{ width: 20 }} />
                                        <ListItemText primary='Logout' />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Drawer>
                </Box>
            </Container>
        </Container>
    );
}
