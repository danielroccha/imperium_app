import { TRANSACTION_TYPE } from "@app/constants";
import { ICategoryModel } from "@app/features/Category/domain/models/ICategoryModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Auth: undefined;
  CreateAccount: undefined;

  HomeStack: undefined;
  BalanceInfo: undefined;

  CategoryStack: undefined;
  Category: undefined;
  EditCategory: { categoryId: string };
  CreateCategory: undefined;
  CategorySugestion: undefined;
  SelectCategory: {
    onSelectCategory: (category: ICategoryModel) => void;
    type: TRANSACTION_TYPE;
  };

  CreateTransaction: undefined;
  EditTransaction: { transactionId: string };

  RecurrenceStack: undefined;
  CreateRecurrence: undefined;
  EditRecurrence: { recurrenceId: string };

  Profile: undefined;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

export default RootStackNavigation;
