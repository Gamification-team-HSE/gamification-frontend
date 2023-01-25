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
  Upload: any;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  total: UsersTotalInfo;
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  BanUser?: Maybe<Scalars['Any']>;
  CreateStat?: Maybe<Scalars['Any']>;
  CreateUser?: Maybe<Scalars['Any']>;
  DeleteUser?: Maybe<Scalars['Any']>;
  RecoverUser?: Maybe<Scalars['Any']>;
  SendCode?: Maybe<Scalars['Any']>;
  UpdateUser?: Maybe<Scalars['Any']>;
  VerifyCode: Scalars['String'];
};


export type MutationBanUserArgs = {
  id: Scalars['Int'];
};


export type MutationCreateStatArgs = {
  stat: NewStat;
};


export type MutationCreateUserArgs = {
  user: NewUser;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationRecoverUserArgs = {
  id: Scalars['Int'];
};


export type MutationSendCodeArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user?: InputMaybe<UpdateUser>;
};


export type MutationVerifyCodeArgs = {
  code: Scalars['Int'];
  email: Scalars['String'];
};

export type NewStat = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  period?: InputMaybe<Scalars['String']>;
  seq_period?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['Time']>;
};

export type NewUser = {
  email: Scalars['String'];
  foreign_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role: Role;
};

export type Pagination = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  GetCurrentUser: User;
  GetUser: User;
  GetUsers: GetUsersResponse;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<Pagination>;
};

export enum Role {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  User = 'user'
}

export type Stat = {
  __typename?: 'Stat';
  created_at: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  period: Scalars['String'];
  seq_period?: Maybe<Scalars['String']>;
  start_at: Scalars['Time'];
};

export type UpdateUser = {
  avatar?: InputMaybe<Scalars['Upload']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

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

export type UserFilter = {
  active?: InputMaybe<Scalars['Boolean']>;
  admins?: InputMaybe<Scalars['Boolean']>;
  banned?: InputMaybe<Scalars['Boolean']>;
};

export type UsersTotalInfo = {
  __typename?: 'UsersTotalInfo';
  active: Scalars['Int'];
  admins: Scalars['Int'];
  banned: Scalars['Int'];
};

export type BanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BanUserMutation = { __typename?: 'Mutation', BanUser?: any | null | undefined };

export type CreateUserMutationVariables = Exact<{
  user: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser?: any | null | undefined };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', DeleteUser?: any | null | undefined };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', GetCurrentUser: { __typename?: 'User', email: string, id: number, role: Role, avatar?: string | null | undefined, name?: string | null | undefined } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', GetUser: { __typename?: 'User', email: string, name?: string | null | undefined, created_at: any, id: number } };

export type GetUsersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  filter?: InputMaybe<UserFilter>;
}>;


export type GetUsersQuery = { __typename?: 'Query', GetUsers: { __typename?: 'GetUsersResponse', total: { __typename?: 'UsersTotalInfo', admins: number, active: number, banned: number }, users: Array<{ __typename?: 'User', id: number, foreign_id?: string | null | undefined, email: string, name?: string | null | undefined, created_at: any, deleted_at?: any | null | undefined, role: Role, avatar?: string | null | undefined }> } };

export type RecoverUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RecoverUserMutation = { __typename?: 'Mutation', RecoverUser?: any | null | undefined };

export type SendCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendCodeMutation = { __typename?: 'Mutation', SendCode?: any | null | undefined };

export type UpdateUserMutationVariables = Exact<{
  user?: InputMaybe<UpdateUser>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', UpdateUser?: any | null | undefined };

export type VerifyCodeMutationVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['Int'];
}>;


export type VerifyCodeMutation = { __typename?: 'Mutation', VerifyCode: string };


export const BanUserDocument = gql`
    mutation BanUser($id: Int!) {
  BanUser(id: $id)
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($user: NewUser!) {
  CreateUser(user: $user)
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  DeleteUser(id: $id)
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
    query GetUsers($pagination: Pagination, $filter: UserFilter) {
  GetUsers(pagination: $pagination, filter: $filter) {
    total {
      admins
      active
      banned
    }
    users {
      id
      foreign_id
      email
      name
      created_at
      deleted_at
      role
      avatar
    }
  }
}
    `;
export const RecoverUserDocument = gql`
    mutation RecoverUser($id: Int!) {
  RecoverUser(id: $id)
}
    `;
export const SendCodeDocument = gql`
    mutation SendCode($email: String!) {
  SendCode(email: $email)
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UpdateUser) {
  UpdateUser(user: $user)
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
    BanUser(variables: BanUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BanUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<BanUserMutation>(BanUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BanUser', 'mutation');
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUser', 'mutation');
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
    RecoverUser(variables: RecoverUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecoverUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecoverUserMutation>(RecoverUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RecoverUser', 'mutation');
    },
    SendCode(variables: SendCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendCodeMutation>(SendCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SendCode', 'mutation');
    },
    UpdateUser(variables?: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUser', 'mutation');
    },
    VerifyCode(variables: VerifyCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyCodeMutation>(VerifyCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VerifyCode', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;