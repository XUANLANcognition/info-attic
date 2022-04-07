import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/book.module.css";

import axios from "axios";

import { Card } from "antd";
import { Input, Spin, Divider } from "antd";
import { Pagination } from "antd";
import { useState } from "react";

import Advertisement from "../../componets/Advertisement";
import InfoAtticFooter from "../../componets/InfoAtticFooter";

const { Search } = Input;

function BookAttic({ init_books, init_count }) {
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
        "http://infoattic.cn:8080/api/v1/books/?format=json&search=" +
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
        <title>Book Attic</title>
      </Head>

      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              padding: "36px 0",
            }}
          >
            <h1>藏书阁</h1>
          </div>
          <div
            style={{
              width: "80%",
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
                    图书库
                  </div>
                  <div style={{ display: "flex", width: "80%" }}>
                    <Search
                      placeholder="输入想要查询的书籍"
                      onSearch={onSearch}
                      onChange={onChange}
                      enterButton
                      size="middle"
                      style={{ width: "100%" }}
                      loading={isloading}
                      value={search}
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
                          <Link href={"/book/subject/" + book.id} passHref>
                            <a target="_blank" className={styles.a}>
                              <div
                                key={book.book_name}
                                style={{ margin: "0 36px 36px 0" }}
                              >
                                <div
                                  key={book.book_name}
                                  style={{
                                    width: 130,
                                    height: 190,
                                    marginBottom: "6px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    background: "url(" + book.book_cover + ")",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "3px",
                                    boxShadow:
                                      "5px 5px 20px #b0b0b0, -5px -5px 30px #eeeeee",
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
                                    {book.book_name}
                                  </div>
                                  <div
                                    style={{
                                      fontWeight: "normal",
                                      fontSize: "14px",
                                      maxWidth: "130px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {book.book_author}
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
        </div>

        <div>
          <InfoAtticFooter></InfoAtticFooter>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  try {
    const res = await axios.get(
      "http://infoattic.cn:8080/api/v1/books/?format=json"
    );
    const data = res.data;
    return {
      props: {
        init_books: data.results,
        init_count: data.count,
      },
    };
  } catch (error) {
    return {
      props: {
        init_books: [],
      },
    };
    console.log(error);
  }
}

export default BookAttic;
