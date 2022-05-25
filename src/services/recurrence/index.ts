import api from "@app/configs/api";
import API_SERVICES from "@app/constants/api";
import IRecurrenceEntity from "@app/features/Recurrence/data/IRecurrenceEntity";
import { TCreateRecurrenceRemote } from "@app/services/recurrence/remoteTypes/CreateRecurrenceRemote";
import { TEditCategoryRemote } from "./remoteTypes/EditCategoryRemote";

export interface IRecurrenceService {
  listRecurrencesService: () => Promise<IRecurrenceEntity[]>;
  createRecurrenceService: (data: TCreateRecurrenceRemote) => Promise<void>;
  editCategoryService: (data: TEditCategoryRemote) => Promise<void>;
  getRecurrenceService: (recurrenceId: string) => Promise<IRecurrenceEntity>;
  deleteRecurrenceService: (recurrenceId: string) => Promise<void>;
}

const listRecurrencesService = async (): Promise<IRecurrenceEntity[]> =>
  api
    .get(API_SERVICES.RECURRENCE_SERVICES.LIST_RECURRENCES)
    .then(res => res.data);

const createRecurrenceService = async (
  data: TCreateRecurrenceRemote,
): Promise<void> =>
  api
    .post(API_SERVICES.RECURRENCE_SERVICES.CREATE_RECURRENCE, data)
    .then(res => res.data);

const getRecurrenceService = async (
  recurrenceId: string,
): Promise<IRecurrenceEntity> =>
  api
    .get(API_SERVICES.RECURRENCE_SERVICES.GET_RECURRENCE(recurrenceId))
    .then(res => res.data);

const editCategoryService = async (data: TEditCategoryRemote): Promise<void> =>
  api
    .put(API_SERVICES.RECURRENCE_SERVICES.EDIT_RECURRENCE(data.id), data)
    .then(res => res.data);

const deleteRecurrenceService = async (recurrenceId: string): Promise<void> =>
  api
    .delete(API_SERVICES.RECURRENCE_SERVICES.DELETE_RECURRENCE(recurrenceId))
    .then(res => res.data);

const recurrenceService: IRecurrenceService = {
  listRecurrencesService,
  createRecurrenceService,
  getRecurrenceService,
  deleteRecurrenceService,
  editCategoryService,
};

export default recurrenceService;
