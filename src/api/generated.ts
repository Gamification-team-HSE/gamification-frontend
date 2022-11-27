import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateUser: User;
};


export type MutationCreateUserArgs = {
  user: NewUser;
};

export type NewUser = {
  email: Scalars['String'];
  foreign_id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  GetUser: User;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type User = {
  __typename?: 'User';
  created_at: Scalars['Time'];
  deleted_at?: Maybe<Scalars['Time']>;
  email: Scalars['String'];
  foreign_id: Scalars['Int'];
  id: Scalars['Int'];
  role: Role;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', GetUser: { __typename?: 'User', email: string, created_at: any, id: number } };


export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  GetUser(id: $id) {
    email
    created_at
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;