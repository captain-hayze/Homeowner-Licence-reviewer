"use client"
import React from "react"
import ReviewerLayout from "../../components/layouts/ReviewerLayout"
import { Tabs, Table, Tag } from "antd"
import { useRouter } from "next/navigation"
import { ColumnsType } from "antd/lib/table";

const data = new Array(8).fill(0).map((_, i) => ({
  key: i,
  id: `REV-${1000 + i}`,
  address: `Property ${i + 1}`,
  status: i % 3 === 0 ? "in-review" : i % 3 === 1 ? "requested" : "completed",
}))

export default function ReviewsPage() {
  const router = useRouter();
  const columns: ColumnsType<Review> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: string) => (
        <Tag color={s === "completed" ? "green" : s === "requested" ? "orange" : "blue"}>{s}</Tag>
      ),
    },
  ]

  const onRowClick = (record: Review) => {
    router.push(`/reviews/${record.id}`);
  }

  return (
    <ReviewerLayout>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="All" key="1">
          <Table
            columns={columns}
            rowClassName="cursor-pointer"
            dataSource={data}
            onRow={(data) => {
              return {
                onClick: () => {
                  onRowClick(data);
                },
              };
            }}
        />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Assigned" key="2">
          <Table
            rowClassName="cursor-pointer"
            columns={columns}
            dataSource={data.filter((d) => d.key % 2 === 0)}
            onRow={(data) => {
              return {
                onClick: () => {
                  onRowClick(data);
                },
              };
            }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Requested" key="3">
          <Table
            rowClassName="cursor-pointer"
            columns={columns}
            dataSource={data.filter((d) => d.status === "requested")}
            onRow={(data) => {
              return {
                onClick: () => {
                  onRowClick(data);
                },
              };
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </ReviewerLayout>
  )
}
