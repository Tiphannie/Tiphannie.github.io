import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the homepage!</h1>
      <p>
        <Link href="/edit-store">Go to /edit-store</Link>
      </p>
    </main>
  );
}

