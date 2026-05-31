"use client"
import useSWRMutation from "swr/mutation";
import { Form, Input, Button, message } from "antd"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { handleMutation } from "@/utils/axios";
import UploadComponent from "@/components/ui/Upload";
import { useRouter } from "next/navigation";

type Document = {
  name: string;
  url: string;
}

type OnboardingPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  documents: Document[];
}

export default function Onboarding() {
  const [form] = Form.useForm<OnboardingPayload>();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    "license-user/complete-onboarding",
    handleMutation
  );

	// initial data provided by the user (show only the first document initially)
	const initialPayload = {
		// email: "faxixo1140@noyavip.com",
		// password: "123456",
		// documents: [
		// 	{
		// 		name: "Practicing License",
		// 		url: "",
		// 	},
		// ],
	}

	const onFinish = async (values: OnboardingPayload) => {
	  if (!values) return;

	  const payload = {
		email: values.email,
		password: values.password,
		documents: values.documents,
	  }

	  try {
	    const res = await trigger(payload);
	  
	  if (res) {
		message.success("Onboarding completed successfully");
		router.push("/"); // Redirect to login after successful onboarding
	  }
	  } catch (error) {
	   console.error(error);
	   message.error("Failed to complete onboarding. Please try again.");
	  }
	}

	return (
		<div className="p-6 max-w-lg w-full mx-auto">
			<h2 className="text-2xl text-gray-950 font-semibold mb-4">Complete onboarding</h2>
			<Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialPayload}>
				<Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}> 
					<Input placeholder="Email" />
				</Form.Item>

				<Form.Item name="password" label="Set Password" rules={[{ required: true, message: "Please set a password" }]}> 
					<Input.Password placeholder="Choose a strong password" />
				</Form.Item>

				<Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: "Please confirm your password" }, ({ getFieldValue }) => ({
					validator(_, value) {
						if (!value || getFieldValue('password') === value) {
							return Promise.resolve();
						}
						return Promise.reject(new Error('Passwords do not match'));
					}
				})]}> 
					<Input.Password placeholder="Confirm your password" />
				</Form.Item>

				<Form.Item label="Documents">
					<Form.List name="documents">
						{(fields, { add, remove }) => (
							<div className="space-y-4!">
								{fields.map((field, idx) => (
									<div key={`${field.name}-${idx}`} className="flex items-start gap-2">
										<div className="flex-1 flex flex-col">
											<Form.Item
												{...field}
												name={[field.name, 'name']}
												// fieldKey={[field.fieldKey, 'name']}
												rules={[{ required: true, message: 'Please enter a document title' }]}
												label="Document title"
											>
												<Input placeholder="Document title" />
											</Form.Item>

											<Form.Item
											  {...field}
											  name={[field.name, 'url']}
											  label="Upload document"
											  rules={[{ required: true, message: 'Please upload a document' }]}
										    >
											  <UploadComponent />
											</Form.Item>
										</div>
										<MinusCircleOutlined onClick={() => remove(field.name)} className="text-red-600!" />
									</div>
								))}

								<Form.Item>
									<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
										Add Document
									</Button>
								</Form.Item>
							</div>
						)}
					</Form.List>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						disabled={isMutating}
						loading={isMutating}
					>
						Finish onboarding
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
