import { Fragment, useEffect, useState } from "react";
import { Button, Input } from "../../Components";
import { attributes, IAttributesList } from "../../data";
import CustomerDetailsAdd from "./CustomerDetailsAdd";
import styles from "./CustomerDetailsEdit.module.css";

export interface ICustomerDetailsEditProps {
  id: number;
  initialAttrsList: IAttributesList;
  onUpdateAttrs: (attrs: object) => void;
}

export default function CustomerDetailsEdit({
  id,
  initialAttrsList,
  onUpdateAttrs,
}: ICustomerDetailsEditProps) {
  const [modifiedAttrs, setModifiedAttrs] = useState<any>({}); // Stores the changed values ready to be sent to the api
  const [attrsList, setAttrsList] = useState<[string, string][]>([]); // Keeps the ui in sync with the tentative changes

  useEffect(() => {
    if (initialAttrsList?.length) {
      syncAttrs();
    }
  }, [initialAttrsList]);

  function syncAttrs() {
    const nextModifiedAttrs = initialAttrsList.reduce((obj, attr) => {
      //Conversion of attributes array to object
      return { ...obj, [attr[0]]: attr[1] };
    }, {});
    setAttrsList(initialAttrsList);
    setModifiedAttrs(nextModifiedAttrs);
  }

  function handleRemoveClick(attrKey: string) {
    const nextAttrsList = attrsList.filter(
      (attrItem) => attrItem[0] !== attrKey
    );
    setAttrsList(nextAttrsList);
    setModifiedAttrs({ ...modifiedAttrs, [attrKey]: "" });
  }

  function handleAddAttr(key: string, value: string) {
    setAttrsList([...attrsList, [key, value]]);
    setModifiedAttrs({ ...modifiedAttrs, [key]: value });
  }

  function handleInputChange(attrKey: string, e: any) {
    setModifiedAttrs({
      ...modifiedAttrs,
      [attrKey]: e.target.value,
    });
  }

  function handleSaveClick() {
    onUpdateAttrs(modifiedAttrs);
  }

  function handleDiscardClick() {
    syncAttrs();
  }

  return (
    <>
      <div className={styles.editGrid}>
        <span className={styles.editGridKey}>id</span>
        <span>{id}</span>
        <div className={styles.removeWrapper}></div>
        {attrsList.map((attrItem) => {
          const attrKey = attrItem[0];
          const isRequired = attributes.REQUIRED_ATTRS.includes(attrKey);
          return (
            <Fragment key={attrItem[0]}>
              <span className={styles.editGridKey}>{attrKey}</span>
              <Input
                value={modifiedAttrs[attrKey]}
                onChange={(e) => handleInputChange(attrKey, e)}
              />
              <div className={styles.removeWrapper}>
                {!isRequired ? (
                  <Button
                    buttonType="link"
                    color="danger"
                    onClick={() => handleRemoveClick(attrKey)}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            </Fragment>
          );
        })}
      </div>
      <CustomerDetailsAdd onAddAttr={handleAddAttr} />
      <div className={styles.bottomBar}>
        <Button onClick={handleDiscardClick} buttonType="link">
          Discard Changes
        </Button>
        <Button onClick={handleSaveClick}>Save Changes</Button>
      </div>
    </>
  );
}
