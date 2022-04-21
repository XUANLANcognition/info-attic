import Head from "next/head";

import { Card } from "antd";

import IALogin from "../componets/Login";
import InfoAtticFooter from "../componets/InfoAtticFooter";

export default function Login() {
  return (
    <div>
      <Head>
        <title>登录</title>
      </Head>
      <main
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: '1'
          }}
        >
          <Card style={{ width: 300 }}>
            <IALogin></IALogin>
          </Card>
        </div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}
