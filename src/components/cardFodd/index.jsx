'use client';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import iconDel from '@/assets/Group 33.png'

export default function CardFood({ nome, descricao, preco, imagem, id, quant }) {
    const nomeLimitado = nome.length > 30 ? nome.substring(0, 30) + '...' : nome;
    const descricaoLimitada = descricao.length > 25 ? descricao.substring(0, 25) + '...' : descricao;
    const rota = `cardapio/product/${id}`;
    const pathname = usePathname();

    return (
        <>
            {pathname === '/cart' ? (
                <Grid 
                    container 
                    sx={{
                        backgroundColor: 'transparent', 
                        height: '100%', 
                        width: '95%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: '0', 
                        borderRadius: '20px',
                        position: 'relative', // Adiciona posição relativa ao contêiner
                        '@media (max-width: 1024px)': {
                            width: '100%',
                        },
                        '@media (max-width: 768px)': {
                            gap: 1,
                            width: '100%',
                        },
                        '@media (max-width: 480px)': {
                            width: '90%',
                        }
                    }}
                >
                    <Card sx={{ width: '100%', position: 'relative' }}>
                        <Image
                            src={imagem}
                            alt={'imagem'}
                            width={350}
                            height={250}
                            objectFit="cover"
                            
                        />
                        <Button
                            aria-label="delete"
                            sx={{
                            
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                zIndex: 1, // Garantir que o botão esteja acima do conteúdo
                            }}
                            onClick={() => {}}
                        >
                            <Image
                                src={iconDel}
                                alt={'delete'}
                                width={50}
                                height={50}
                                
                            />
                        </Button>
                        <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Box
                                width={'100%'}
                                display={"flex"}
                                justifyContent={'flex-start'}
                                flexDirection={'column'}
                            >
                                <Typography gutterBottom variant="h5" sx={{ width: '100%', textAlign: 'left' }}>
                                    {nomeLimitado}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                    {descricaoLimitada}
                                </Typography>
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                justifyContent={'flex-start'}
                                padding={0}
                                alignItems={'center'}
                                sx={{
                                    width: '100%',
                                }}>
                                <Container maxWidth='' disableGutters={true} sx={{ display: 'flex', width: '100%', gap: 1, padding: 0, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ width: '15%', display: 'flex', justifyContent: 'center' }}>
                                        qt: {quant}
                                    </Typography>
                
                                    <Typography variant="body2" color="text.secondary" sx={{ width: '70%', display: 'flex', justifyContent: '', alignItems: 'center' }}>
                                        a partir:  <Typography variant='body2' color="text.secondary" sx={{ color: '#52c5a6', width: '50%', textAlign: 'left', paddingLeft: '3px' }}>
                                            {preco} R$
                                        </Typography>
                                    </Typography>
                                </Container>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ) : (
                <Link style={{ textDecorationLine: 'none' }} href={rota}>
                    <Button sx={{ backgroundColor: 'transparent', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1%', padding: '0', borderRadius: '10px' }}>
                        <Card sx={{ maxWidth: 345, position: 'relative' }}>
                            <Image
                                src={imagem}
                                alt={nome}
                                width={290}
                                height={200}
                            />
                            <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
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
            )}
        </>
    );
}
