'use client';
import React from "react";
import ProductView from "@/sections/productview";
import { usePathname } from "next/navigation";

export default function Product() {

    const url = usePathname();

    const id = url.split('/').pop(); 

    return (
        <>
            <ProductView  Id={id} /> {/* Passe o valor do parâmetro 'id' para ProductView */}
        </>
    );
}

