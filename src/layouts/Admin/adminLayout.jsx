'use client';
import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, CircularProgress } from "@mui/material";
import { CategoryOutlined, PeopleAltOutlined, PostAddOutlined, ReceiptLongOutlined, RestaurantMenuOutlined } from "@mui/icons-material";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import Categoria from "@/components/categoria"; // Componente para a categoria
import Produtos from "@/components/cardapioContainer";
import PedidosView from '@/sections/pedidosView'
import Adicionais from "./components/Adicionais"

const drawerWidth = 240;

export default function AdminLayout() {
    const [selectedComponent, setSelectedComponent] = useState("categoria");
    const [loading, setLoading] = useState(true);

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case "categoria":
                return <Categoria />;
            case "produtos":
                return <Produtos />;
            case "pedidos":
                return <PedidosView/>
            case "adicionais":
                return <Adicionais/>
            default:
                return <Categoria />;
        }
    };

    useEffect(() => {
        setLoading(true); 

        const timer = setTimeout(() => {
            setLoading(false); 
        }, 500);

        return () => clearTimeout(timer); 
    }, [selectedComponent]);

    return (
        <Box margin={0} padding={0} sx={{ display: "flex", minHeight: "100vh" }}>
            <Drawer
                variant="permanent"
                PaperProps={{
                    sx: {
                        backgroundColor: '#FF9800',
                        color: 'white',
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }
                }}
            >
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { text: 'Categoria', icon: <CategoryOutlined />, component: 'categoria' },
                            { text: 'Produtos', icon: <RestaurantMenuOutlined />, component: 'produtos' },
                            { text: 'Adicionais', icon: <PostAddOutlined />, component: 'adicionais' },
                            { text: 'Pedidos', icon: <ReceiptLongOutlined />, component: 'pedidos' },
                            { text: 'Funcionários', icon: <PeopleAltOutlined />, component: 'funcionarios' }
                        ].map(({ text, icon, component }) => (
                            <ListItemButton key={text} onClick={() => setSelectedComponent(component)}>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, paddingLeft: `${drawerWidth}px`, position: "relative" }}>
                <Navbar />
                <Box sx={{ padding: "16px", backgroundColor: '#E5E5E5' }}>
                    <Search />
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        renderSelectedComponent()
                    )}
                </Box>
            </Box>
        </Box>
    );
}
