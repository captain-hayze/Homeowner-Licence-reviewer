"use client"
import dayjs from "dayjs";
import useSWR from "swr";
import { useState, useCallback, useEffect, useMemo } from "react";
import ReviewerLayout from "../../components/layouts/ReviewerLayout";
import { Card, Table, Button, Tag, Radio, Spin, message, Skeleton } from "antd";
import AddAccountModal from "../../components/payouts/AddAccountModal";
import useSWRMutation from "swr/mutation";
import { handleMutation, fetcher } from "@/utils/axios";
import { useCurrency } from "@/hooks/useCurrency";
import { useAppStore } from "@/providers/store-provider";

const mockPayouts = [
  {
    id: 1,
    receipt: "#PAYOUT-001",
    status: "paid",
    createdAt: "2026-05-10",
    paidAt: "2026-05-12",
    amount: 200,
  },
  {
    id: 2,
    receipt: "#PAYOUT-002",
    status: "pending",
    createdAt: "2026-05-18",
    paidAt: "—",
    amount: 150,
  },
]

const defaultAccounts: PayoutAccount[] = [
  { accountName: "Main bank account", id: "1", isActive: true, bankCode: '123445',  bankName: "Zenith Bank", accountNumber: "0001294567", accountType: "bank" },
  { accountName: "Secondary account", id: "2", isActive: false, bankCode: '123445',  bankName: "Zenith Bank", accountNumber: "0001234567", accountType: "bank" },
]

const payoutColumns = [
  {
    title: 'Receipt',
    dataIndex: 'receipt',
    key: 'receipt',
    render: (value: string) => <a href={value} target="_blank" rel="noreferrer">View</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'paid' ? 'green' : 'orange'}>{status}</Tag>
    ),
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Date Paid',
    dataIndex: 'paidAt',
    key: 'paidAt',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => `$${amount}`,
  },
]

export default function PayoutsPage() {
  const { user } = useAppStore((state) => state);
  const [open, setOpen] = useState(false);
  const { formatCurrency } = useCurrency();
  const [activeAccount, setActiveAccount] = useState<PayoutAccount | null>(defaultAccounts[0]);

  const { data, isLoading } = useSWR("/license-user/all-settlement-accounts", fetcher);

  const { trigger: activateAccount, isMutating: isActivating } = useSWRMutation(
    `license-user/${activeAccount?.id}/activate-settlement-account`,
    handleMutation,
  );

  const accounts: PayoutAccount[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleActivateAccount = useCallback(async() => {
    if (!activeAccount) return;

    try {
      const res = await activateAccount();
      
      if (res) {
        message.success("Account activated successfully");
      }
    } catch (error) {
      message.error("Failed to activate account. Please try again.");
      console.error(error)
    }
  }, [activateAccount, activeAccount]);

  useEffect(() => {
    if (activeAccount && !activeAccount.isActive) {
      handleActivateAccount();
    }
  }, [activeAccount, handleActivateAccount]);

  return (
    <ReviewerLayout>
      <div className="space-y-4!">
        <Card title="Payout summary">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <div className="text-sm text-gray-500">Eligible amount</div>
              <div className="text-2xl font-semibold">{formatCurrency(320)}</div>
              <div className="text-sm text-gray-500">Next payout Date</div>
              <div className="text-2xl font-semibold">
                {dayjs().format('MMMM D, YYYY')}
              </div>
            </div>
            <div>
              <Button type="primary" onClick={() => setOpen(true)}>
                Add Account
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Payment accounts">
          <div className="grid gap-4 sm:grid-cols-2">
            {isLoading
              ? <Skeleton />
              : (<>
                {accounts.map((account) => (
                  <Card key={account.accountNumber} size="small" className="border-gray-200 shadow-sm">
                    <div className="flex items-start gap-3">
                    {activeAccount?.id === account.id && isActivating 
                      ? (<Spin className="animate-spin" />)
                      : (<Radio
                          defaultChecked={account.isActive}
                          value={account}
                          name={account.id}
                          onChange={() => setActiveAccount(account)}
                        />
                      )}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="text-base font-semibold">{account.accountName}</div>
                        <div className="text-sm text-gray-500">{account.bankName}</div>
                        <div className="text-sm text-gray-500">{account.accountNumber}</div>
                        {/* <Tag color={account.accountType === "bank" ? "blue" : "green"}>
                          {account.accountType === "bank" ? "Bank" : "Mobile wallet"}
                        </Tag> */}
                      </div>
                    </div>
                  </Card>
                ))}
              </>)}
          </div>
          {!isLoading && accounts.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No payout accounts found. Please add an account to receive payouts.
            </div>
          )}
        </Card>

        <Card title="Past payout requests">
          <Table
            dataSource={mockPayouts}
            columns={payoutColumns}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>

      <AddAccountModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </ReviewerLayout>
  )
}
