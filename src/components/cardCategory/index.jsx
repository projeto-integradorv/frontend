import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Importa o ícone RemoveCircleOutline
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const CardCategory = ({ id, icon, nameCategory, onClick, onDelete, showDeleteIcon }) => {
    const rota = `categorias/categoria/${id}`;
    const router = useRouter()
    const pathname = usePathname()

   const handleClick = () => {
        router.push(rota)
    }

    return (
        <>
        { pathname === '/categorias' || pathname === '/' ? (
            <Card
                sx={{
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    boxShadow: 3
                }}

                onClick={handleClick}

            >
                <CardContent sx={{ textAlign: 'center' }}>
                    <Image
                        src={icon}
                        alt={nameCategory}
                        width={70}
                        height={70}
                        style={{ borderRadius: '8px' }}
                    />
                    <Typography variant="h6" sx={{ marginTop: '8px', fontWeight: 'bold' }}>
                        {nameCategory}
                    </Typography>
                </CardContent>
                {showDeleteIcon && onDelete && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#E5E5E5',
                            zIndex: 1,
                            '&:hover': {
                                color: '#bebebe',
                            },
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete();
                        }}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                )}
            </Card>) : (
            <Card
                sx={{
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    boxShadow: 3
                }}
                onClick={onclick}

            >
                <CardContent sx={{ textAlign: 'center' }}>
                    <Image
                        src={icon}
                        alt={nameCategory}
                        width={70}
                        height={70}
                        style={{ borderRadius: '8px' }}
                    />
                    <Typography variant="h6" sx={{ marginTop: '8px', fontWeight: 'bold' }}>
                        {nameCategory}
                    </Typography>
                </CardContent>
                {showDeleteIcon && onDelete && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#E5E5E5',
                            zIndex: 1,
                            '&:hover': {
                                color: '#bebebe',
                            },
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete();
                        }}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                )}
            </Card>
        )}
        </>
    );
};

export default CardCategory;
