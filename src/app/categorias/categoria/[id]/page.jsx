'use client';
import { usePathname } from "next/navigation";
import CategoryIdView from "../../../../sections/categoriaIdView";

export default function Category() {

    const url = usePathname();

    const id = url.split('/').pop(); 

    return < CategoryIdView Id={id} />;
}

