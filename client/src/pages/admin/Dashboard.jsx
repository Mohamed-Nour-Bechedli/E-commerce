import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import { Users, Package, ShoppingCart, BarChart3, DollarSign } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user || user.role !== "admin") {
          setError("Access denied: Admins only.");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];
  const getStatusCount = (status) => stats.statusStats.find((s) => s._id === status)?.count || 0;
  const revenueDiffPercent = stats.previous30DaysRevenue
    ? (((stats.current30DaysRevenue - stats.previous30DaysRevenue) / stats.previous30DaysRevenue) * 100).toFixed(1)
    : 100;

  // Format monthly revenue for bar chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyRevenueData = stats.monthlyRevenue.map((m) => ({
    month: `${monthNames[m._id.month - 1]} ${m._id.year}`,
    revenue: m.total,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <Users className="text-blue-600" size={30} />
          <div><p className="text-gray-500 text-sm">Total Users</p><p className="text-2xl font-bold">{stats.totalUsers}</p></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <Package className="text-green-600" size={30} />
          <div><p className="text-gray-500 text-sm">Total Products</p><p className="text-2xl font-bold">{stats.totalProducts}</p></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <ShoppingCart className="text-purple-600" size={30} />
          <div><p className="text-gray-500 text-sm">Total Orders</p><p className="text-2xl font-bold">{stats.totalOrders}</p></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <BarChart3 className="text-yellow-600" size={30} />
          <div><p className="text-gray-500 text-sm">Delivered Orders</p><p className="text-2xl font-bold">{getStatusCount("Delivered")}</p></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <DollarSign className="text-green-700" size={30} />
          <div><p className="text-gray-500 text-sm">Total Revenue</p><p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p></div>
        </div>
      </div>

      {/* Revenue Comparison & Yearly Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Revenue Last 30 Days</h2>
          <p className="text-2xl font-bold text-green-600">${stats.current30DaysRevenue.toFixed(2)}</p>
          <p className={`text-sm ${revenueDiffPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
            {revenueDiffPercent >= 0 ? "▲" : "▼"} {Math.abs(revenueDiffPercent)}% vs previous 30 days
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Revenue by Year</h2>
          {stats.yearlyRevenue.length > 0 ? (
            <ul className="space-y-1">
              {stats.yearlyRevenue.map((y) => (
                <li key={y._id.year} className="flex justify-between">
                  <span>{y._id.year}</span>
                  <span className="font-semibold">${y.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : <p>No yearly data available.</p>}
        </div>
      </div>

      {/* Monthly Revenue Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">Monthly Revenue (Last 12 months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart, Status Cards, Recent Orders Table (same as before) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.statusStats}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={(entry) => `${entry._id} (${entry.count})`}
              >
                {stats.statusStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Order Status Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.statusStats.map((s, index) => (
              <div
                key={s._id}
                className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm"
                style={{
                  backgroundColor: `${COLORS[index % COLORS.length]}20`,
                  border: `1px solid ${COLORS[index % COLORS.length]}`,
                }}
              >
                <p className="text-gray-700 font-medium">{s._id}</p>
                <p className="text-2xl font-bold mt-2" style={{ color: COLORS[index % COLORS.length] }}>
                  {s.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Recent Orders</h2>
        {stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Total ($)</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-3 border text-gray-700">{order._id}</td>
                    <td className="p-3 border">{order.customerName}</td>
                    <td className="p-3 border font-semibold text-green-600">${order.total.toFixed(2)}</td>
                    <td className="p-3 border">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="text-center text-gray-500">No recent orders available.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
