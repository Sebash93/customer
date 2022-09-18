import { useState } from "react";
import { Button, Input } from "../../Components";
import styles from "./CustomerDetailsAdd.module.css";

export interface ICustomerDetailsAddProps {
  onAddAttr: (key: string, value: string) => void;
}

export default function CustomerDetailsAdd({
  onAddAttr,
}: ICustomerDetailsAddProps) {
  const [keyInputValue, setKeyInputValue] = useState("");
  const [valueInputValue, setValueInputValue] = useState("");

  function handleAddValueClick() {
    if (valueInputValue && keyInputValue) {
      onAddAttr(keyInputValue, valueInputValue);
      setKeyInputValue("");
      setValueInputValue("");
    }
  }

  return (
    <div className={styles.addGrid}>
      <Input
        placeholder="key"
        onChange={(e) => setKeyInputValue(e.target.value)}
        value={keyInputValue}
      />
      <Input
        placeholder="value"
        onChange={(e) => setValueInputValue(e.target.value)}
        value={valueInputValue}
      />
      <Button
        buttonType="link"
        onClick={handleAddValueClick}
        disabled={!keyInputValue || !valueInputValue}
      >
        Add
      </Button>
    </div>
  );
}
