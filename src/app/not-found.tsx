import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-32 text-center">
      <p className="font-mono text-brand">404</p>
      <h1 className="text-3xl font-bold">This page hasn&apos;t been built yet.</h1>
      <Link href="/episodes/" className="btn btn-primary">Browse episodes</Link>
    </div>
  );
}
