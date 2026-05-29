"use client"
import React from "react"
import { Form, Input, Button, Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload;

export default function Onboarding({ onComplete }: { onComplete?: () => void }) {
	const [form] = Form.useForm()

	const props = {
		multiple: true,
		beforeUpload: () => {
			// prevent auto upload
			return false
		},
		onChange: () => {
			// noop for now
		},
	}

	const onFinish = () => {
		message.success("Onboarding completed (mock)")
		if (onComplete) onComplete()
	}

	return (
		<div className="p-6 max-w-lg w-full mx-auto">
			<h2 className="text-2xl text-gray-950 font-semibold mb-4">Complete onboarding</h2>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Form.Item name="password" label="Set Password" rules={[{ required: true, message: "Please set a password" }]}> 
					<Input.Password placeholder="Choose a strong password" />
				</Form.Item>
				<Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: "Please confirm your password" }]}> 
					<Input.Password placeholder="Confirm your password" />
				</Form.Item>
				<Form.Item name="credentials" label="Upload credentials" rules={[{ required: true, message: "Please upload your credentials" }]}>
					<Dragger {...props} className="w-full">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
					</Dragger>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block>
						Finish onboarding
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
