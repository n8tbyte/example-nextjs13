import Link from "next/link";
import { Card } from "react-bootstrap";

const links = [
  {
    label: "CSR",
    href: "/csr",
  },
  {
    label: "SSG",
    href: "/dynamics/ssg",
  },
  {
    label: "ISR",
    href: "/dynamics/isr",
  },
  {
    label: "SSR",
    href: "/dynamics/ssr",
  },
  {
    label: "Static",
    href: "/static",
  },
];

export default function Home() {
  return (
    <div>
      <h1>Main</h1>
      {links.map((link) => (
        <Card key={link.href} className="my-3">
          <Card.Body>
            <Link href={link.href}>{link.label}</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}