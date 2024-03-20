import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";





export default function CardFood({ nome, descricao, preco, imagem }) {
    return (
        <>
            <Button sx={{ backgroundColor: 'transparent', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1%', padding: '0', borderRadius: '10px' }}>
                <Card sx={{ maxWidth: 345 }}>
                    <Image
                        src={imagem}
                        alt={nome}
                        width={290}
                        height={200}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h5">
                            {nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                            {descricao}
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
                                {preco}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Button>
        </>
    );

}