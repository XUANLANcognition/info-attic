import React, { useState } from "react";
import Head from "next/head";
import Router, { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { Pagination, Input, Empty, Spin, Space, Divider } from "antd";
import axios from "axios";

import styles from "../../../../styles/bookpage.module.css";

import Advertisement from "../../../../componets/Advertisement";
import BookPageMenu from "../../../../componets/book/BookPageMenu";
import InfoAtticFooter from "../../../../componets/InfoAtticFooter";
import IANav from "../../../../componets/IANav";

import parseCookies from "../../../api/parsecookies";

const { Search } = Input;

function BookSubject(props) {
  const [book_quotes, setBookQuotes] = useState(props.init_book_quote);
  const [quote_page, setQuotePage] = useState(1);
  const [quote_count, setQuoteCount] = useState(props.quote_count);
  const [isloading, setLoading] = useState(false);
  const [quote_search, setQuoteSearch] = useState("");

  const changeQuotes = async (value) => {
    const query_search = "";
    const query_page = 1;
    value.search
      ? (query_search = value.search)
      : (query_search = query_search);
    value.page ? (query_page = value.page) : (query_page = query_page);

    setLoading(true);
    try {
      const res = await axios.get(
        "http://infoattic.cn:8080/api/v1/bookquotes/?format=json&book=" +
          props.init_book.id +
          "&search=" +
          query_search +
          "&page=" +
          query_page
      );
      setBookQuotes(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeQuotePage = async (value) => {
    setQuotePage(value);
    console.log(value);
    changeQuotes({ page: value });
  };

  const onQuoteChange = ({ target: { value } }) => {
    setQuoteSearch(value);
  };

  const onQuoteSearch = async (value) => {
    await changeQuotes({ search: value });
  };

  return (
    <div>
      <Head>
        <title>{props.init_book.book_name}</title>
      </Head>
      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <IANav cookieData={props.cookie_data}></IANav>

        <div style={{ flexGrow: "1" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                background: "url(" + props.init_book.book_cover + ")",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                position: "relative",
                marginTop: "30px",
                borderRadius: "10px",
                boxShadow: "3px 3px 3px #bababa, -6px -6px 6px #ffffff",
              }}
            >
              <div /* 蒙版 */
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: "0",
                  top: "0",
                  zIndex: "0",
                  background: "rgba(255, 255, 255, .5)",
                  backdropFilter: "blur(50px)",
                  borderRadius: "10px",
                  boxShadow: "3px 3px 3 px #bababa, -3px -3px 3px #ffffff",
                }}
              ></div>
              <div /* 书籍信息 */
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  minWidth: "100%",
                  margin: "20px 60px",
                  position: "relative",
                  top: "0",
                }}
              >
                <div
                  style={{
                    borderRadius: "8px",
                    background: "url(" + props.init_book.book_cover + ")",
                    width: "170px",
                    height: "250px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  style={{
                    flexGrow: "1",
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 50px ",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {props.init_book.book_name}
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className={styles.book_info_title}>作者 :</div>
                      <div style={{ fontSize: "16px" }}>
                        {props.init_book.book_author}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <div className={styles.book_info_title}>出版社 :</div>
                      <div style={{ fontSize: "16px" }}>
                        {props.init_book.book_publisher}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <div className={styles.book_info_title}>出版时间 :</div>
                      <div style={{ fontSize: "16px" }}>
                        {props.init_book.book_pub_date}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <div className={styles.book_info_title}>ISBN :</div>
                      <div style={{ fontSize: "16px" }}>
                        {props.init_book.book_isbn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "80%",
                marginTop: "36px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "70%" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: "0 0 24px 0",
                  }}
                >
                  <BookPageMenu
                    book_id={props.init_book.id}
                    current="index"
                  ></BookPageMenu>
                </div>
                <Divider />
                <div
                  style={{
                    fontSize: "16px",
                    whiteSpace: "pre-wrap",
                    marginBottom: "60px",
                    lineHeight: "30px",
                  }}
                >
                  {props.init_book.book_abstract}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexGrow: "1",
                  justifyContent: "flex-end",
                  marginLeft: "20px",
                }}
              >
                <Advertisement></Advertisement>
              </div>
            </div>
          </div>
        </div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie_data = parseCookies(context.req);
  try {
    const res1 = await axios.get(
      "http://infoattic.cn:8080/api/v1/books/" + context.query.book_id + "?format=json"
    );
    const res2 = await axios.get(
      "http://infoattic.cn:8080/api/v1/bookquotes/?book=" +
        context.query.book_id +
        "&format=json"
    );
    return {
      props: {
        init_book: res1.data,
        init_book_quote: res2.data.results,
        quote_count: res2.data.count,
        cookie_data: cookie_data
      },
    };
  } catch (error) {
    return {
      props: {
        init_book: {},
        init_book_quote: {},
        quote_count: 0,
        cookie_data: cookie_data
      },
    };
    console.log(error);
  }
}

export default withRouter(BookSubject);
