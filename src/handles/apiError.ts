import { AxiosResponse } from "axios";

import I18n from "@app/languages/I18n";

import showNotification from "@app/components/organisms/CustomNotification";
import { APPLICATION_ERROR_CODE } from "@app/constants/apiError";
import Util from "@app/util";

export type ApplicationDataError = {
  error: {
    code: APPLICATION_ERROR_CODE;
    description: string;
  };
};

type ErrorVisualization = "ALERT" | "NOTIFICATION";

export type ApplicationError = {
  response: AxiosResponse<ApplicationDataError>;
};

const handleError = (
  error: unknown,
  errorVisualizationType: ErrorVisualization = "NOTIFICATION",
) => {
  let errorMessage = {
    title: I18n.t(`common.ooops`),
    description: I18n.t(`common.something_went_wrong`),
  };

  if (isApplicationError(error)) {
    const dataError = error as ApplicationError;
    errorMessage = {
      ...errorMessage,
      title: I18n.t(`common.ooops`),
      description: I18n.t(
        `error_messages.${dataError.response.data.error.code}`,
      ),
    };
  }

  errorVisualizationType === "NOTIFICATION"
    ? showNotification(errorMessage.title, errorMessage.description, "error")
    : Util.showAlertError(errorMessage.title, errorMessage.description);
};

const isApplicationError = (error: unknown): boolean => {
  const dataError = error as ApplicationError;

  const data = dataError.response.data;

  return (
    !!(data as ApplicationDataError).error.description &&
    !!(data as ApplicationDataError).error.code
  );
};

const handleApplicationError = {
  isApplicationError,
  handleError,
};

export default handleApplicationError;
