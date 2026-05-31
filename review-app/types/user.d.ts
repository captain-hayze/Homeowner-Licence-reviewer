type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
    status: string;
    available: boolean;
    licenseUserType: 'APPR' | 'STRUCT' | 'ARCH' | 'ADMIN';
}