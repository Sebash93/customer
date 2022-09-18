import styles from "./ErrorMsg.module.css";

export interface IErrorMsgProps {
  message: any;
}

export default function ErrorMsg({ message }: IErrorMsgProps) {
  if (message) {
    return (
      <div className={styles.errorMsg}>
        <b>Error: </b>
        {message}
      </div>
    );
  }
  return null;
}
