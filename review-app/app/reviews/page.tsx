"use client"
import React from "react"
import ReviewerLayout from "../../components/layouts/ReviewerLayout"
import { Tabs, Table, Tag } from "antd"
import { useRouter } from "next/navigation"
import { ColumnsType } from "antd/lib/table";
import { fetcher, handleMutation } from "@/utils/axios";
import useSWR from "swr";

export default function ReviewsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("1");

  const { data, isLoading } = useSWR("/license-review-requests/my-requests", fetcher);

  const reviews: Review[] = React.useMemo(() => {
    return data?.data || [];
  }, [data]);

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
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="All" key="1">
          <Table
            columns={columns}
            rowClassName="cursor-pointer"
            dataSource={reviews}
            loading={isLoading}
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
            loading={isLoading}
            dataSource={reviews}
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
            loading={isLoading}
            dataSource={reviews}
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
