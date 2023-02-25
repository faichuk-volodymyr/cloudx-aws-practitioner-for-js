import { DEFAULT_HEADERS, ERROR_MESSAGES, STATUS_CODES } from "../constants";

export const errorResponse = ({
  error,
  statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
}) => ({
  statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify({
    message: error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG,
  }),
});

export const successResponse = ({
  body,
  statusCode = STATUS_CODES.OK
}) => ({
  statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify(body),
});