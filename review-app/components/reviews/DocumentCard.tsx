"use client"
import React, { useState } from "react"
import { Card, Modal } from "antd"

export default function DocumentCard({ title, src }: { title: string; src?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="mb-3" hoverable onClick={() => setOpen(true)}>
        <div className="flex items-center justify-between">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">PDF / Image</div>
        </div>
      </Card>
      <Modal open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width="90%">
        <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
          <p>Document viewer placeholder for {title}</p>
        </div>
      </Modal>
    </>
  )
}
