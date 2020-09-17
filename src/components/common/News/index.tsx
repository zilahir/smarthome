import React, { ReactElement, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Box from "../Box";
import { getFinnishNews, getHungarianNews, News } from "../../../api/news";
import indexLogo from "../../../assets/misc/index.png";
import iltaLehtiLogo from "../../../assets/misc/iltalehti.png";

import styles from "./News.module.scss";

interface HandlerProps {
  type: "INDEX" | "ILTALEHTI";
}

const Handler = ({ type }: HandlerProps): ReactElement =>
  type === "INDEX" ? (
    <div className={styles.handler}>
      <img src={indexLogo} alt="index" />
      <p>Index</p>
    </div>
  ) : (
    <div className={styles.handler}>
      <img src={iltaLehtiLogo} alt="iltalehti" />
      <p>Iltalehti</p>
    </div>
  );

const Newss = (): ReactElement => {
  const [hungarianNews, setHungarianNews] = useState<Array<News>>([]);
  const [finnishNews, setFinnishNews] = useState<Array<News>>([]);
  useEffect(() => {
    getHungarianNews().then((hunResult: News[]) => {
      setHungarianNews(hunResult);
    });
    getFinnishNews().then((finResult: News[]) => {
      setFinnishNews(finResult);
    });
  }, []);
  return (
    <Grid container>
      <Grid className={styles.flexContainer} item lg={6}>
        <Box
          isExpendable
          className={styles.newsRootContainer}
          handler={<Handler type="INDEX" />}
        >
          <div className={styles.innerContainer}>
            <h1>Index 🇭🇺</h1>
            <ul>
              {hungarianNews.map((currentNews: News) => (
                <li key={currentNews.guid}>{currentNews.title}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Grid>
      <Grid className={styles.flexContainer} item lg={6}>
        <Box
          handler={<Handler type="ILTALEHTI" />}
          isExpendable
          className={styles.newsRootContainer}
        >
          <div className={styles.innerContainer}>
            <h1>Iltalehti 🇫🇮</h1>
            <ul>
              {finnishNews.map((currentNews: News) => (
                <li key={currentNews.guid}>{currentNews.title}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Newss;
