import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TEMAIL_TEMPLATE } from ".";

type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  ChangePassword: { email: string };
  VerificationCode: {
    email: string;
    title: string;
    emailType: TEMAIL_TEMPLATE;
    callback?: () => void;
  };

  HomeStack: undefined;
  BalanceInfo: undefined;
  NoConnection: undefined;

  CategoryStack: undefined;
  Category: undefined;
  EditCategory: { categoryId: string };
  CreateCategory: undefined;
  CategorySugestion: undefined;
  TransactionGroupByCategory: {
    transactionType: TRANSACTION_TYPE;
    monthId: number;
    year: number;
  };
  SelectCategory: {
    onSelectCategory: (category: ICategoryModel) => void;
    type: TRANSACTION_TYPE;
  };

  CreateTransaction: undefined;
  EditTransaction: { transactionId: string };

  RecurrenceStack: undefined;
  CreateRecurrence: undefined;
  EditRecurrence: { recurrenceId: string };

  ProfileStack: undefined;
  CurrencyList: undefined;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

export default RootStackNavigation;
