import Categorias from "@/components/categoria";
import Search from "@/components/search";


export default function CategoriaView() {
    return (
        <>
            <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                <Search />
            </div>
            {/* <main className={styles.main}> */}
            <main>
                <Categorias />
            </main>
        </>
    )
}