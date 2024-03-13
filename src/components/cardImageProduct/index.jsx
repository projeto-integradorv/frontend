import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import ImageProduct from "@/assets/x-bacon.jpeg";

export default function CardImageProduct({ titulo, imagem, preco, descricao }) {
    return (
        <Grid container sx={{ width: "100%", marginY: "-12%", padding: 0, backgroundColor: 'transparent', display: 'flex', justifyContent: "center" }} spacing={0}>
            <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Box
                width={"20%"}
                display={'flex'}
                justifyContent={'center'}>
                    <Image
                        src={ImageProduct}
                        alt={'Imagem do produto'}
                        width={300}
                        height={300}
                        objectFit='contain'
                        objectPosition='center center'
                        style={{ borderRadius: '10px' }}
                    />
                </Box>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    whiteSpace={'wrap'}
                    width={'80%'}
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                    height={'20rem'}
                    sx={{
                        backgroundColor: 'transparent',
                        paddingLeft: '6rem',

                    }}
                >
                    <Typography sx={{ color: "white" }} variant="h3" component="h1">
                        X-Bacon
                    </Typography>
                    <Typography sx={{ color: "white" }} variant="h6" component="h3">
                        A partir R$ 25,00
                    </Typography>
                    <Typography sx={{ color: "white", fontWeight: 400, flexWrap: "wrap" }} variant="h7" component="h4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius esse nemo cumque eos, rem quaerat soluta, nesciunt minus error suscipit eum sunt illo at neque dicta consequatur non ratione laboriosam?
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
