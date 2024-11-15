"use client";
import Title from "@/components/text/title/Title";
import { TitleType } from "@/types/TextTypes";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import MainForm from "./ui/form/MainForm";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Получаем данные с собственного API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCities");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Ошибка запроса:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);
  console.log("data", data);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title tag={TitleType.H2} className={styles.pageTitle}>
          Здравствуйте, <span className={styles.pageTitleName}>Человек</span>
        </Title>
        <MainForm />
      </main>
    </div>
  );
}
