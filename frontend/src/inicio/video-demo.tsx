export function VideoDemo() {
  return (
    <section className="py-5">
      <div className="container">
        <div style={{
          width:"70%",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <source src="/video-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}