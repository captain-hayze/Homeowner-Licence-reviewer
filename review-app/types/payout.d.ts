type PayoutAccount = {
  id: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
}

type Bank = {
  name: string;
  code: string;
}