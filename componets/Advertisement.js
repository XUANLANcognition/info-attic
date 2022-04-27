import { Carousel } from "antd";

const contentStyle = {
  height: "180px",
  color: "wheat",
  lineHeight: "160px",
  textAlign: "center",
  background: "#2b2f3f",
  borderRadius: '10px'
};

export default function Advertisement() {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Carousel autoplay>
        <div>
          <h3 style={{background: 'url(https://s2.loli.net/2022/04/04/gwCjp4RABHcfOb6.png)', height: '180px', textAlign: 'center', backgroundSize: '100% 100%', backgroundPosition: 'center', borderRadius: '10px'}}></h3>
        </div>
        <div>
          <h3 style={{background: 'url(https://s2.loli.net/2022/04/04/8Us4ca5YjS7QLkC.png)', height: '180px', textAlign: 'center', backgroundSize: '100% 100%', backgroundPosition: 'center', borderRadius: '10px'}}></h3>
        </div>
        <div>
          <h3 style={{background: 'url(https://s2.loli.net/2022/04/04/X7CJfrxZG8FDAB5.jpg)', height: '180px', textAlign: 'center', backgroundSize: '100% 100%', backgroundPosition: 'center', borderRadius: '10px'}}></h3>
        </div>
        <div>
          <h3 style={contentStyle}>诚招广告，虚位以待您的到来</h3>
        </div>
      </Carousel>
    </div>
  );
}
