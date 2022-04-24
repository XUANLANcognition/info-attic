import Head from "next/head";
import { withRouter } from "next/router";

import IANav from "../../../componets/IANav";
import InfoAtticFooter from "../../../componets/InfoAtticFooter";

import parseCookies from "../../api/parsecookies";

function PeopleIndexPage(props) {
  return (
    <div>
      <Head>
        <title>{props.username + "---IA"}</title>
      </Head>

      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <IANav cookieData={props.cookie_data}></IANav>

        <div style={{ flexGrow: "1" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{props.username}</h1>
          </div>
        </div>

        <InfoAtticFooter></InfoAtticFooter>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie_data = parseCookies(context.req);
  return {
    props: {
      username: context.query.username,
      cookie_data: cookie_data,
    },
  };
}

export default withRouter(PeopleIndexPage);
