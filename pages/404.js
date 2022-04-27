import Link from "next/link";

import { Result, Button } from "antd";

export default function Custom404() {
  return (
    <div>
      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
      >
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="404"
            title="404"
            subTitle="你似乎来到了没有信息存在的荒原"
            extra={
              <Link href={'/home'} passHref>
                <Button type="primary">返回主页</Button>
              </Link>
            }
          />
        </div>
      </main>
    </div>
  );
}
