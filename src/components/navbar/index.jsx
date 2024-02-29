import React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Rectangle from '../../assets/Catalog.svg';
import shopping from '../../assets/shopping-bag.png';
import Voltar from '../../assets/voltar.png';


export default function Navbar() {
    return (
        <Container maxWidth='xl' disableGutters={true} sx={{backgroundColor:'#FF9800'}} >
            <Container sx={{ display: 'flex' }} disableGutters={true} >
                <Box
                    width={'50%'}
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-start'>
                    <Button sx={{ color: 'white', display: 'flex', gap: '5px' }} >
                        <Image src={Voltar}
                            width={8}
                        />
                        Voltar
                    </Button>
                </Box>
                <Box
                    width={'50%'}
                    display='flex'
                    alignItems='flex-end'
                    justifyContent='flex-end'
                    gap={4}>

                    <Button sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                        <Image src={Rectangle}
                            width={15}
                        /> Cardápio
                    </Button>
                    <Button sx={{ color: 'white', display: 'flex', gap: '5px' }}>
                        <Image src={shopping}
                            width={13}
                        />  Pedidos
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}
