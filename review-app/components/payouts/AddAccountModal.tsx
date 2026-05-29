"use client"
import React from "react"
import { Modal, Form, Input, Radio } from "antd"

export type PayoutAccount = {
  name: string
  bankName: string
  accountNumber: string
  accountType: string
}

export default function AddAccountModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (account: PayoutAccount) => void
}) {
  const [form] = Form.useForm<PayoutAccount>()

  const handleOk = async () => {
    const values = await form.validateFields()
    onSave(values)
    form.resetFields()
  }

  return (
    <Modal
      title="Add payout account"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save account"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Account holder"
          name="name"
          rules={[{ required: true, message: "Enter an account name" }]}
        >
          <Input placeholder="e.g. Main withdrawal account" />
        </Form.Item>
        <Form.Item
          label="Bank name"
          name="bankName"
          rules={[{ required: true, message: "Enter bank name" }]}
        >
          <Input placeholder="e.g. Zenith Bank" />
        </Form.Item>
        <Form.Item
          label="Account number"
          name="accountNumber"
          rules={[{ required: true, message: "Enter account number" }]}
        >
          <Input placeholder="0001234567" />
        </Form.Item>
        <Form.Item
          label="Account type"
          name="accountType"
          rules={[{ required: true, message: "Select account type" }]}
        >
          <Radio.Group>
            <Radio value="bank">Bank account</Radio>
            <Radio value="mobile">Mobile wallet</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
