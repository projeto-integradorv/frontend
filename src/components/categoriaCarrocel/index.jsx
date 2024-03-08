
'use client';
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import React from "react";
import Carousel from 'react-material-ui-carousel';
import CardCategory from "../cardCategory";
import ImageMassa from '../../assets/Vector.png';
import Imagelanches from '../../assets/lanches.png';

export default function CategoriaCarrossel() {
    const categories = [
        { title: 'Massas', items: [ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa] },
        { title: 'Lanches', items: [Imagelanches, Imagelanches, Imagelanches, Imagelanches, Imagelanches] },
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
            <Carousel 
                autoPlay={false} 
                animation="slide" 
                indicators={false} 
                navButtonsAlwaysVisible={true} 
                cycleNavigation={true} 
                navButtonsProps={{ style: { backgroundColor: 'transparent', color: 'black' } }} 
                swipe={true} 
                timeout={400}
                sx={{ margin: 0, overflow: 'hidden' }} // Set margin to 0 to remove any spacing and overflow to hidden
            >
                {categories.map((category, index) => (
                    <Grid key={index} container spacing={2} sx={{ flexWrap: 'nowrap', overflow: 'hidden', margin: 0, padding: 0, width: "100%", height: '100%' }}>
                        {category.items.map((icon, innerIndex) => (
                            <Grid key={innerIndex} item xs={12} sm={6} md={4} lg={3} sx={{ padding: 0, margin: 0 }}>
                                <MyCarouselItem icon={icon} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Container>
    );
}
