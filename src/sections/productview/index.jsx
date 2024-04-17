import { getProductById } from '@/api/product';
import ImageProduct from "@/assets/x-bacon.jpeg";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormAdd from "@/components/FormAdd";
import CardImageProduct from "@/components/cardImageProduct";
import BasicLayout from "@/layouts/basic/basiclayout";
import styles from "../../app/page.module.css";

export default function ProductView({ Id }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getProductById(Id);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter o produto por ID:", error);
      }
    };
    fetchProduct();
  }, [Id]);

  return (
    <>
      <BasicLayout>
        <main className={styles.main}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress sx={{color:'#FF9800'}}  />
            </Box>
          ) : (
            <>
              <CardImageProduct Id={Id} />
              <FormAdd productId={Id} />
            </>
          )}
        </main>
      </BasicLayout>
    </>
  );
}
