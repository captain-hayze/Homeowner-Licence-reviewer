"use client"
import React, { useState } from "react"
import ReviewerLayout from "../../components/layouts/ReviewerLayout"
import { Card, List, Button, Tag } from "antd"
import AddAccountModal, { PayoutAccount } from "../../components/payouts/AddAccountModal"

const mockPayouts = [
  { id: 1, amount: 200, status: "paid" },
  { id: 2, amount: 150, status: "pending" },
]

const defaultAccounts: PayoutAccount[] = [
  { name: "Main bank account", bankName: "Zenith Bank", accountNumber: "0001234567", accountType: "bank" },
]

export default function PayoutsPage() {
  const [open, setOpen] = useState(false)
  const [accounts, setAccounts] = useState<PayoutAccount[]>(defaultAccounts)

  const handleSaveAccount = (account: PayoutAccount) => {
    setAccounts((current) => [account, ...current])
    setOpen(false)
  }

  return (
    <ReviewerLayout>
      <div className="space-y-4">
        <Card title="Payout summary">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <div className="text-sm text-gray-500">Eligible amount</div>
              <div className="text-2xl font-semibold">$320</div>
            </div>
            <div>
              <Button type="primary" onClick={() => setOpen(true)}>
                Add Account
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Payment accounts">
          <List
            dataSource={accounts}
            renderItem={(account) => (
              <List.Item>
                <div className="w-full flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-gray-500">
                      {account.bankName} · {account.accountNumber}
                    </div>
                  </div>
                  <Tag
                    variant="outlined"
                    color={account.accountType === "bank" ? "blue" : "green"}
                  >
                    <span>
                      {account.accountType === "bank" ? "Bank" : "Mobile wallet"}
                    </span>
                  </Tag>
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Card title="Past payout requests">
          <List
            dataSource={mockPayouts}
            renderItem={(it) => (
              <List.Item>
                <div className="w-full flex justify-between">
                  <div>#{it.id} — ${it.amount}</div>
                  <Tag variant="outlined" color={it.status === "paid" ? "green" : "orange"}>
                    {it.status}
                  </Tag>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>

      <AddAccountModal open={open} onClose={() => setOpen(false)} onSave={handleSaveAccount} />
    </ReviewerLayout>
  )
}
