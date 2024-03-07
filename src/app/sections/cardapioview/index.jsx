import styles from '@/app/page.module.css';
import CardapioContainer from "@/components/cardapioContainer";
import Search from "@/components/search";
import BasicLayout from "@/layouts/basic/basiclayout";



export default function CardapioView() {
    return (
        <>

            <BasicLayout titulo={'Cardápio'}>
                <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
                    <Search />
                </div>
                <main className={styles.main}>
                    <CardapioContainer />
                </main>
            </BasicLayout>

        </>
    );
}