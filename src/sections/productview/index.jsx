import BasicLayout from "@/layouts/basic/basiclayout";
import React from "react";
import styles from "../../app/page.module.css";
import { Card } from "@mui/material";
import CardImageProduct from "@/components/cardImageProduct";



export default function ProductView() {
    return (
        <>
            <BasicLayout >

                <main className={styles.main}>
                    <CardImageProduct />
                </main>
            </BasicLayout>
        </>
    );
}