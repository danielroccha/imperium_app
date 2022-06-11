import api from "@app/configs/api";
import { TRANSACTION_TYPE } from "@app/constants";
import API_SERVICES from "@app/constants/api";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";
import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";
import { TCreateCategorieBatchRemote } from "@app/services/category/remoteTypes/CreateCategoriesBatchRemote";
import { TEditCategoryRemote } from "@app/services/category/remoteTypes/EditCategoryRemote";

export interface ICategoryService {
  listCategoriesService: (
    type?: TRANSACTION_TYPE,
  ) => Promise<ICategoryEntity[]>;
  createCategoryService: (data: TCreateCategoryRemote) => Promise<void>;
  createCategoriesBatchService: (
    data: TCreateCategorieBatchRemote,
  ) => Promise<void>;
  editCategoryService: (data: TEditCategoryRemote) => Promise<void>;
  getCategoryService: (categoryId: string) => Promise<ICategoryEntity>;
  deleteCategoryService: (categoryId: string) => Promise<void>;
}

const listCategoriesService = async (
  type?: TRANSACTION_TYPE,
): Promise<ICategoryEntity[]> =>
  api
    .get(API_SERVICES.CATEGORY_SERVICES.LIST_CATEGORIES(type))
    .then(res => res.data);

const createCategoryService = async (
  data: TCreateCategoryRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.CATEGORY_SERVICES.CREATE_CATEGORY, data)
    .then(res => res.data);

const createCategoriesBatchService = async (
  data: TCreateCategorieBatchRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.CATEGORY_SERVICES.CREATE_CATEGORIES_BATCH, data)
    .then(res => res.data);

const getCategoryService = async (
  categoryId: string,
): Promise<ICategoryEntity> =>
  api
    .get(API_SERVICES.CATEGORY_SERVICES.GET_CATEGORY(categoryId))
    .then(res => res.data);

const editCategoryService = async (data: TEditCategoryRemote): Promise<void> =>
  api
    .put(API_SERVICES.CATEGORY_SERVICES.EDIT_CATEGORY(data.id), data)
    .then(res => res.data);

const deleteCategoryService = async (categoryId: string): Promise<void> =>
  api
    .delete(API_SERVICES.CATEGORY_SERVICES.DELETE_CATEGORY(categoryId))
    .then(res => res.data);

const categoryService: ICategoryService = {
  listCategoriesService,
  createCategoryService,
  createCategoriesBatchService,
  getCategoryService,
  deleteCategoryService,
  editCategoryService,
};

export default categoryService;
