import styles from "../styles/Home.module.css";

export async function getData() {
  const { data, error } = await supabase.from("test").select("titel");
  console.log(data);
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <h1>{data}</h1>
    </div>
  );
}
