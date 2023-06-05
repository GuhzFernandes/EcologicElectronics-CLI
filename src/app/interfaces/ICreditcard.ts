export default interface Creditcard {
    id: number;
    userId: number;
    name?: string;
    number?: number;
    expire?: Date;
    cvv?: number;
}
