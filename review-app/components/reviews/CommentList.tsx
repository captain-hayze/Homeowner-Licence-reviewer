"use client"
import { Card, Avatar, Input, Button, message } from "antd";
import useSWRMutation from "swr/mutation";
import { handleMutation } from "@/utils/axios";
import React from "react";

interface CommentListProps {
  documentId: string;
  reviewId: string;
  comments: ReviewComment[];
}

export default function CommentList({ documentId, reviewId, comments = [] }: CommentListProps) {
  const [commentText, setCommentText] = React.useState("");

  const { trigger: addComment, isMutating } = useSWRMutation(
    "/license-user/add-comment",
    handleMutation,
  );

  const handleSendComment = async () => {
    if (!commentText) return;
    try {
      await addComment({
        licenseReviewRequestId: reviewId,
        licenseReviewPlanDocumentId: documentId,
        remark: commentText,
      });
      setCommentText("");
      message.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Failed to add comment. Please try again.");
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {comments.map((item, index) => (
          <Card key={index} size="small" className="border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <Avatar>{item.user?.[0] || "?"}</Avatar>
              <div>
                <div className="font-semibold">{item.user}</div>
                <div className="text-sm text-gray-600">{item.text}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Input.TextArea
          placeholder="Add a comment or request re-upload"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="mt-2 text-right">
          <Button
            type="primary"
            disabled={isMutating}
            loading={isMutating}
            onClick={handleSendComment}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
