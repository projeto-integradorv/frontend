import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Search from "@/components/search";
import Header from "@/components/header";
import Categoria from "@/components/categoria";
import BellWaiter from "@/components/bellWaiter";

export default function Home() {


  return (
    <>

      <Navbar />
      <Header />
      <div style={{ height: '100px', width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
        <Search />
      </div>
      <main className={styles.main}>
        <Categoria />
        <BellWaiter />
      </main>
    </>
  );
};
