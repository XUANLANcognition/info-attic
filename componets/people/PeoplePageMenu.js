import { Space, Divider } from "antd";
import Link from "next/link";


export default function PeoplePageMenu(props) {
  return (
    <div>
      <Space size={16} split={<Divider type="vertical" />}>
        <Link
          href={`/book/subject/${encodeURIComponent(props.book_id)}`}
          passHref
        >
          <div style={{ cursor: "pointer" }}>
            {props.current == "index" ? (
              <div style={{ color: "wheat", fontWeight: "bold" }}>介绍</div>
            ) : (
              <div>书籍</div>
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
              <div>影视</div>
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
              <div>新闻</div>
            )}
          </div>
        </Link>
      </Space>
    </div>
  );
}
