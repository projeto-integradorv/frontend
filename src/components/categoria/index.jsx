'use client';

import ImageMassa from '@/assets/Vector.png';
import { apagarCategoria, atualizarCategoria, carregarCategorias, inserirCategoria } from '@/lib/features/categoria/categoriaSlice';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardCategory from '../cardCategory';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import ModalCategoria from '../modalCategory';
import './Swall.css';

export default function Categorias() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const state = useSelector((state) => {
        return state.categorias || { categorias: [], loading: false, error: null };
    });

    const categorias = state.categorias || [];
    const loading = state.loading || false;
    const error = state.error || null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', image: '', description: '' });

    useEffect(() => {
        dispatch(carregarCategorias());
    }, [dispatch]);

    useEffect(() => {
        if (pathname !== '/admin' && selectedCategory) {
            dispatch(carregarProdutosPorCategoria(selectedCategory.id))
                .then((products) => setSelectedCategoryProducts(products))
                .catch((error) => console.error('Erro ao carregar produtos:', error));
        }
    }, [pathname, selectedCategory, dispatch]);

    const handleCategoryClick = (event, category) => {
        if (pathname === '/admin') {
            const { top, left } = event.currentTarget.getBoundingClientRect();
            setModalPosition({ top, left });
            setSelectedCategory(category);
            setNewCategory({ name: category.name, image: category.image }); 
            setShowCategoryForm(true);
            setIsModalOpen(true);
        } else {
            setSelectedCategory(category);
            router.push(`/produtos/${category.id}`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
        setShowCategoryForm(false);
    };

    const handleDeleteCategory = async (categoryId) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff9800',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel'
            }
        });

        if (result.isConfirmed) {
            dispatch(apagarCategoria(categoryId));
            Swal.fire(
                'Excluído!',
                'A categoria foi excluída.',
                'success',
                {
                    customClass: {
                        popup: 'swal2-popup',
                        title: 'swal2-title',
                        confirmButton: 'swal2-confirm'
                    }
                }
            );
        }
    };

    const handleAddCategoryClick = () => {
        setSelectedCategory(null);
        setNewCategory({ name: '', image: '' });
        setShowCategoryForm(true);
        setIsModalOpen(true);
    };

    const handleAddCategorySubmit = async () => {
        if (newCategory.name && newCategory.image) {
            if (selectedCategory) {
                dispatch(atualizarCategoria({ id: selectedCategory.id, ...newCategory }));
            } else {
                dispatch(inserirCategoria(newCategory));
            }
            setNewCategory({ name: '', image: '', description: '' });
            setShowCategoryForm(false);
            dispatch(carregarCategorias());
        } else {
            Swal.fire(
                'Erro!',
                'Por favor, preencha todos os campos.',
                'error'
            );
        }
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }));
    };

    const showDeleteIcon = pathname === '/admin';

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
                alignItems: 'center'
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
                    <Typography variant="h5" sx={{ marginLeft: '24px', color: '#8A8080' }}>Categorias</Typography>
                    <Button
                        sx={{
                            color: '#8A8080',
                            borderWidth: '2px',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            }
                        }}
                        onClick={handleAddCategoryClick}
                    >
                        Adicionar Mais +
                    </Button>
                </Box>
            )}

            {isModalOpen && (
                <ModalCategoria
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    categoria={selectedCategory}
                    position={modalPosition}
                >
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '400px',
                            padding: '1rem'
                        }}
                    >
                        <Typography variant="h6">{selectedCategory ? 'Editar Categoria' : 'Adicionar Nova Categoria'}</Typography>
                        <input
                            type="text"
                            name="name"
                            value={newCategory.name}
                            onChange={handleInputChange}
                            placeholder="Nome da Categoria"
                            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
                        />
                        <input
                            type="text"
                            name="image"
                            value={newCategory.image}
                            onChange={handleInputChange}
                            placeholder="URL da Imagem"
                            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
                        />
                        <Button
                            sx={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#45a049',
                                }
                            }}
                            onClick={handleAddCategorySubmit}
                        >
                            {selectedCategory ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#e53935',
                                },
                                marginTop: '1rem'
                            }}
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </ModalCategoria>
            )}

            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Grid
                container
                spacing={3}
                sx={{
                    width: "100%",
                    marginBottom: '1%',
                    display: "flex",
                    justifyContent: 'center'
                }}
            >
                {categorias.map((category) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={category.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        <CardCategory
                            category={category}
                            icon={category.image === null || categorias.image === '' ? ImageMassa : category.image}
                            onClick={(event) => handleCategoryClick(event, category)}
                            showDeleteIcon={showDeleteIcon}
                            onDelete={() => handleDeleteCategory(category.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
