import Head from "next/head";

import { Card } from "antd";

import IALogin from "../componets/Login";
import InfoAtticFooter from "../componets/InfoAtticFooter";
import IANav from "../componets/IANav";

export default function Login() {
  return (
    <div>
      <Head>
        <title>登录</title>
      </Head>

      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <IANav></IANav>

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
            <IALogin></IALogin>
          </Card>
        </div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}
