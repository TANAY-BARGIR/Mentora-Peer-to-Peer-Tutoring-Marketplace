export default function HomePage() {
    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 64px)",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <h1 style={{ fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Mentora
            </h1>
            <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#a3a3a3" }}>
                Peer-to-peer tutoring, reimagined.
            </p>
        </section>
    );
}
