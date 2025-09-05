"use client";
export default function Home() {
  return (
    <div>
      <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
        The definitive online resource for learning and mastering PostgreSQL,
        from basic queries to advanced administration.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/docs/fundamentals/introduction-to-postgresql"
          className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 e focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Start Learning
        </a>
        <a
          href="#features"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Features
        </a>
      </div>
    </div>
  );
}
