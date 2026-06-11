"use client"
import { Menu, message } from "antd"
import {
  DashboardOutlined,
  FileTextOutlined,
  WalletOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import Link from "next/link";
import { useAppStore } from "@/providers/store-provider";
import { useRouter } from "next/navigation";

export default function SideBar({ mode = "inline" }: { mode?: "inline" | "vertical" }) {
  const { setUser, setToken, setIsAuthenticated } = useAppStore((state) => state);
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem("app-store");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    router.push("/");
    message.success("Logged out successfully");
  }
  return (
    <div className="bg-white flex flex-col h-full">
      <div className="h-14 bg-black text-white p-4 border-b border-gray-300 text-xl font-bold">Reviewer</div>
      <Menu mode={mode} className="flex-1 relative flex flex-col mt-8!">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="reviews" icon={<FileTextOutlined />}>
          <Link href="/reviews">Reviews</Link>
        </Menu.Item>
        <Menu.Item key="payouts" icon={<WalletOutlined />}>
          <Link href="/payouts">Payouts</Link>
        </Menu.Item>
      </Menu>
      <Menu mode={mode} className="border-t border-gray-300 mb-6!">
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined className="text-lg" />}
          className="text-red-500! text-lg font-semibold!"
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  )
}
