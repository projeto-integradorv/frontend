
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
        <CardCategory icon={icon} sx={{ margin: 0, }} /> // Adicione margin: 0 para remover espaçamento
    );

    const itemsToShow = 6; // Número de itens a serem exibidos antes de rolar para o lado

    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'gray' }}>Categorias</Typography>
                <Button href="/categoria" sx={{ marginBottom: '1rem', color: 'gray' }}>Ver mais +</Button>
            </Box>
            <Carousel
                autoPlay={false}
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{ style: { backgroundColor: 'transparent', color: 'black' } }}
                swipe={false}
                timeout={10}
                sx={{ margin: 0, padding: "1%", overflow: 'hidden', width: "100%", height: "100%", display: 'flex', justifyContent: 'center' }} // Set margin to 0 to remove any spacing and overflow to hidden
            >
                {categories.map((category, index) => (
                    <Grid key={index} container spacing={0.2} sx={{ flexWrap: 'nowrap', overflow: 'hidden', margin: 0, padding: 0, width: "100%", height: '100%' }}>
                        {category.items.map((icon, innerIndex) => (
                            <Grid key={innerIndex} item xs={12} sm={12} md={3} lg={5} sx={{ padding: 0, margin: 0 }}>
                                <MyCarouselItem icon={icon} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Container>
    );
}



