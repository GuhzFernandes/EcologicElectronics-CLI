export default interface IOrder {
    id: number;
    userId: number;
    addressId: number;
    size: string;
    paymentMethod?: string;
    orderStatus?: string;
    paymentStatus?: boolean;
    date: Date;
}
