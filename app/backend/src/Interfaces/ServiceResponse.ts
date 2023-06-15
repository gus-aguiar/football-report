export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseCreated<T> = {
  status: 'CREATED',
  data: T
};

export type ServiceResponseEqualTeams = {
  status: 'EQUAL_TEAMS',
  data: ServiceMessage
};

export type ServiceResponse<T> =
ServiceResponseError |
ServiceResponseSuccess<T> |
ServiceResponseCreated<T> |
ServiceResponseEqualTeams;
