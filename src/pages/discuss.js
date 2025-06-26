import Head from "next/head";
import HomeLayout from "@/layouts/homeLayout";

export default function Discuss() {
  return (
    <HomeLayout>
      <Head>
        <title>Discuss | Daily DSA</title>
      </Head>
      <main className="max-w-3xl mx-auto py-16 px-4 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-violet-700">Discuss</h1>
        <p className="mb-8 text-gray-700">Welcome to the Discuss page! Here you can share your thoughts, ask questions, and help others on their DSA journey.</p>
        <div className="bg-gray-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-violet-700">Sample Discussions</h2>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">How do you approach dynamic programming problems?</span>
              <p className="text-gray-500 text-sm">Started by Alice · 12 replies</p>
            </li>
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">Best resources for learning Graph Algorithms?</span>
              <p className="text-gray-500 text-sm">Started by Bob · 8 replies</p>
            </li>
            <li>
              <span className="font-medium text-gray-900">Share your favorite DSA interview question!</span>
              <p className="text-gray-500 text-sm">Started by Carol · 5 replies</p>
            </li>
          </ul>
        </div>
      </main>
    </HomeLayout>
  );
} 