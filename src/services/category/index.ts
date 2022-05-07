import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import { ICategoryEntity } from "@app/features/Category/data/ICategoryEntity";
import { TCreateCategoryRemote } from "@app/services/Category/remoteTypes/CreateCategoryRemote";
import { TEditCategoryRemote } from "./remoteTypes/EditCategoryRemote";

export interface ICategoryService {
  listCategoriesService: () => Promise<ICategoryEntity[]>;
  createCategoryService: (data: TCreateCategoryRemote) => Promise<void>;
  editCategoryService: (data: TEditCategoryRemote) => Promise<void>;
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
  getCategoryService,
  deleteCategoryService,
  editCategoryService,
};

export default categoryService;
