export default function InfoAtticFooter() {
  return (
    <div
      style={{
        background: "#292f3d",
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        padding: '36px 0',
      }}
    >
      <div style={{ width: "80%" }}>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "28px",
            }}
          >
            <div style={{marginBottom: '12px'}}> 
                信息服务
            </div>
            
            <div style={{ fontSize: "16px", fontWeight: "normal" }}>藏书阁</div>
            <div style={{ fontSize: "16px", fontWeight: "normal" }}>影视楼</div>
            <div style={{ fontSize: "16px", fontWeight: "normal" }}>友链</div>
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "28px",
            }}
          >
            <div style={{marginBottom: '12px'}}> 
                信息服务
            </div>
            <div style={{ fontSize: "16px", fontWeight: "normal" }}>藏书阁</div>
          </div>
        </div>
      </div>
    </div>
  );
}
