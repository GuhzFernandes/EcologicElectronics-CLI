export default interface Order {
    id: number;
    userId: number;
    addressId: number;
    size: string;
    paymentMethod?: string;
    orderStatus?: string;
    paymentStatus?: string;
    date: Date;
}
