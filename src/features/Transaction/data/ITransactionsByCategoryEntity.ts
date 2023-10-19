export default interface ITransactionByCategoryEntity {
  id: string;
  name: string;
  color: string;
  icon: string;
  value: number;
  categoryLimit?: number;
}
