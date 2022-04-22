import Link from "next/link";

import { Input } from "antd";
import { Divider } from "antd";
import { Avatar, Image } from "antd";

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

export default function IANav() {
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
                <div style={{ fontSize: "16px", marginLeft: "18px" }}>
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
            {islogin ? (
              <div style={{ display: "flex" }}>
                <Link href={"/login"} passHref>
                  <div style={{ color: "wheat", cursor: 'pointer' }}>登录</div>
                </Link>

                <Divider type="vertical" />
                <div style={{ color: "wheat" }}>注册</div>
              </div>
            ) : (
              <div>
                <Avatar
                  shape="square"
                  size={36}
                  src="https://joeschmoe.io/api/v1/random"
                />
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
