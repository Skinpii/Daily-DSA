import { useEffect, useState } from "react";
import Head from "next/head";
import HomeLayout from "@/layouts/homeLayout";
import Image from "next/image";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      // Fetch analytics from backend
      fetch(`/api/analytics/user?userId=${userObj.sub}`)
        .then(res => res.json())
        .then(data => {
          setAnalytics(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Prepare chart data from analytics
  let barData = null, barOptions = null, pieData = null, pieOptions = null, bestDay = null, avgPerDay = null;
  if (analytics && analytics.perDay) {
    const days = Object.keys(analytics.perDay).slice(-7);
    const values = days.map(d => analytics.perDay[d]);
    barData = {
      labels: days,
      datasets: [
        {
          label: "Questions Solved",
          data: values,
          backgroundColor: "#8b5cf6",
          borderRadius: 6,
        },
      ],
    };
    barOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: { mode: "index", intersect: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#6b7280" },
        },
        y: {
          beginAtZero: true,
          grid: { color: "#e5e7eb" },
          ticks: { color: "#6b7280" },
        },
      },
    };
    // Best day
    let max = 0, maxDay = null;
    days.forEach((d, i) => {
      if (values[i] > max) {
        max = values[i];
        maxDay = d;
      }
    });
    bestDay = maxDay;
    avgPerDay = (values.reduce((a, b) => a + b, 0) / (values.length || 1)).toFixed(1);
  }
  if (analytics && analytics.perCategory) {
    pieData = {
      labels: Object.keys(analytics.perCategory),
      datasets: [
        {
          data: Object.values(analytics.perCategory),
          backgroundColor: [
            "#8b5cf6",
            "#f59e42",
            "#10b981",
            "#f43f5e",
            "#6366f1",
          ],
          borderWidth: 1,
        },
      ],
    };
    pieOptions = {
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#6b7280", font: { size: 14 } },
        },
      },
    };
  }

  return (
    <HomeLayout>
      <Head>
        <title>Dashboard | Daily DSA</title>
      </Head>
      <main className="w-full max-w-7xl mx-auto py-12 min-h-screen bg-white">
        <h1 className="text-4xl font-bold mb-10 text-violet-700">Dashboard</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : user ? (
          analytics ? (
            <>
              {/* User Info & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="col-span-1 bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
                  {user.picture && (
                    <Image src={user.picture} alt={user.name} width={64} height={64} className="rounded-full mb-2" />
                  )}
                  <div className="text-lg font-semibold text-gray-900">{user.name}</div>
                  <div className="text-gray-500 text-sm mb-2">{user.email}</div>
                  <div className="text-xs text-gray-400">Google ID: {user.sub}</div>
                  <div className="mt-2 px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-xs">Streak: --</div>
                </div>
                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="text-2xl font-bold text-violet-700">{analytics.totalSolved}</div>
                    <div className="text-gray-500 text-sm">Total Solved</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="text-2xl font-bold text-violet-700">{bestDay ? analytics.perDay[bestDay] : 0}</div>
                    <div className="text-gray-500 text-sm">Best Day{bestDay ? ` (${bestDay})` : ''}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="text-2xl font-bold text-violet-700">{avgPerDay}</div>
                    <div className="text-gray-500 text-sm">Avg/Day</div>
                  </div>
                </div>
              </div>

              {/* Graphs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2 bg-white rounded-lg shadow p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-violet-700 mb-4">Questions Solved (Last 7 Days)</h2>
                  {barData ? <Bar data={barData} options={barOptions} height={220} /> : <div className="text-gray-400">No data</div>}
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col items-center justify-center">
                  <h2 className="text-lg font-semibold text-violet-700 mb-4">Category Breakdown</h2>
                  {pieData ? <Pie data={pieData} options={pieOptions} width={220} height={220} /> : <div className="text-gray-400">No data</div>}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded-lg shadow p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-violet-700 mb-4">Recent Activity</h2>
                {analytics.recent && analytics.recent.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {analytics.recent.map((item, idx) => (
                      <li key={idx} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </div>
                        <div className="text-xs text-gray-400">{item.date}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-400">No recent activity</div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400">No analytics data found.</div>
          )
        ) : (
          <div className="bg-gray-50 rounded-lg shadow p-6 text-center">
            <p className="text-gray-900 text-lg">Please sign in to view your dashboard.</p>
          </div>
        )}
      </main>
    </HomeLayout>
  );
} 