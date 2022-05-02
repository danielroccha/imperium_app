import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";
import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";

export interface ICategoryService {
  listCategoriesService: () => Promise<ICategoryEntity[]>;
  createCategoryService: (data: TCreateCategoryRemote) => Promise<void>;
  editCategoryService: (categoryId: string) => Promise<void>;
  getCategoryService: (categoryId: string) => Promise<ICategoryEntity>;
  deleteCategoryService: (categoryId: string) => Promise<void>;
}

const listCategoriesService = async (): Promise<ICategoryEntity[]> =>
  api.get(API_SERVICES.CATEGORY_SERVICES.LIST_CATEGORIES).then(res => res.data);

const createCategoryService = async (
  data: TCreateCategoryRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.CATEGORY_SERVICES.CREATE_CATEGORY, data)
    .then(res => res.data);

const getCategoryService = async (
  categoryId: string,
): Promise<ICategoryEntity> =>
  api
    .get(API_SERVICES.CATEGORY_SERVICES.GET_CATEGORY(categoryId))
    .then(res => res.data);

const deleteCategoryService = async (categoryId: string): Promise<void> =>
  api
    .delete(API_SERVICES.CATEGORY_SERVICES.DELETE_CATEGORY(categoryId))
    .then(res => res.data);

const categoryService: ICategoryService = {
  listCategoriesService,
  createCategoryService,
  getCategoryService,
  deleteCategoryService,
};

export default categoryService;
