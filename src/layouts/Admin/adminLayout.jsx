'use client';
import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, CircularProgress, useMediaQuery, useTheme, IconButton, Slide } from "@mui/material";
import { CategoryOutlined, PeopleAltOutlined, PostAddOutlined, ReceiptLongOutlined, RestaurantMenuOutlined, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import Categoria from "@/components/categoria"; // Componente para a categoria
import Produtos from "@/components/cardapioContainer";
import PedidosView from '@/sections/pedidosView'

const drawerWidth = 240;

export default function AdminLayout() {
    const [selectedComponent, setSelectedComponent] = useState("categoria");
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Adapte o breakpoint conforme necessário
    const [open, setOpen] = useState(!isMobile);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case "categoria":
                return <Categoria />;
            case "produtos":
                return <Produtos />;
            case "pedidos":
                return <PedidosView />;
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
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#FF9800',
                        color: 'white',
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }
                }}
                ModalProps={{ keepMounted: true }} // Melhora a performance em dispositivos móveis
            >
                <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                        {isMobile && (
                            <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        )}
                    </Box>
                    <List>
                        {[
                            { text: 'Categoria', icon: <CategoryOutlined />, component: 'categoria' },
                            { text: 'Produtos', icon: <RestaurantMenuOutlined />, component: 'produtos' },
                            { text: 'Adicionais', icon: <PostAddOutlined />, component: 'adicionais' },
                            { text: 'Pedidos', icon: <ReceiptLongOutlined />, component: 'pedidos' },
                            { text: 'Funcionários', icon: <PeopleAltOutlined />, component: 'funcionarios' }
                        ].map(({ text, icon, component }) => (
                            <ListItemButton key={text} onClick={() => {
                                setSelectedComponent(component);
                                if (isMobile) {
                                    setOpen(false);
                                }
                            }}>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, paddingLeft: isMobile ? 0 : `${drawerWidth}px`, position: "relative" }}>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            position: 'absolute',
                            top: '400px',
                            left: '5%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1200,
                            color: '#FF9800',
                            backgroundColor: 'white',
                            boxShadow: 3,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Navbar />
                <Box sx={{ padding: "16px", backgroundColor: '#E5E5E5' }}>
                    <Search />
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress sx={{
                                color: '#FF9800',
                            }} />
                        </Box>
                    ) : (
                        renderSelectedComponent()
                    )}
                </Box>
            </Box>
        </Box>
    );
}
