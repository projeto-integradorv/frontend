'use client';
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function CardFood({ nome, descricao, preco, imagem ,id}) {
    // Limitar o nome do produto a no máximo 30 caracteres
    const nomeLimitado = nome.length > 30 ? nome.substring(0, 30) + '...' : nome;
    const descricaoLimitada = descricao.length > 25 ? descricao.substring(0, 25) + '...' : descricao;
    
    const rota = `cardapio/product/${id}`;
   
    return (
        <>
            <Link style={{textDecorationLine:'none'}} href={rota}>
                <Button sx={{ backgroundColor: 'transparent', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1%', padding: '0', borderRadius: '10px' }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <Image
                            src={imagem}
                            alt={nome}
                            width={290}
                            height={200}
                        />
                        <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {/* Aplicando o estilo CSS para evitar quebra de linha */}
                            <Typography gutterBottom variant="h5" sx={{ whiteSpace: 'nowrap' }}>
                                {nomeLimitado} {/* Usando o nome limitado */}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                {descricaoLimitada} {/* Usando a descrição limitada */}
                            </Typography>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                justifyContent={'flex-end'}
                                alignItems={'center'}
                                sx={{ width: '100%' }}>
                                <Typography variant="body2" color="text.secondary">
                                    a partir de
                                </Typography>
                                <Typography variant="h6" color="text.primary" sx={{ color: '#52c5a6', paddingLeft: '10px' }}>
                                    {preco} R$
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Button>
            </Link>
        </>
    );
}
