const navLinks = [
    { label: "Student", href: "/student" },
    { label: "Tutor", href: "/tutor" },
    { label: "Parent", href: "/parent" },
];

export default function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
                height: "64px",
                borderBottom: "1px solid #1f1f1f",
                backgroundColor: "#0f0f0f",
            }}
        >
            <span style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.01em" }}>
                Mentora
            </span>
            <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            style={{ color: "#a3a3a3", textDecoration: "none", fontSize: "0.95rem" }}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
