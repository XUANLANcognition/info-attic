import Head from "next/head";
import { withRouter } from "next/router";

import axios from "axios";
import { Base64 } from "js-base64";

import { Button, Row, Col, Divider, Avatar, Badge } from "antd";
import IANav from "../../../componets/IANav";
import InfoAtticFooter from "../../../componets/InfoAtticFooter";
import PeoplePageMenu from "../../../componets/people/PeoplePageMenu";

import parseCookies from "../../api/parsecookies";

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(Base64.decode(t.split(".")[0]));
  token.payload = JSON.parse(Base64.decode(t.split(".")[1]));
  return token;
}

function PeopleIndexPage(props) {
  return (
    <div>
      <Head>
        <title>{"(IA)"}</title>
      </Head>

      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <IANav cookieData={props.cookie_data}></IANav>

        <Row
          style={{
            flexGrow: "1",
            justifyContent: "center",
            padding: "36px 0",
          }}
        >
          <Col xs={22} sm={20} md={20} lg={20} xl={5} xxl={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "100%",
              }}
            >
              {props.user.is_superuser ? (
                <Badge.Ribbon text="超级管理员" color={"red"}>
                  <Avatar
                    shape="square"
                    src={props.user.avatar}
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Badge.Ribbon>
              ) : (
                <Avatar
                  shape="square"
                  src={props.user.avatar}
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}

              <h1 style={{ fontWeight: "bold" }}>{props.user.username}</h1>
              <h3>{props.user.bio}</h3>
              <Button type="primary" block>
                修改信息
              </Button>
            </div>
          </Col>
          <Col xs={22} sm={20} md={20} lg={20} xl={17} xxl={15}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                padding: "0 50px",
              }}
            >
              <PeoplePageMenu></PeoplePageMenu>
              <Divider></Divider>
            </div>
          </Col>
        </Row>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie_data = parseCookies(context.req);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie_data.user_access_token}`,
      },
    };
    const res1 = await axios.get(
      "http://infoattic.cn:8080/api/v1/owner/" +
        context.query.user_id +
        "?format=json",
      config
    );
    return {
      props: {
        user: res1.data,
        cookie_data: cookie_data,
        user_id: context.query.user_id,
      },
    };
  } catch (error) {
    return {
      props: {
        user: [""],
        cookie_data: cookie_data,
        user_id: context.query.user_id,
      },
    };
  }
}

export default withRouter(PeopleIndexPage);
