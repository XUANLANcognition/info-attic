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
      <main className={styles.main}>
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
                  width: "190px",
                  height: "280px",
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
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
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
                    <div style={{ fontSize: "18px" }}>
                      {props.init_book.book_author}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <div className={styles.book_info_title}>出版社 :</div>
                    <div style={{ fontSize: "18px" }}>
                      {props.init_book.book_publisher}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <div className={styles.book_info_title}>出版时间 :</div>
                    <div style={{ fontSize: "18px" }}>
                      {props.init_book.book_pub_date}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <div className={styles.book_info_title}>ISBN :</div>
                    <div style={{ fontSize: "18px" }}>
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
                  current="refer"
                ></BookPageMenu>
              </div>
              <Divider />
              {quote_count ? (
                <div>
                  <Search
                    placeholder="输入想要查询的句子"
                    onSearch={onQuoteSearch}
                    onChange={onQuoteChange}
                    enterButton
                    size="middle"
                    style={{ width: "100%", marginBottom: "30px" }}
                    value={quote_search}
                  />
                  <Spin
                    size="large"
                    spinning={isloading}
                    delay={500}
                    tip="正在加载中"
                  >
                    {book_quotes.map((book_quote) => {
                      return (
                        <div
                          className={styles.book_quote_card}
                          key={book_quote.id}
                        >
                          {book_quote.content}
                          {book_quote.reference ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                paddingTop: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              {book_quote.reference}
                            </div>
                          ) : null}
                          {book_quote.location ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                paddingTop: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              出自 {book_quote.location}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </Spin>

                  <div
                    style={{
                      margin: "30px 0 90px 0",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Pagination
                      current={quote_page}
                      defaultPageSize={6}
                      onChange={onChangeQuotePage}
                      total={quote_count}
                      loading={isloading}
                    />
                  </div>
                </div>
              ) : (
                <Empty description="暂时没有摘录" />
              )}
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
        <div style={{ width: "100%" }}>
          <InfoAtticFooter></InfoAtticFooter>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const res1 = await axios.get(
      "http://infoattic.cn:8080/api/v1/books/" + query.book_id + "?format=json"
    );
    const res2 = await axios.get(
      "http://infoattic.cn:8080/api/v1/bookquotes/?book=" +
        query.book_id +
        "&format=json"
    );
    return {
      props: {
        init_book: res1.data,
        init_book_quote: res2.data.results,
        quote_count: res2.data.count,
      },
    };
  } catch (error) {
    return {
      props: {
        init_book: {},
        init_book_quote: {},
        quote_count: 0,
      },
    };
    console.log(error);
  }
}

export default withRouter(BookSubject);
