import React, { ReactElement, useState } from "react";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import classnames from "classnames";

import { apiendPoints } from "../../api/apiEndpoints";
import { asyncRequest } from "../../utils/requests";
import { insertNewProductItem } from "../../api/kruoka";
import Modal from "../../components/common/Modal";
import Loading from "../../components/common/Loading";

import styles from "./KRuoka.module.scss";

const KRuoka = (): ReactElement => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, toggleModalOpen] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [currentProduct, setCurrentProduct] = useState<Record<string, any>>({});
  const [isLoading, toggleLoading] = React.useState<boolean>(false);

  function handleSearch(searchQuery: string) {
    toggleLoading(true);
    asyncRequest(apiendPoints.kruoka.findProduct, {
      itemToSearch: searchQuery.toLowerCase(),
    }).then((result: any) => {
      toggleLoading(false);
      if (Array.isArray(result.result)) {
        setProducts(result.result);
      }
    });
  }

  function addProduct(productName: string, productId: number) {
    const productObject = {
      productId,
      productName,
    };
    insertNewProductItem(productObject);
  }
  return (
    <>
      <div className={styles.listContainer}>
        <input
          className={styles.input}
          type="text"
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Loading isLoading={isLoading} />
        <ul className={classnames(styles.list, isLoading ? styles.hidden : "")}>
          {products.map((currentProduct: any, index: number) => (
            <li key={`product-${index}`}>
              <div className={styles.productMetaContainer}>
                <p>{currentProduct.localizedName.finnish}</p>
              </div>
              <div className={styles.actionBtnContainer}>
                <button
                  type="button"
                  onClick={() => setCurrentProduct(currentProduct)}
                >
                  <AddCircleRoundedIcon htmlColor="#ffffff" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal isModal={isModalOpen} setModal={toggleModalOpen}>
        <input
          type="text"
          className={styles.customNameInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCustomName(event.target.value)
          }
          value={customName}
        />
        <div className={styles.btnContainer}>
          <button
            type="button"
            onClick={() =>
              addProduct(
                currentProduct.localizedName.finnish,
                currentProduct.id
              )
            }
          >
            add this product
          </button>
        </div>
      </Modal>
    </>
  );
};

export default KRuoka;
