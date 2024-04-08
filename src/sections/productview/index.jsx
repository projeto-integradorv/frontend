import FormAdd from "@/components/FormAdd";
import CardImageProduct from "@/components/cardImageProduct";
import BasicLayout from "@/layouts/basic/basiclayout";
import styles from "../../app/page.module.css";



export default function ProductView({Id}) {

    return (
        <>
            <BasicLayout >

                <main className={styles.main}>
                    <CardImageProduct Id={Id} />
                    <FormAdd productId={Id} />
                    
                </main>
            </BasicLayout>
        </>
    );
}