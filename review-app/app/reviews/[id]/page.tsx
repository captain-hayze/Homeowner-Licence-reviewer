"use client"
import React from "react"
import ReviewerLayout from "../../../components/layouts/ReviewerLayout"
import DocumentCard from "../../../components/reviews/DocumentCard"
import CommentList from "../../../components/reviews/CommentList"
import { Card, Row, Col, Skeleton } from "antd"
import { useParams } from "next/navigation";
import { fetcher } from "@/utils/axios";
import useSWR from "swr";

export default function ReviewDetailPage() {
  const { id } = useParams();
  const [selectedDocument, setSelectedDocument] = React.useState<ReviewDocument | null>(null);

  const { data, isLoading } = useSWR(`/license-review-user/${id}/assigned-review-request`, fetcher);

  const review: Review = React.useMemo(() => {
    return data?.data || undefined;
  }, [data]);

  return (
    <ReviewerLayout>
      <Row gutter={16}>
        <Col span={selectedDocument ? 16 : 24}>
          <Card title={`Review ${review?.homeOwnerProject?.publicId || ""}`}>
            {isLoading
              ? <Skeleton />
              : (<>
                <div className="space-y-3">
                  {review?.documents.map((doc, idx) => (
                    <DocumentCard
                      key={idx}
                      onSelect={setSelectedDocument}
                      reviewId={review.id}
                      {...doc}
                    />
                  ))}
                </div>
              </>)}
            {!isLoading && !review && (
              <p className="text-center text-gray-500 py-10">
                No review data found.
              </p>
            )}
          </Card>
        </Col>
        {selectedDocument && (
          <Col span={8}>
            <Card title="Comments">
              <CommentList
                documentId={selectedDocument?.id}
                reviewId={review?.id}
                comments={selectedDocument.comments}
              />
            </Card>
          </Col>
        )}
      </Row>
    </ReviewerLayout>
  )
}
