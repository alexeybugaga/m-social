"use client";
import Title from "@/components/text/title/Title";
import { TitleType } from "@/types/TextTypes";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import MainForm from "./ui/form/MainForm";

export default function Home() {
  const [firstName, setFirstName] = useState<string>("Человек");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("formName");
      if (storedName) {
        setFirstName(storedName);
      }
    }
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      const storedName = localStorage.getItem("formName");
      if (storedName) {
        setFirstName(storedName);
      }
    };

    window.addEventListener("localStorageUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("localStorageUpdated", handleCustomEvent);
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title tag={TitleType.H2} className={styles.pageTitle}>
          Здравствуйте,{" "}
          <span className={styles.pageTitleName}>{firstName}</span>
        </Title>
        <MainForm />
      </main>
    </div>
  );
}
