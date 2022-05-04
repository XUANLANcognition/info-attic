import { Space, Divider } from "antd";
import Link from "next/link";

const menu = [
  { url: "", title: "介绍" },
  { url: "/refer", title: "摘录" },
];

export default function MoviePageMenu(props) {
  return (
    <div>
      <Space size={14} split={<Divider type="vertical" />}>
        {menu.map((item) => {
          return (
            <Link
              href={`/movie/subject/${encodeURIComponent(props.movie_id)}${item.url}`}
              passHref
            >
              <div style={{ cursor: "pointer" }}>
                {props.current == `${item.title}` ? (
                  <div style={{ color: "wheat", fontWeight: "bold" }}>{item.title}</div>
                ) : (
                  <div>{item.title}</div>
                )}
              </div>
            </Link>
          );
        })}
      </Space>
    </div>
  );
}
