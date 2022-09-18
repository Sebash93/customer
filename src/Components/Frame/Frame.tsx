import styles from "./Frame.module.css";

export interface IFrameProps {
  children: React.ReactNode;
}

export default function Frame({ children }: IFrameProps) {
  return <div className={styles.frame}>{children}</div>;
}
