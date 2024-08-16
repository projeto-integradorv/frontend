import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import CardCategory from "../cardCategory";
import ImageMassa from '@/assets/Vector.png';
import Imagelanches from '@/assets/lanches.png';
import ModalCategoria from '../modalCategory';
import { useDispatch, useSelector } from 'react-redux';
import { carregarCategorias } from '@/lib/features/categoria/categoriaSlice';

export default function Categorias() {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const state = useSelector((state) => {
        return state.categorias || { categorias: [], loading: false, error: null };
    });

    const categorias = state.categorias || [];
    const loading = state.loading || false;
    const error = state.error || null;

    console.log('Categorias:', categorias);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        dispatch(carregarCategorias());
    }, [dispatch]);

    const handleCategoryClick = (event, category) => {
        const { top, left } = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top, left });
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <Container 
            maxWidth='lg' 
            sx={{ 
                backgroundColor: 'transparent', 
                height: '100%', 
                minHeight: '100vh',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 
                alignItems:'center' 
            }} 
            disableGutters={true} 
        >
            {pathname === '/admin' && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    marginBottom: '1rem', 
                    width: '100%' 
                }}>
                    <Typography variant="h5" sx={{marginLeft:'24px', color: '#8A8080' }}>Categorias</Typography>
                    <Button 
                        sx={{ 
                            color: '#8A8080', 
                            borderWidth: '2px', 
                            backgroundColor: 'transparent', 
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            } 
                        }}
                        onClick={() => handleCategoryClick(null, null)} // Passa null para adicionar uma nova categoria
                    >
                        Adicionar Mais +
                    </Button>
                </Box>
            )}
            
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Grid 
                container 
                spacing={3} 
                sx={{ 
                    width:"100%", 
                    marginBottom: '1%', 
                    display:"flex", 
                    justifyContent:'center' 
                }}
            >
                {categorias.map((category) => (
                    <Grid item key={category.id} xs={6} sm={6} md={3}>
                        <CardCategory 
                            icon={category.image === null ? ImageMassa : Imagelanches} 
                            nameCategory={category.name} 
                            onClick={(event) => handleCategoryClick(event, category)} // Passa a categoria clicada
                        />
                    </Grid>
                ))}
            </Grid>

            {isModalOpen && (
                <ModalCategoria
                     Id = {selectedCategory.id}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    categoria={selectedCategory}
                    handleSave={(categoriaAtualizada) => {
                        console.log('Categoria atualizada:', categoriaAtualizada);
                        handleCloseModal();
                    }}
                    position={modalPosition} 
                />
            )}
        </Container>
    );
}
