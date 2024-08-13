import styles from '@/app/page.module.css';
import CardapioContainer from "@/components/cardapioContainer";
import Categorias from "@/components/categoria";
import Search from "@/components/search";
import BasicLayout from "@/layouts/basic/basiclayout";


export default function AdminView() {
    return (
        <BasicLayout titulo="Administrador " >
            <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                <Search />
            </div>
            <main className={styles.main}>
                <Categorias />
                <CardapioContainer />
            </main>
        </BasicLayout>
    );

}