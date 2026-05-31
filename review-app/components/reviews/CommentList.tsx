"use client"
import React from "react"
import { Card, Avatar, Input, Button } from "antd"

export default function CommentList({ comments = [] }: { comments?: Array<any> }) {
  return (
    <div>
      <div className="space-y-4">
        {comments.map((item: any, index: number) => (
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
        <Input.TextArea placeholder="Add a comment or request re-upload" rows={3} />
        <div className="mt-2 text-right">
          <Button type="primary">Send</Button>
        </div>
      </div>
    </div>
  )
}
