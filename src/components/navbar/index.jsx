'use client';
import React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Rectangle from '../../assets/Catalog.svg';
import shopping from '../../assets/shopping-bag.png';
import Voltar from '../../assets/voltar.png';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const handleVoltarClick = () => {
        window.history.back();
    };

    return (
        <Container disableGutters={true} maxWidth='' sx={{ backgroundColor: '#FF9800',width:'100%' }}>
            <Container maxWidth='' sx={{ display: 'flex', flexWrap:"wrap", width:'100%' }}  disableGutters={true}>
                <Box
                    width={'25%'}
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
                            <Image src={Voltar} width={8} />
                            Voltar
                        </Button>
                    )}
                </Box>
                <Box
                    width={'75%'}
                    display='flex'
                    alignItems='flex-end'
                    justifyContent='flex-end'
                    gap={2}
                >
                    <Button
                        sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                        <Image src={Rectangle} width={15} />
                        Cardápio
                    </Button>
                    <Button sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                        <Image src={shopping} width={13} />
                        Pedidos
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}
