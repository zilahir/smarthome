import React, { ReactElement, useEffect, useState } from "react";
import classnames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import EuroIcon from "@material-ui/icons/Euro";

import { getAllProducts, getLastShoppingList } from "../../../../api/shopping";
import styles from "../../KRuoka.module.scss";
import { MyKRUokaProducts, ShoppingList } from "../../../../types";

const MyKRukoa = (): ReactElement => {
  const [myProducts, setMyProducts] = useState<Array<MyKRUokaProducts>>([]);
  const [lastShoppingList, setLastShoppingList] = useState<ShoppingList>({
    items: [],
    isFullFilled: false,
    createdAt: "",
    id: undefined,
  });

  useEffect(() => {
    const getAllMyProductsPromise = getAllProducts();
    const getLastShoppingListPromise = getLastShoppingList();
    getAllMyProductsPromise.then((productsResult: Array<MyKRUokaProducts>) => {
      setMyProducts(productsResult);
    });
    getLastShoppingListPromise.then((shoppingListResult: ShoppingList) => {
      setLastShoppingList(shoppingListResult);
    });
  }, []);

  const getSumPrice = (items: MyKRUokaProducts[]): number =>
    items.reduce((n, { price }) => n + Number.parseInt(price.value, 10), 0);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.col}>
        <h1>My KRuoka products</h1>
        <ul className={classnames(styles.list)}>
          {myProducts.map((currentProduct: MyKRUokaProducts, index: number) => (
            <li
              key={`product-${index}`}
              role="button"
              onClick={() => console.debug("hello")}
            >
              <div className={styles.productMetaContainer}>
                <p>{currentProduct.productName}</p>
              </div>
              <div className={styles.btnContainer}>
                <button
                  onClick={() => console.debug("hello")}
                  className={styles.removeBtn}
                  type="button"
                >
                  <DeleteIcon htmlColor="#ffffff" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.col}>
        <h1>last open shopping list</h1>
        <div className={styles.meta}>
          <EventIcon htmlColor="#ffffff" />
          <span>
            {lastShoppingList?.createdAt}
            <span className={styles.count}>
              {lastShoppingList?.items.length}
            </span>{" "}
            products
          </span>
        </div>
        {lastShoppingList?.items.length > 0 && (
          <div className={styles.meta}>
            <p className={styles.price}>
              <small>SUM:</small>
              {getSumPrice(lastShoppingList?.items)}
            </p>
            <EuroIcon htmlColor="#ffffff" />
          </div>
        )}
        <ul className={styles.list}>
          {lastShoppingList?.items.map(
            (currentShoppingItem: MyKRUokaProducts) => (
              <li key={currentShoppingItem.productId}>
                {currentShoppingItem.productName}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyKRukoa;
