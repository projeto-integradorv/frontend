import BellWaiter from "@/components/bellWaiter";
import Categorias from "@/components/categoria";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import React from "react";
import styles from '../page.module.css';


export default function Categoria() {
    return (
        <>

            <Navbar />
            <Header titulo={"Categoria"} />
            <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                <Search />
            </div>
            <main className={styles.main}>
                <Categorias />
                <BellWaiter />
            </main>
        </>
    )
}
