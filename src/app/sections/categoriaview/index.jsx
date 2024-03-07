import styles from "@/app/page.module.css";
import Categorias from "@/components/categoria";
import Search from "@/components/search";
import BasicLayout from "@/layouts/basic/basiclayout";


export default function CategoriaView() {
    return (
        <>
            <BasicLayout titulo="Categorias" >
                <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                    <Search />
                </div>
                <main className={styles.main}>
                    <Categorias />
                </main>
            </BasicLayout>
        </>
    );
}