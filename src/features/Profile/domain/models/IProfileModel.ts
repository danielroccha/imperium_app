export default interface IProfileModel {
  id: string;
  name: string;
  email: string;
  isFirstLogin: boolean;
  currency?: string;
}
