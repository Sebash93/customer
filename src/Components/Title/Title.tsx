import styles from "./Title.module.css";

export interface ITitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: ITitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
