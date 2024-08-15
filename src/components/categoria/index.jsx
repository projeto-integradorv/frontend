'use client';
import { Container, Grid, Button, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CardCategory from "../cardCategory";
import { getCategories } from '@/api/category'; 
import ImageMassa from '@/assets/Vector.png';
import Imagelanches from '@/assets/lanches.png';

export default function Categorias() {
    const [categories, setCategories] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data); 
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategories();
    }, []);

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
            disableGutters
        >
            {pathname === '/admin' && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    marginBottom: '1rem', 
                    width: '100%' 
                }}>
                    <Typography variant="h5" sx={{ color: '#8A8080' }}>Categorias</Typography>
                    <Button 
                        sx={{ 
                            color: '#8A8080', 
                            borderWidth: '2px', 
                          
                            backgroundColor: 'transparent', 
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            } 
                        }}
                    >
                        Adicionar Mais
                    </Button>
                </Box>
            )}
            
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
                {categories.map((category, index) => (
                    <Grid item key={index} xs={6} sm={6} md={3}>
                        <CardCategory 
                            icon={category.image === null ? ImageMassa : Imagelanches} 
                            nameCategory={category.name} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
