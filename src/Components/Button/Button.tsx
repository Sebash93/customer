import * as React from "react";
import styles from "./Button.module.css";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "link";
  color?: "success" | "danger";
  children: React.ReactNode;
}

export default function Button({
  buttonType,
  color,
  children,
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        buttonType === "link" ? styles.linkType : ""
      } ${color === "danger" ? styles.dangerColor : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
