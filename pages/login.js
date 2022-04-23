import Head from "next/head";

import { Card } from "antd";

import IALogin from "../componets/Login";
import InfoAtticFooter from "../componets/InfoAtticFooter";
import IANav from "../componets/IANav";
import parseCookies from "./api/parsecookies";

function LoginPage({ cookie_data }) {
  return (
    <div>
      <Head>
        <title>登录</title>
      </Head>

      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <IANav cookieData={cookie_data}></IANav>

        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ width: 300 }}>
            <IALogin cookieData={cookie_data}></IALogin>
          </Card>
        </div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = parseCookies(context.req);

  return {
    props: {
      cookie_data: data,
    },
  };
}

export default LoginPage;
