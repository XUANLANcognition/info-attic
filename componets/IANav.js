import Link from "next/link";
import { useRouter } from "next/router";

import { Base64 } from "js-base64";
import { useCookies } from "react-cookie";

import { Input } from "antd";
import { Divider } from "antd";
import { Avatar, Popover, Button } from "antd";

import parseCookies from "../pages/api/parsecookies";

const data = [
  {
    title: "藏书阁",
    url: "/book",
    img_url: "https://sm.ms/image/fXDmASPzlR6K5g1",
  },
  {
    title: "影视楼",
    url: "/movie",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "音乐盒",
    url: "/music",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "工具网站",
    url: "/tool",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "图库",
    url: "/tool",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "新闻",
    url: "/tool",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "更多>>",
    url: "/more",
    img_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
];

const { Search } = Input;

const islogin = true;

const text = <span>Title</span>;

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(Base64.decode(t.split(".")[0]));
  token.payload = JSON.parse(Base64.decode(t.split(".")[1]));
  return token;
}

export default function IANav(props) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  function ClickLogout() {
    removeCookie("user_access_token");
    removeCookie("user_refresh_token");
    router.reload();
  }

  return (
    <div>
      <div
        style={{
          background: "#292f3d",
          height: "68px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 52px",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "56px",
          }}
        >
          <Link href={"/home"} passHref>
            <h1
              style={{
                color: "white",
                margin: "0 36px 0 0",
                cursor: "pointer",
              }}
            >
              InfoAttic
            </h1>
          </Link>

          <div
            style={{ color: "wheat", display: "flex", flexDirection: "row" }}
          >
            {data.map((item) => {
              return (
                <div
                  key={item.title}
                  style={{ fontSize: "16px", marginLeft: "18px" }}
                >
                  <Link href={item.url} passHref>
                    <div style={{ cursor: "pointer" }}>{item.title}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: "1",
            marginLeft: "36px",
          }}
        >
          <div>
            {props.cookieData && props.cookieData.user_access_token ? (
              <div>
                <Popover
                  placement="bottomRight"
                  title={
                    jwtDecode(props.cookieData.user_access_token).payload
                      .usesname
                  }
                  content={
                    <div>
                      <Button type="text" block>
                        主页
                      </Button>
                      <Button
                        danger
                        type="text"
                        block
                        onClick={() => ClickLogout()}
                      >
                        登出
                      </Button>
                    </div>
                  }
                  trigger="click"
                >
                  <Avatar
                    shape="square"
                    size={36}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                </Popover>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <Link href={"/login"} passHref>
                  <div style={{ color: "wheat", cursor: "pointer" }}>登录</div>
                </Link>

                <Divider type="vertical" />
                <div style={{ color: "wheat" }}>注册</div>
              </div>
            )}
          </div>

          <div
            style={{
              flexGrow: "1",
              justifyContent: "center",
              display: "flex",
              padding: "0 36px",
            }}
          >
            <Search
              style={{ maxWidth: "520px" }}
              placeholder="搜索资源"
              enterButton
            />
          </div>
        </div>
      </div>
    </div>
  );
}
