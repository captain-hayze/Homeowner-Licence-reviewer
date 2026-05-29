"use client"
import React from "react"
import { List, Avatar, Input, Button } from "antd"

export default function CommentList({ comments = [] }: { comments?: Array<any> }) {
  return (
    <div>
      <List
        dataSource={comments}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar>{item.user[0]}</Avatar>} title={item.user} description={item.text} />
          </List.Item>
        )}
      />
      <div className="mt-2">
        <Input.TextArea placeholder="Add a comment or request re-upload" rows={3} />
        <div className="mt-2 text-right">
          <Button type="primary">Send</Button>
        </div>
      </div>
    </div>
  )
}
