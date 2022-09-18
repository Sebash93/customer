import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ErrorMsg, Title } from "../../Components";
import { attributes, customers, ICustomerResult } from "../../data";
import CustomerDetailsEdit from "./CustomerDetailsEdit";

import styles from "./CustomerDetails.module.css";

export default function CustomerDetails() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customer, setCustomer] = useState<ICustomerResult>();
  const [error, setError] = useState<any>();

  const { customerId } = useParams();

  useEffect(() => {
    if (customerId) fetchCustomer(customerId);
  }, [customerId]);

  async function fetchCustomer(customerId: string) {
    const response = await customers.fetchOne(customerId);
    if (response.data) {
      setCustomer(response.data);
    }
    setError(response.error);
  }

  async function updateAtrributes(nextAttributes: object) {
    if (customerId) {
      const response = await attributes.patch(customerId, nextAttributes);
      if (response.data) {
        setCustomer(response.data);
        setIsEditMode(false);
      }
      setError(response.error);
    }
  }

  if (customer) {
    return (
      <section>
        <Title>{customer.attributes.email}</Title>
        <div className={styles.lastUpdated}>
          Last Updated: {customer.last_updated}
        </div>
        <ErrorMsg message={error} />
        <div className={styles.attrsContainer}>
          {!isEditMode ? (
            <>
              <div className={styles.attrsTopBar}>
                <h2 className={styles.attrTitle}>Attributes</h2>
                <Button onClick={() => setIsEditMode(true)}>Edit</Button>
              </div>
              <div className={styles.attrsGrid}>
                <span>id</span>
                <span>{customer.id}</span>
                {customer?.arrayAttributes.map((attr) => {
                  return attr.map((attrItem) => (
                    <span key={attrItem}>{attrItem}</span>
                  ));
                })}
              </div>
            </>
          ) : (
            <CustomerDetailsEdit
              id={customer.id}
              initialAttrsList={customer.arrayAttributes}
              onUpdateAttrs={updateAtrributes}
            />
          )}
        </div>
      </section>
    );
  }
  return <section>Loading customer data...</section>;
}
