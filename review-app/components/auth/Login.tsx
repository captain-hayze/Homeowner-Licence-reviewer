"use client"
import React from "react"
import { Form, Input, Button } from "antd"

export default function Login({ onLogin }: { onLogin?: () => void }) {
  const [form] = Form.useForm()

  const handleFinish = (values: Record<string, unknown>) => {
    console.log("login", values)
    if (onLogin) onLogin()
  }

  return (
    <div className="p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl text-gray-950 font-semibold mb-4">Sign in</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
