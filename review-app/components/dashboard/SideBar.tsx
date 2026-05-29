"use client"
import React from "react"
import { Menu } from "antd"
import {
  DashboardOutlined,
  FileTextOutlined,
  WalletOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import Link from "next/link"

export default function SideBar({ mode = "inline" }: { mode?: "inline" | "vertical" }) {
  return (
    <div className="bg-white flex flex-col h-full">
      <div className="h-14 bg-black p-4 border-b text-xl font-bold">Reviewer</div>
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
      <Menu mode={mode} className="border-t mb-6!">
        <Menu.Item key="logout" icon={<LogoutOutlined />} className="text-red-500! text-lg font-semibold!">
            <Link href="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
