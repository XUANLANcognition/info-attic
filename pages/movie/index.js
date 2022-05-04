import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/book.module.css";

import axios from "axios";

import { Card } from "antd";
import { Input, Spin, Divider } from "antd";
import { Pagination } from "antd";
import { Row, Col, Carousel } from "antd";
import { useState } from "react";

import Advertisement from "../../componets/Advertisement";
import InfoAtticFooter from "../../componets/InfoAtticFooter";
import IANav from "../../componets/IANav";
import parseCookies from "../api/parsecookies";

const { Search } = Input;

const contentStyle = {
  height: "230px",
  color: "wheat",
  fontSize: '24px',
  lineHeight: "160px",
  textAlign: "center",
  background: "#2a2f3e",
  borderRadius: "16px",
};

function MovieAttic({ init_books, init_count, cookie_data }) {
  const [books, setBooks] = useState(init_books);
  const [isloading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(init_count);

  const onSearch = async (value) => {
    await changeBooks({ search: value });
  };
  const onChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const changeBooks = async (value) => {
    const query_search = "";
    const query_page = 1;
    console.log(value.search);
    console.log(search);
    value.search ? (query_search = value.search) : (query_search = search);
    value.page ? (query_page = value.page) : (query_page = page);

    setLoading(true);
    try {
      const res = await axios.get(
        "http://infoattic.cn:8080/api/v1/movies/?format=json&search=" +
          query_search +
          "&page=" +
          query_page
      );
      setBooks(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePage = async (value) => {
    setPage(value);
    changeBooks({ page: value });
  };

  return (
    <div>
      <Head>
        <title>Movie Attic(影视)</title>
      </Head>

      <main
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <IANav cookieData={cookie_data}></IANav>

        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <Col xs={22} sm={20} md={20} lg={20} xl={20} xxl={18}>
            <div style={{ margin: '18px 0 36px 0' }}>
              <Carousel effect="fade" autoplay>
                <div>
                  <h3 style={contentStyle}>影视阁</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>热榜</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>影视</h3>
                </div>
              </Carousel>
            </div>

            <div
              style={{
                minHeight: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "75%" }}>
                <div style={{ marginRight: "24px" }}>
                  {/* 图书库区块 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "0 36px 0 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      影视库
                    </div>
                    <div style={{ display: "flex", width: "80%" }}>
                      <Search
                        placeholder="输入想要查询的影视"
                        onSearch={onSearch}
                        onChange={onChange}
                        enterButton
                        size="middle"
                        style={{ width: "100%" }}
                        loading={isloading}
                        value={search}
                        allowClear
                      />
                    </div>
                  </div>
                  <div style={{ marginRight: "36px" }}>
                    <Divider />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Spin size="large" spinning={isloading}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          color: "black",
                        }}
                      >
                        {books.map((book) => {
                          return (
                            <Link
                              href={"/movie/subject/" + book.id}
                              key={book.id}
                            >
                              <a target="_blank" className={styles.a}>
                                <div
                                  key={book.movie_name}
                                  style={{ margin: "0 36px 20px 0" }}
                                >
                                  <div
                                    key={book.movie_name}
                                    style={{
                                      width: 130,
                                      height: 190,
                                      marginBottom: "6px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      background:
                                        "url(" + book.movie_cover + ")",
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      borderRadius: "5px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      margin: "6px 0px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        maxWidth: "130px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {book.movie_name}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </Spin>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      margin: "10px 36px 10px 0",
                    }}
                  >
                    <Pagination
                      current={page}
                      defaultPageSize={12}
                      onChange={onChangePage}
                      total={count}
                      loading={isloading}
                      size={36}
                      showSizeChanger={false}
                    />
                  </div>
                  <div style={{ marginRight: "36px" }}>
                    <Divider />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexGrow: "1",
                  flexDirection: "row-reverse",
                }}
              >
                <Advertisement></Advertisement>
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: "1",
          }}
        ></div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const cookie_data = parseCookies(context.req);
  try {
    const res = await axios.get(
      "http://infoattic.cn:8080/api/v1/movies/?format=json"
    );
    const data = res.data;
    return {
      props: {
        init_books: data.results,
        init_count: data.count,
        cookie_data: cookie_data,
      },
    };
  } catch (error) {
    return {
      props: {
        init_books: [],
        init_count: 0,
        cookie_data: cookie_data,
      },
    };
    console.log(error);
  }
}

export default MovieAttic;
