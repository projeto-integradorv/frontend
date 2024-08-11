'use client';
import React, { useState } from 'react';
import { Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Rectangle from '../../assets/Catalog.svg';
import shopping from '../../assets/shopping-bag.png';
import Voltar from '../../assets/voltar.png';
import ImgLogin from '../../assets/login.png';
import ImgCadastro from '../../assets/cadastro.png';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handlePedidosClick = () => {
        router.push('/pedidos');
        setDrawerOpen(false);
    };

    const handlecardapioClick = () => {
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

    return (
        <Container disableGutters={true} maxWidth='' sx={{ backgroundColor: '#FF9800', width: '100%' }}>
            <Container maxWidth='lg' sx={{ display: 'flex', flexWrap: "wrap", width: '100%' }} disableGutters={true}>
                <Box
                    width={'20%'}
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-start'
                >
                    {pathname === '/' ? (
                        ''
                    ) : (
                        <Button
                            sx={{ color: 'white', display: 'flex', gap: '5px' }}
                            onClick={handleVoltarClick}
                        >
                            <Image src={Voltar} width={8} alt='voltar' />
                            Voltar
                        </Button>
                    )}
                </Box>
                <Box
                    width={'80%'}
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                >
                    <IconButton
                        sx={{ color: 'white', display: { xs: 'block', md: 'none' } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                        <Button sx={{ color: 'white', display: 'flex', gap: '5px' }} onClick={handlecardapioClick}>
                            <Image src={Rectangle} width={15} alt='cardapio' />
                            Cardápio
                        </Button>
                        <Button onClick={handlePedidosClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                            <Image src={shopping} width={13} alt='pedido' />
                            Pedidos
                        </Button>
                        <Button onClick={handleLoginClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                            <Image src={ImgLogin} width={13} alt='pedido' />
                            Login
                        </Button>
                        <Button onClick={handleCadastroClick} sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                            <Image src={ImgCadastro} width={13} alt='pedido' />
                            Cadastro
                        </Button>
                    </Box>

                    <Drawer PaperProps={{
                        sx: {
                            backgroundColor: '#FF9800', 
                            color: 'white', 
                            width: 200, 
                        }
                    }} anchor = 'right' open={drawerOpen} onClose={handleDrawerToggle}>
                        <List sx={{ backgroundColor: '#FF9800', color: 'white' }}>
                            <ListItem sx={{ gap: '5px'}} ListItemButton onClick={handlecardapioClick}>
                                <Image src={Rectangle} width={15} alt='cardapio' />
                                <ListItemText primary='Cardápio' />
                            </ListItem>
                            <ListItem sx={{ gap: '5px' }} ListItemButton onClick={handlePedidosClick}>
                                <Image src={shopping} width={13} alt='pedido' />
                                <ListItemText primary='Pedidos' />
                            </ListItem>
                            <ListItem sx={{ gap: '5px' }} ListItemButton onClick={handleLoginClick}>
                                <Image src={ImgLogin} width={13} alt='pedido' />
                                <ListItemText primary='Login' />
                            </ListItem>
                            <ListItem ListItemButton sx={{ gap: '5px' }} onClick={handleCadastroClick}>
                                <Image src={ImgCadastro} width={13} alt='pedido' />
                                <ListItemText primary='Cadastro' />
                            </ListItem>
                        </List>
                    </Drawer>
                </Box>
            </Container>
        </Container>
    );
}
