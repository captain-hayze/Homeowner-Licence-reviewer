"use client"
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import { useRouter } from "next/navigation"
import { ColumnsType } from "antd/lib/table";
import { fetcher } from "@/utils/axios";
import useSWR from "swr";
import dayjs from "dayjs";
import { useCurrency } from "@/hooks/useCurrency";
import { useMemo } from "react";

// completedReviewsCount
// : 
// 0
// pendingEarnings
// : 
// 0
// pendingPayouts
// : 
// 0
// recentAssignedReviews
// : 
// [{id: "309be618-6be5-432f-90f9-785ec72344e6",…}]
// totalEarnings
// : 
// 0
// totalPayouts
// : 
// 0

type dashboardStats = {
  totalPayouts: number;
  totalEarnings: number;
  pendingPayouts: number;
  pendingEarnings: number;
  completedReviewsCount: number;
};


export default function Dashboard() {
  const router = useRouter();
  const { formatCurrency } = useCurrency();
  const { data, isLoading } = useSWR("/license-review-requests/reviewer/dashboard", fetcher);

  const recentReviews: Review[] = useMemo(() => {
    return data?.data?.recentAssignedReviews || [];
  }, [data]);

  const stats: dashboardStats = useMemo(() => {
    return {
      totalPayouts: data?.data?.totalPayouts || 0,
      totalEarnings: data?.data?.totalEarnings || 0,
      pendingPayouts: data?.data?.pendingPayouts || 0,
      pendingEarnings: data?.data?.pendingEarnings || 0,
      completedReviewsCount: data?.data?.completedReviewsCount || 0,
    }
    }, [data]);

  const columns: ColumnsType<Review> = [
    {
      title: "ID",
      dataIndex: "homeOwnerProject",
      key: "id",
      render: (project: HomeOwnerProject) => project?.publicId,
    },
    {
      title: "Project Name",
      dataIndex: "homeOwnerProject",
      key: "name",
      render: (project: HomeOwnerProject) => project?.name
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: string) => (
        <Tag color={s === "COMPLETED" ? "green" : s === "IN_REVIEW" ? "orange" : "blue"}>{s}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    }
  ]
  return (
      <div className="space-y-4">
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            <Card onClick={() => router.push("/payouts")} hoverable>
              <Statistic title="Earnings" value={formatCurrency(stats.totalEarnings)} />
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={() => router.push("/payouts")} hoverable>
              <Statistic title="Pending Payouts" value={formatCurrency(stats.pendingPayouts)} />
            </Card>
          </Col>
          <Col span={8}>
            <Card onClick={() => router.push("/reviews")} hoverable>
              <Statistic title="Completed Reviews" value={stats.completedReviewsCount} />
            </Card>
          </Col>
        </Row>

        <Card title="Recent Reviews">
          <Table
            dataSource={recentReviews}
            columns={columns}
            loading={isLoading}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
  )
}
