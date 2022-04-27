import { Space, Divider } from "antd";
import Link from "next/link";

export default function BookPageMenu(props) {
  return (
    <div>
      <Space size={14} split={<Divider type="vertical" />}>
        <Link
          href={`/book/subject/${encodeURIComponent(props.book_id)}`}
          passHref
        >
          <div style={{ cursor: "pointer" }}>
            {props.current == "index" ? (
              <div style={{ color: "wheat", fontWeight: "bold" }}>介绍</div>
            ) : (
              <div>介绍</div>
            )}
          </div>
        </Link>
        <Link
          href={`/book/subject/${encodeURIComponent(props.book_id)}/catalog`}
          passHref
        >
          <div style={{ cursor: "pointer" }}>
            {props.current == "catalog" ? (
              <div style={{ color: "wheat", fontWeight: "bold" }}>目录</div>
            ) : (
              <div>目录</div>
            )}
          </div>
        </Link>
        <Link
          href={`/book/subject/${encodeURIComponent(props.book_id)}/refer`}
          passHref
        >
          <div style={{ cursor: "pointer" }}>
            {props.current == "refer" ? (
              <div style={{ color: "wheat", fontWeight: "bold" }}>摘录</div>
            ) : (
              <div>摘录</div>
            )}
          </div>
        </Link>
      </Space>
    </div>
  );
}
