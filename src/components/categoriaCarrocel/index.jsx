'use client';
import { Container, Typography, Button, Box } from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import ImageMassa from '../../assets/Vector.png';
import { useDispatch, useSelector } from 'react-redux';
import { carregarCategorias } from '@/lib/features/categoria/categoriaSlice';
import CardCategory from "../cardCategory";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ ...style, ...customArrowStyle, left: '10px' }}>
            &#10094;
        </div>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={className} style={{...style,  ...customArrowStyle, right: '10px' }}>
            &#10095;
        </div>
    );
};

export default function CategoriaCarrossel() {
    const dispatch = useDispatch();
    const categorias = useSelector((state) => state.categorias?.categorias || []); // Acessando corretamente o array `categorias`

    useEffect(() => {
        dispatch(carregarCategorias());
    }, [dispatch]);

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

    return (
        <Container maxWidth='lg' disableGutters={true} sx={{ padding: "0", backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h5" sx={{ color: '#8A8080' }}>Categorias</Typography>
                <Button href="/categorias" sx={{ color: '#8A8080', borderColor: '#8A8080' }}>
                    Ver mais +
                </Button>
            </Box>
            {categorias && categorias.length > 0 ? (
                <Slider {...settings} style={{ width: '100%', height: 'auto', gap: 1 }}>
                    {categorias.map((categoria, index) => (
                        <div key={index} style={{ padding: '0 10px' }}>
                            <CardCategory icon={categoria.image || ImageMassa}
                              id={categoria.id}
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <Typography variant="body1" sx={{ margin: 'auto', color: "gray", textAlign: 'center' }}>
                    Não há categorias disponíveis.
                </Typography>
            )}
        </Container>
    );
}
