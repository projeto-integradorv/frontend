
'use client';
import { Container, Typography, Button, Box } from "@mui/material";
import React from "react";
import Carousel from 'react-material-ui-carousel';
import CardCategory from "../cardCategory";
import ImageMassa from '../../assets/Vector.png';
import Imagelanches from '../../assets/lanches.png';

export default function CategoriaCarrossel() {
    const categories = [
        { title: 'Massas', items: [ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa] },
        { title: 'Lanches', items: [Imagelanches, Imagelanches, Imagelanches, Imagelanches, Imagelanches, Imagelanches] },
        // Adicione mais categorias conforme necessário
    ];

    const MyCarouselItem = ({ icon }) => (
        <CardCategory icon={icon} />
    );

    const itemsToShow = 6; // Número de itens a serem exibidos antes de rolar para o lado

    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Categorias</Typography>
                <Button href="/categoria" sx={{ marginBottom: '1rem', color: 'gray' }}>Ver mais +</Button>
            </Box>
            <Carousel>
                {categories.map((category, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                        {category.items.map((icon, index) => (
                            <MyCarouselItem key={index} icon={icon} />
                        ))}
                    </div>
                ))}
            </Carousel>
        </Container>
    );
}
