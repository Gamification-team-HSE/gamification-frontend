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
  Any: any;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateUser?: Maybe<Scalars['Any']>;
  SendCode?: Maybe<Scalars['Any']>;
  VerifyCode: Scalars['String'];
};


export type MutationCreateUserArgs = {
  user: NewUser;
};


export type MutationSendCodeArgs = {
  email: Scalars['String'];
};


export type MutationVerifyCodeArgs = {
  code: Scalars['Int'];
  email: Scalars['String'];
};

export type NewUser = {
  Name?: InputMaybe<Scalars['String']>;
  Role: Role;
  email: Scalars['String'];
  foreign_id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  GetCurrentUser: User;
  GetUser: User;
  GetUsers: Array<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  User = 'user'
}

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['Time'];
  deleted_at?: Maybe<Scalars['Time']>;
  email: Scalars['String'];
  foreign_id?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  role: Role;
};

export type CreateUserMutationVariables = Exact<{
  user: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser?: any | null | undefined };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', GetCurrentUser: { __typename?: 'User', email: string, id: number, role: Role, avatar?: string | null | undefined, name?: string | null | undefined } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', GetUser: { __typename?: 'User', email: string, name?: string | null | undefined, created_at: any, id: number } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', GetUsers: Array<{ __typename?: 'User', email: string, name?: string | null | undefined, role: Role, id: number, avatar?: string | null | undefined, created_at: any, deleted_at?: any | null | undefined }> };

export type SendCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendCodeMutation = { __typename?: 'Mutation', SendCode?: any | null | undefined };

export type VerifyCodeMutationVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['Int'];
}>;


export type VerifyCodeMutation = { __typename?: 'Mutation', VerifyCode: string };


export const CreateUserDocument = gql`
    mutation CreateUser($user: NewUser!) {
  CreateUser(user: $user)
}
    `;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  GetCurrentUser {
    email
    id
    role
    avatar
    name
  }
}
    `;
export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  GetUser(id: $id) {
    email
    name
    created_at
    id
  }
}
    `;
export const GetUsersDocument = gql`
    query GetUsers {
  GetUsers {
    email
    name
    role
    id
    avatar
    created_at
    deleted_at
  }
}
    `;
export const SendCodeDocument = gql`
    mutation SendCode($email: String!) {
  SendCode(email: $email)
}
    `;
export const VerifyCodeDocument = gql`
    mutation VerifyCode($email: String!, $code: Int!) {
  VerifyCode(email: $email, code: $code)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    GetCurrentUser(variables?: GetCurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentUserQuery>(GetCurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentUser', 'query');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    },
    GetUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsers', 'query');
    },
    SendCode(variables: SendCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendCodeMutation>(SendCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SendCode', 'mutation');
    },
    VerifyCode(variables: VerifyCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyCodeMutation>(VerifyCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VerifyCode', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;