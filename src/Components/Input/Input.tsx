import * as React from "react";
import styles from "./Input.module.css";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: IInputProps) {
  return <input className={styles.input} type="text" {...props} />;
}
