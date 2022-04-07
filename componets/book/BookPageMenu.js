import { Space, Divider } from "antd";
import Link from "next/link";

import styles from "../../styles/bookpage.module.css";

export default function BookPageMenu(props) {
  return (
    <div>
      <Space size={16} split={<Divider type="vertical" />}>
        <Link href={`/book/subject/${encodeURIComponent(props.book_id)}`}>
          <a className={styles.a}>
            {props.current == "index" ? (
              <div style={{ color: "#55aaff", fontWeight: 'bold' }}>介绍</div>
            ) : (
              <div>介绍</div>
            )}
          </a>
        </Link>
        <Link href={`/book/subject/${encodeURIComponent(props.book_id)}/catalog`}>
          <a className={styles.a}>
            {props.current == "catalog" ? (
              <div style={{ color: "#55aaff", fontWeight: 'bold' }}>目录</div>
            ) : (
              <div>目录</div>
            )}
          </a>
        </Link>
        <Link href={`/book/subject/${encodeURIComponent(props.book_id)}/refer`}>
          <a className={styles.a}>
            {props.current == "refer" ? (
              <div style={{ color: "#55aaff", fontWeight: 'bold' }}>摘录</div>
            ) : (
              <div>摘录</div>
            )}
          </a>
        </Link>
      </Space>
    </div>
  );
}
