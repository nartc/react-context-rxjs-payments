import React from 'react';

export type ContextType<TState, TReducer extends React.Reducer<TState, any>> = {
  state: TState;
  dispatcher: React.Dispatch<React.ReducerAction<TReducer>>;
};

export type ContextActions<TActionTypes, TState> = {
  type: TActionTypes;
  payload?: Partial<TState>;
};

export enum ApiResponseStatus {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export interface ApiResponse<T = any> {
  data: T;
  status: ApiResponseStatus;
  error: string;
}
