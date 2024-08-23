'use client';
import { Container, Grid, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { carregarAdicionais, atualizarAdicional, createAdicional } from '@/lib/features/adicionais/adicionaisSlice';

export default function Adicionais() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.adicionais.adicionais);

    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ id: '', name: '', price: '' });
    const [newItem, setNewItem] = useState({ name: '', price: '' });

    useEffect(() => {
        dispatch(carregarAdicionais());
    }, [dispatch]);

    const handleClickOpenEdit = (row) => {
        setSelectedItem(row);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSaveEdit = () => {
        const id = selectedItem.id;
        dispatch(atualizarAdicional({ id, data: selectedItem }));
        setOpenEdit(false);
    };

    const handleChangeEdit = (e) => {
        setSelectedItem({
            ...selectedItem,
            [e.target.name]: e.target.value
        });
    };

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleSaveAdd = () => {
        dispatch(createAdicional(newItem));
        setOpenAdd(false);
        setNewItem({ name: '', price: '' }); // Reseta o formulário após adicionar
    };

    const handleChangeAdd = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
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
                    <Typography variant="h5" sx={{ color: '#8A8080' }}>Adicionais</Typography>
                    <Button
                        onClick={handleClickOpenAdd}
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
                sx={{
                    width: "100%",
                }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '16px', width: '50%' }}>Nome</TableCell>
                                <TableCell sx={{ padding: '16px', width: '30%', textAlign: 'center' }}>Preço</TableCell>
                                <TableCell sx={{ padding: '16px', width: '20%', textAlign: 'center' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ padding: '16px' }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', textAlign: 'center' }}>{row.price}</TableCell>
                                        <TableCell sx={{ padding: '16px', textAlign: 'center' }}>
                                            <Button
                                                onClick={() => handleClickOpenEdit(row)}
                                                sx={{
                                                    color: '#8A8080',
                                                    borderWidth: '2px',
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#f0f0f0',
                                                    }
                                                }}
                                            >
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Editar Adicional</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edite o nome e o preço do adicional selecionado.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={selectedItem.name}
                        onChange={handleChangeEdit}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        label="Preço"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={selectedItem.price}
                        onChange={handleChangeEdit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} sx={{ color: '#8A8080' }}>Cancelar</Button>
                    <Button onClick={handleSaveEdit} sx={{ color: '#8A8080' }}>Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Adicionar Novo Adicional</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira o nome e o preço do novo adicional.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newItem.name}
                        onChange={handleChangeAdd}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        label="Preço"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={newItem.price}
                        onChange={handleChangeAdd}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} sx={{ color: '#8A8080' }}>Cancelar</Button>
                    <Button onClick={handleSaveAdd} sx={{ color: '#8A8080' }}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
