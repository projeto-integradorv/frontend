import BellWaiter from "@/components/bellWaiter";
import CategoriaCarrossel from "@/components/categoriaCarrocel";
import Search from "@/components/search";
import BasicLayout from "@/layouts/basic/basiclayout";
import React from "react";
import styles from "@/app/page.module.css";

export default function HomeView() {
    return (
        <div>
            <BasicLayout titulo="Seja Bem-vindo ao LitMatch" >
                <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                    <Search />
                </div>
                <main className={styles.main}>
                    <CategoriaCarrossel />
                    <BellWaiter />
                </main>
            </BasicLayout>

        </div>
    )
}