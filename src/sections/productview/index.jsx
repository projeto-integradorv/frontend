import { getProductById } from '@/api/product';
import FormAdd from "@/components/FormAdd";
import CardImageProduct from "@/components/cardImageProduct";
import BasicLayout from "@/layouts/basic/basiclayout";
import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { carregarProduto } from "@/lib/features/produtos/produtoSlice"

export default function ProductView({ Id }) {

  const dispatch = useAppDispatch(carregarProduto(Id));
  const { produto, loading } = useAppSelector((state) => state.produtos);

  console.log(produto, 'produto - productView')

  useEffect(() => {
    dispatch(carregarProduto(Id))
  }, [dispatch, Id]);

  return (
    <BasicLayout>
      <Container disableGutters={true}  maxWidth='' sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "flex-start", gap: 2, padding: 0, margin: 0, backgroundColor: '#f5f5f5', height: '100%', gap: 15, '@media (max-width: 768px)': { gap: 10 }
      }} >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress sx={{ color: '#FF9800' }} />
          </Box>
        ) : (
          <>

            <CardImageProduct produto={produto} />
            <FormAdd produto={produto} />
          </>
        )}
      </Container>
    </BasicLayout>
  );
}
