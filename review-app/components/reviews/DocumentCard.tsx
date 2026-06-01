"use client"
import React, { useState } from "react"
import { Card, Modal, message, Input } from "antd";
import useSWRMutation from "swr/mutation";
import { handleMutation } from "@/utils/axios";

interface DocumentCardProps extends ReviewDocument {
  reviewId: string;
  onSelect: (doc: ReviewDocument) => void;
}

export default function DocumentCard(props: DocumentCardProps) {
  const { onSelect, reviewId, ...rest } = props;
  const [note, setNote] = useState("");
  const { title } = rest;
  const [open, setOpen] = useState(false);

  const { trigger: approveDocument, isMutating } = useSWRMutation(
    "/license-user/approve-document",
    handleMutation,
  );

  
  const handleApprove = async () => {
    try {
      if (!note) {
        message.warning("Please add an approval note before approving the document.");
        return;
      }
      await approveDocument({
        licenseReviewRequestId: reviewId,
        licenseReviewPlanDocumentId: rest.id,
        approvalNote: note,
      });
      message.success("Document approved successfully");
    } catch (error) {
      console.error("Error approving document:", error);
      message.error("Failed to approve document. Please try again.");
    }
  };

  return (
    <>
      <Card className="mb-3" hoverable onClick={() => {
        setOpen(true);
        onSelect(rest);
      }}>
        <div className="flex items-center justify-between">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500" >
            PDF / Image
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          type: "primary",
          disabled: isMutating,
          loading: isMutating,
          onClick: handleApprove,
        }}
        okText="Approve"
        width="90%"
      >
        <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
          <p>Document viewer placeholder for {title}</p>
        </div>
        <div className="mt-4">
          <Input.TextArea
            placeholder="Add an approval note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
