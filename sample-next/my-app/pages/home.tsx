import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the homepage!</h1>
      <p>
        <Link href="/edit-store">Go to /edit-store</Link>
      </p>
      <p>
        <Link href="/map">Go to /map</Link>
      </p>
      <p>
        <Link href="/restaurants">Go to the list of restaurants to rate</Link>
      </p>
      <p>
        <Link href="/berlin-doner">Go to the restaurant profile </Link>
      </p>
    </main>
  );
}

