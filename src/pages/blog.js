import Head from "next/head";
import HomeLayout from "@/layouts/homeLayout";

export default function Blog() {
  return (
    <HomeLayout>
      <Head>
        <title>Blog | Daily DSA</title>
      </Head>
      <main className="max-w-3xl mx-auto py-16 px-4 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-violet-700">Blog</h1>
        <p className="mb-8 text-gray-700">Read the latest articles, tips, and insights on Data Structures and Algorithms.</p>
        <div className="bg-gray-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-violet-700">Recent Posts</h2>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">Mastering Binary Trees: Tips & Tricks</span>
              <p className="text-gray-500 text-sm">April 10, 2024 · by Jane Doe</p>
            </li>
            <li className="border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-900">Dynamic Programming Demystified</span>
              <p className="text-gray-500 text-sm">April 5, 2024 · by John Smith</p>
            </li>
            <li>
              <span className="font-medium text-gray-900">Top 10 Graph Problems for Interviews</span>
              <p className="text-gray-500 text-sm">March 28, 2024 · by Alice Lee</p>
            </li>
          </ul>
        </div>
      </main>
    </HomeLayout>
  );
} 