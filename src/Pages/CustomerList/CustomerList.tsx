import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Title } from "../../Components";
import ErrorMsg from "../../Components/ErrorMsg/ErrorMsg";
import { customers } from "../../data";
import styles from "./CustomerList.module.css";

export interface ICustomerListProps {}

export default function CustomerList() {
  const [list, setList] = useState<any[]>([]);
  const [error, setError] = useState<any>();
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers(page?: number) {
    const response = await customers.fetch(page);
    if (response?.data) {
      const { meta } = response.data;
      setList([...list, ...response.data.customers]);
      setCurrentPage(meta.page);
      setIsFinalPage(meta.page * meta.per_page >= meta.total);
    }
    setError(response?.error);
  }

  function handleLoadMoreClick() {
    fetchCustomers(currentPage + 1);
  }
  if (list?.length) {
    return (
      <section>
        <Title>Customers</Title>
        <ErrorMsg message={error} />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((customer: any) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>
                    <Link to={`./${customer.id}`}>
                      {customer.attributes.email}
                    </Link>
                  </td>
                  <td>{customer.last_updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.loadMoreBar}>
          {!isFinalPage ? (
            <Button onClick={handleLoadMoreClick}>Load more customers</Button>
          ) : (
            <span>No more customers available</span>
          )}
        </div>
      </section>
    );
  }
  return <section>Loading the list of customers...</section>;
}
