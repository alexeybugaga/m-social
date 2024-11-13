import Title from "@/components/text/title/Title";
import { TitleType } from "@/types/TextTypes";
import styles from "./page.module.scss";
import MainForm from "./ui/form/MainForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title tag={TitleType.H2} className={styles.pageTitle}>
          Здравствуйте, <span>Человек</span>
        </Title>
        <MainForm />
      </main>
    </div>
  );
}
