'use client';
import { Container, Typography, Button, Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import CardCategory from "../cardCategory";
import ImageMassa from '../../assets/Vector.png';
import Imagelanches from '../../assets/lanches.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom styles for arrows
const customArrowStyle = {
    color: '#2f3837',
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1,
};

// Arrow components
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ ...style, ...customArrowStyle, left: '10px' }}>
            &#10094;
        </div>
    )
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={className} style={{...style,  ...customArrowStyle, right: '10px' }}>
            &#10095;
        </div>
    )
};

export default function CategoriaCarrossel() {
    const categories = [
        { title: 'Massas', items: [ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa, ImageMassa] },
        { title: 'Lanches', items: [Imagelanches, Imagelanches, Imagelanches, Imagelanches, Imagelanches] },
    ];

    const MyCarouselItem = ({ icon }) => (
        <CardCategory icon={icon} sx={{ margin: '0 auto', height: "100%", display: 'flex', justifyContent: 'center' }} />
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const flattenIcons = categories.reduce((acc, category) => [...acc, ...category.items], []);
    const hasIcons = flattenIcons.length > 0;

    return (
        <Container maxWidth='lg' disableGutters={true}  sx={{ padding: "0", backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h5" sx={{ color: '#8A8080' }}>Categorias</Typography>
                <Button href="/categoria" sx={{ color: '#8A8080', borderColor: '#8A8080' }}>
                    Ver mais +
                </Button>
            </Box>
            {hasIcons ? (
                <Slider {...settings} style={{ width: '100%', height: 'auto', gap: 1 }}>
                    {categories.flatMap((category, index) =>
                        category.items.map((icon, innerIndex) => (
                            <div key={`${index}-${innerIndex}`} style={{ padding: '0 10px' }}>
                                <MyCarouselItem icon={icon} />
                            </div>
                        ))
                    )}
                </Slider>
            ) : (
                <Typography variant="body1" sx={{ margin: 'auto', color: "gray", textAlign: 'center' }}>
                    Não há categorias disponíveis.
                </Typography>
            )}
        </Container>
    );
}
