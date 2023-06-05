export default interface ICreditcard {
    id: number;
    userId: number;
    name?: string;
    number?: number;
    expire?: string;
    cvv?: number;
}
