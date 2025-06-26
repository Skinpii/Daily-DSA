import Head from "next/head";
import HomeLayout from "@/layouts/homeLayout";

export default function Contest() {
  return (
    <HomeLayout>
      <Head>
        <title>Contest | Daily DSA</title>
      </Head>
      <main className="max-w-3xl mx-auto py-16 px-4 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-violet-700">Contests</h1>
        <p className="mb-8 text-gray-700">Participate in exciting DSA contests and challenge yourself!</p>
        <div className="bg-gray-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-violet-700">Upcoming Contests</h2>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">April Challenge 2024</span>
              <p className="text-gray-500 text-sm">Starts: April 15, 2024 · Duration: 2 hours</p>
            </li>
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">Weekly DSA Sprint</span>
              <p className="text-gray-500 text-sm">Starts: Every Sunday · Duration: 1 hour</p>
            </li>
            <li>
              <span className="font-medium text-gray-900">Beginner's Coding Cup</span>
              <p className="text-gray-500 text-sm">Starts: May 1, 2024 · Duration: 90 minutes</p>
            </li>
          </ul>
        </div>
      </main>
    </HomeLayout>
  );
} 