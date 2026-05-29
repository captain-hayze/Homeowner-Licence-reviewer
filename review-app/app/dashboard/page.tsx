"use client"
import { Card, Row, Col, Statistic } from "antd"

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-4">
        <Row gutter={16} className="mb-4">
          <Col span={8}>
            <Card>
              <Statistic title="Earnings" value={1240} prefix="$" />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Pending Payouts" value={320} prefix="$" />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Completed Reviews" value={42} />
            </Card>
          </Col>
        </Row>

        <Card title="Recent Reviews">
          <p>List of recent assigned reviews (mock)</p>
        </Card>
      </div>
    </>
  )
}
