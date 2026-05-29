"use client"
import React from "react"
import ReviewerLayout from "../../../components/layouts/ReviewerLayout"
import DocumentCard from "../../../components/reviews/DocumentCard"
import CommentList from "../../../components/reviews/CommentList"
import { Card, Row, Col } from "antd"
import { useParams } from "next/navigation"

export default function ReviewDetailPage() {
  const { id } = useParams();
  const mockComments = [
    { user: "Homeowner", text: "Please see attached drawings." },
    { user: "Arch Reviewer", text: "Please re-upload the floor plans with dimensions." },
  ];

  console.log({ id })

  return (
    <ReviewerLayout>
      <Row gutter={16}>
        <Col span={16}>
          <Card title={`Review ${id}`}>
            <div className="space-y-3">
              <DocumentCard title="Site plan" />
              <DocumentCard title="Floor plan" />
              <DocumentCard title="Elevation" />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Comments">
            <CommentList comments={mockComments} />
          </Card>
        </Col>
      </Row>
    </ReviewerLayout>
  )
}
