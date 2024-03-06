import BellWaiter from "@/components/bellWaiter";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import React from "react";


export default function BasicLayout({ children, titulo}) {
    return (
        <>
            <Navbar />
            <Header titulo={titulo}  />
            {children}
            <BellWaiter />

        </>

    );
}