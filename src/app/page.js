import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Search from "@/components/search";
import Header from "@/components/header";

export default function Home() {


  return (
    <>

      <Navbar />
      <Header />
      <div style={{ height: '100px',width:'100%',display:"flex", justifyContent:'center', alignItems:'center' }}>
        <Search />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>bem-vindo ao litmach</h1>
      </main>
    </>
  );
};
