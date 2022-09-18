import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.container}>
      <div>
        <span className={styles.logo}>Customer.io</span>
        <div className={styles.links}>
          <button
            onClick={() => navigate("/")}
            className={`${styles.button} ${
              location.pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/customers")}
            className={`${styles.button} ${
              location.pathname.includes("/customers") ? styles.active : ""
            }`}
          >
            Customers
          </button>
        </div>
      </div>
      <div>
        <span>take-home@customer.io</span>
      </div>
    </nav>
  );
}
