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

export type Achievement = {
  __typename?: 'Achievement';
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  end_at?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  rules: Rules;
};

export enum Comparison {
  Equals = 'Equals',
  GreaterThan = 'GreaterThan',
  InvalidComparison = 'InvalidComparison',
  LesserThan = 'LesserThan',
  NotEquals = 'NotEquals'
}

export enum ConnectionOperator {
  And = 'And',
  InvalidConnectionOperator = 'InvalidConnectionOperator',
  Or = 'Or'
}

export type CreateAchievement = {
  description?: InputMaybe<Scalars['String']>;
  end_at?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
  rules: InputRules;
};

export type Event = {
  __typename?: 'Event';
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  end_at?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['Upload']>;
  name: Scalars['String'];
  start_at: Scalars['Int'];
};

export type EventRule = {
  __typename?: 'EventRule';
  event_id: Scalars['Int'];
  need_participate: Scalars['Boolean'];
};

export type FullUser = {
  __typename?: 'FullUser';
  achievements: Array<UserAch>;
  events: Array<Maybe<UserEvent>>;
  place_by_achs: Scalars['Int'];
  stats: Array<Maybe<UserStat>>;
  user: User;
};

export type GetAchievementsResponse = {
  __typename?: 'GetAchievementsResponse';
  achievements: Array<Achievement>;
  total: Scalars['Int'];
};

export type GetEvent = {
  __typename?: 'GetEvent';
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  end_at?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  start_at: Scalars['Int'];
};

export type GetEventsResponse = {
  __typename?: 'GetEventsResponse';
  events: Array<GetEvent>;
  total: Scalars['Int'];
};

export type GetStatsResponse = {
  __typename?: 'GetStatsResponse';
  stats: Array<Stat>;
  total: Scalars['Int'];
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  total: UsersTotalInfo;
  users: Array<User>;
};

export type InputEventRule = {
  event_id: Scalars['Int'];
  need_participate: Scalars['Boolean'];
};

export type InputRuleBlock = {
  connection_operator?: InputMaybe<ConnectionOperator>;
  eventsRules?: InputMaybe<Array<InputEventRule>>;
  statRules?: InputMaybe<Array<InputStatRule>>;
};

export type InputRules = {
  blocks: Array<InputRuleBlock>;
};

export type InputStatRule = {
  comparison_type: Comparison;
  stat_id: Scalars['Int'];
  target_value: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  BanUser?: Maybe<Scalars['Any']>;
  CreateAchievement?: Maybe<Scalars['Any']>;
  CreateEvent?: Maybe<Scalars['Any']>;
  CreateStat?: Maybe<Scalars['Any']>;
  CreateUser?: Maybe<Scalars['Any']>;
  DeleteAchievement?: Maybe<Scalars['Any']>;
  DeleteEvent?: Maybe<Scalars['Any']>;
  DeleteStat?: Maybe<Scalars['Any']>;
  DeleteUser?: Maybe<Scalars['Any']>;
  RecoverUser?: Maybe<Scalars['Any']>;
  SendCode?: Maybe<Scalars['Any']>;
  UpdateAchievement?: Maybe<Scalars['Any']>;
  UpdateEvent?: Maybe<Scalars['Any']>;
  UpdateStat?: Maybe<Scalars['Any']>;
  UpdateUser?: Maybe<Scalars['Any']>;
  VerifyCode: Scalars['String'];
};


export type MutationBanUserArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAchievementArgs = {
  achievement: CreateAchievement;
};


export type MutationCreateEventArgs = {
  event: NewEvent;
};


export type MutationCreateStatArgs = {
  stat: NewStat;
};


export type MutationCreateUserArgs = {
  user: NewUser;
};


export type MutationDeleteAchievementArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStatArgs = {
  id: Scalars['Int'];
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


export type MutationUpdateAchievementArgs = {
  achievement: UpdateAchievement;
};


export type MutationUpdateEventArgs = {
  event: UpdateEvent;
};


export type MutationUpdateStatArgs = {
  stat: UpdateStat;
};


export type MutationUpdateUserArgs = {
  user?: InputMaybe<UpdateUser>;
};


export type MutationVerifyCodeArgs = {
  code: Scalars['Int'];
  email: Scalars['String'];
};

export type NewEvent = {
  description?: InputMaybe<Scalars['String']>;
  end_at?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
  start_at: Scalars['Int'];
};

export type NewStat = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  period: Scalars['String'];
  seq_period?: InputMaybe<Scalars['String']>;
  start_at: Scalars['Int'];
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
  GetAchievement?: Maybe<Achievement>;
  GetAchievements?: Maybe<GetAchievementsResponse>;
  GetCurrentUser: User;
  GetEvent: GetEvent;
  GetEvents: GetEventsResponse;
  GetFullUser: FullUser;
  GetRatingByAchs: RatingByAch;
  GetRatingByStat?: Maybe<RatingByStat>;
  GetStat: Stat;
  GetStats: GetStatsResponse;
  GetUser: User;
  GetUsers: GetUsersResponse;
};


export type QueryGetAchievementArgs = {
  id: Scalars['Int'];
};


export type QueryGetAchievementsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetEventArgs = {
  id: Scalars['Int'];
};


export type QueryGetEventsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetFullUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetRatingByStatArgs = {
  id: Scalars['Int'];
};


export type QueryGetStatArgs = {
  id: Scalars['Int'];
};


export type QueryGetStatsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type RatingByAch = {
  __typename?: 'RatingByAch';
  total: Scalars['Int'];
  users: Array<UserRatingByAch>;
};

export type RatingByStat = {
  __typename?: 'RatingByStat';
  stat_id: Scalars['Int'];
  total: Scalars['Int'];
  users: Array<UserRatingByStat>;
};

export enum Role {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  User = 'user'
}

export type RuleBlock = {
  __typename?: 'RuleBlock';
  connection_operator?: Maybe<ConnectionOperator>;
  eventsRules?: Maybe<Array<EventRule>>;
  statRules?: Maybe<Array<StatRule>>;
};

export type Rules = {
  __typename?: 'Rules';
  blocks: Array<RuleBlock>;
};

export type Stat = {
  __typename?: 'Stat';
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  period: Scalars['String'];
  seq_period?: Maybe<Scalars['String']>;
  start_at: Scalars['Int'];
};

export type StatRule = {
  __typename?: 'StatRule';
  comparison_type: Comparison;
  stat_id: Scalars['Int'];
  target_value: Scalars['Int'];
};

export type UpdateAchievement = {
  description?: InputMaybe<Scalars['String']>;
  end_at?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: InputMaybe<Scalars['Upload']>;
  name?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<InputRules>;
};

export type UpdateEvent = {
  description?: InputMaybe<Scalars['String']>;
  end_at?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: InputMaybe<Scalars['Upload']>;
  name?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['Int']>;
};

export type UpdateStat = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['String']>;
  seq_period?: InputMaybe<Scalars['String']>;
  start_at?: InputMaybe<Scalars['Int']>;
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
  created_at: Scalars['Int'];
  deleted_at?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  foreign_id?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  role: Role;
};

export type UserAch = {
  __typename?: 'UserAch';
  ach_id: Scalars['Int'];
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserEvent = {
  __typename?: 'UserEvent';
  created_at: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  event_id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserFilter = {
  active?: InputMaybe<Scalars['Boolean']>;
  admins?: InputMaybe<Scalars['Boolean']>;
  banned?: InputMaybe<Scalars['Boolean']>;
};

export type UserRatingByAch = {
  __typename?: 'UserRatingByAch';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  place: Scalars['Int'];
  total_achs: Scalars['Int'];
  user_id: Scalars['Int'];
};

export type UserRatingByStat = {
  __typename?: 'UserRatingByStat';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  place: Scalars['Int'];
  user_id: Scalars['Int'];
  value: Scalars['Int'];
};

export type UserStat = {
  __typename?: 'UserStat';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stat_id: Scalars['Int'];
  value: Scalars['Int'];
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

export type CreateAchievementMutationVariables = Exact<{
  achievement: CreateAchievement;
}>;


export type CreateAchievementMutation = { __typename?: 'Mutation', CreateAchievement?: any | null | undefined };

export type CreateEventMutationVariables = Exact<{
  event: NewEvent;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', CreateEvent?: any | null | undefined };

export type CreateStatMutationVariables = Exact<{
  stat: NewStat;
}>;


export type CreateStatMutation = { __typename?: 'Mutation', CreateStat?: any | null | undefined };

export type CreateUserMutationVariables = Exact<{
  user: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser?: any | null | undefined };

export type DeleteAchievementMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAchievementMutation = { __typename?: 'Mutation', DeleteAchievement?: any | null | undefined };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', DeleteEvent?: any | null | undefined };

export type DeleteStatMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStatMutation = { __typename?: 'Mutation', DeleteStat?: any | null | undefined };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', DeleteUser?: any | null | undefined };

export type GetAchievementQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAchievementQuery = { __typename?: 'Query', GetAchievement?: { __typename?: 'Achievement', id: number, name: string, description?: string | null | undefined, image?: string | null | undefined, end_at?: number | null | undefined, created_at: number, rules: { __typename?: 'Rules', blocks: Array<{ __typename?: 'RuleBlock', connection_operator?: ConnectionOperator | null | undefined, eventsRules?: Array<{ __typename?: 'EventRule', event_id: number, need_participate: boolean }> | null | undefined, statRules?: Array<{ __typename?: 'StatRule', stat_id: number, target_value: number, comparison_type: Comparison }> | null | undefined }> } } | null | undefined };

export type GetAchievementsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type GetAchievementsQuery = { __typename?: 'Query', GetAchievements?: { __typename?: 'GetAchievementsResponse', total: number, achievements: Array<{ __typename?: 'Achievement', id: number, name: string, description?: string | null | undefined, image?: string | null | undefined, end_at?: number | null | undefined, created_at: number, rules: { __typename?: 'Rules', blocks: Array<{ __typename?: 'RuleBlock', connection_operator?: ConnectionOperator | null | undefined, eventsRules?: Array<{ __typename?: 'EventRule', event_id: number, need_participate: boolean }> | null | undefined, statRules?: Array<{ __typename?: 'StatRule', stat_id: number, target_value: number, comparison_type: Comparison }> | null | undefined }> } }> } | null | undefined };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', GetCurrentUser: { __typename?: 'User', email: string, id: number, role: Role, avatar?: string | null | undefined, name?: string | null | undefined } };

export type GetEventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetEventQuery = { __typename?: 'Query', GetEvent: { __typename?: 'GetEvent', id: number, name: string, description?: string | null | undefined, image?: string | null | undefined, created_at: number, start_at: number, end_at?: number | null | undefined } };

export type GetEventsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type GetEventsQuery = { __typename?: 'Query', GetEvents: { __typename?: 'GetEventsResponse', total: number, events: Array<{ __typename?: 'GetEvent', id: number, name: string, description?: string | null | undefined, image?: string | null | undefined, created_at: number, start_at: number, end_at?: number | null | undefined }> } };

export type GetFullUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetFullUserQuery = { __typename?: 'Query', GetFullUser: { __typename?: 'FullUser', place_by_achs: number, user: { __typename?: 'User', email: string, id: number, role: Role, avatar?: string | null | undefined, name?: string | null | undefined }, stats: Array<{ __typename?: 'UserStat', stat_id: number, name: string, description?: string | null | undefined, value: number } | null | undefined>, events: Array<{ __typename?: 'UserEvent', event_id: number, name: string, image?: string | null | undefined, description?: string | null | undefined, created_at: number } | null | undefined>, achievements: Array<{ __typename?: 'UserAch', ach_id: number, name: string, description?: string | null | undefined, created_at: number, image?: string | null | undefined }> } };

export type GetRatingByAchsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRatingByAchsQuery = { __typename?: 'Query', GetRatingByAchs: { __typename?: 'RatingByAch', total: number, users: Array<{ __typename?: 'UserRatingByAch', user_id: number, name?: string | null | undefined, email: string, avatar?: string | null | undefined, place: number, total_achs: number }> } };

export type GetRatingByStatQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRatingByStatQuery = { __typename?: 'Query', GetRatingByStat?: { __typename?: 'RatingByStat', stat_id: number, total: number, users: Array<{ __typename?: 'UserRatingByStat', user_id: number, name?: string | null | undefined, email: string, avatar?: string | null | undefined, place: number, value: number }> } | null | undefined };

export type GetStatQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetStatQuery = { __typename?: 'Query', GetStat: { __typename?: 'Stat', id: number, name: string, description?: string | null | undefined, created_at: number, start_at: number, period: string, seq_period?: string | null | undefined } };

export type GetStatsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type GetStatsQuery = { __typename?: 'Query', GetStats: { __typename?: 'GetStatsResponse', total: number, stats: Array<{ __typename?: 'Stat', id: number, name: string, description?: string | null | undefined, created_at: number, start_at: number, period: string, seq_period?: string | null | undefined }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', GetUser: { __typename?: 'User', email: string, name?: string | null | undefined, created_at: number, id: number, avatar?: string | null | undefined } };

export type GetUsersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  filter?: InputMaybe<UserFilter>;
}>;


export type GetUsersQuery = { __typename?: 'Query', GetUsers: { __typename?: 'GetUsersResponse', total: { __typename?: 'UsersTotalInfo', admins: number, active: number, banned: number }, users: Array<{ __typename?: 'User', id: number, foreign_id?: string | null | undefined, email: string, name?: string | null | undefined, created_at: number, deleted_at?: number | null | undefined, role: Role, avatar?: string | null | undefined }> } };

export type RecoverUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RecoverUserMutation = { __typename?: 'Mutation', RecoverUser?: any | null | undefined };

export type SendCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendCodeMutation = { __typename?: 'Mutation', SendCode?: any | null | undefined };

export type UpdateAchievementMutationVariables = Exact<{
  achievement: UpdateAchievement;
}>;


export type UpdateAchievementMutation = { __typename?: 'Mutation', UpdateAchievement?: any | null | undefined };

export type UpdateEventMutationVariables = Exact<{
  event: UpdateEvent;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', UpdateEvent?: any | null | undefined };

export type UpdateStatMutationVariables = Exact<{
  stat: UpdateStat;
}>;


export type UpdateStatMutation = { __typename?: 'Mutation', UpdateStat?: any | null | undefined };

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUser;
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
export const CreateAchievementDocument = gql`
    mutation CreateAchievement($achievement: CreateAchievement!) {
  CreateAchievement(achievement: $achievement)
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: NewEvent!) {
  CreateEvent(event: $event)
}
    `;
export const CreateStatDocument = gql`
    mutation CreateStat($stat: NewStat!) {
  CreateStat(stat: $stat)
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($user: NewUser!) {
  CreateUser(user: $user)
}
    `;
export const DeleteAchievementDocument = gql`
    mutation DeleteAchievement($id: Int!) {
  DeleteAchievement(id: $id)
}
    `;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Int!) {
  DeleteEvent(id: $id)
}
    `;
export const DeleteStatDocument = gql`
    mutation DeleteStat($id: Int!) {
  DeleteStat(id: $id)
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  DeleteUser(id: $id)
}
    `;
export const GetAchievementDocument = gql`
    query GetAchievement($id: Int!) {
  GetAchievement(id: $id) {
    id
    name
    description
    image
    rules {
      blocks {
        eventsRules {
          event_id
          need_participate
        }
        statRules {
          stat_id
          target_value
          comparison_type
        }
        connection_operator
      }
    }
    end_at
    created_at
  }
}
    `;
export const GetAchievementsDocument = gql`
    query GetAchievements($pagination: Pagination) {
  GetAchievements(pagination: $pagination) {
    total
    achievements {
      id
      name
      description
      image
      rules {
        blocks {
          eventsRules {
            event_id
            need_participate
          }
          statRules {
            stat_id
            target_value
            comparison_type
          }
          connection_operator
        }
      }
      end_at
      created_at
    }
  }
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
export const GetEventDocument = gql`
    query GetEvent($id: Int!) {
  GetEvent(id: $id) {
    id
    name
    description
    image
    created_at
    start_at
    end_at
  }
}
    `;
export const GetEventsDocument = gql`
    query GetEvents($pagination: Pagination) {
  GetEvents(pagination: $pagination) {
    total
    events {
      id
      name
      description
      image
      created_at
      start_at
      end_at
    }
  }
}
    `;
export const GetFullUserDocument = gql`
    query GetFullUser($id: Int!) {
  GetFullUser(id: $id) {
    user {
      email
      id
      role
      avatar
      name
    }
    stats {
      stat_id
      name
      description
      value
    }
    events {
      event_id
      name
      image
      description
      created_at
    }
    achievements {
      ach_id
      name
      description
      created_at
      image
    }
    place_by_achs
  }
}
    `;
export const GetRatingByAchsDocument = gql`
    query GetRatingByAchs {
  GetRatingByAchs {
    total
    users {
      user_id
      name
      email
      avatar
      place
      total_achs
    }
  }
}
    `;
export const GetRatingByStatDocument = gql`
    query GetRatingByStat($id: Int!) {
  GetRatingByStat(id: $id) {
    stat_id
    total
    users {
      user_id
      name
      email
      avatar
      place
      value
    }
  }
}
    `;
export const GetStatDocument = gql`
    query GetStat($id: Int!) {
  GetStat(id: $id) {
    id
    name
    description
    created_at
    start_at
    period
    seq_period
  }
}
    `;
export const GetStatsDocument = gql`
    query GetStats($pagination: Pagination) {
  GetStats(pagination: $pagination) {
    total
    stats {
      id
      name
      description
      created_at
      start_at
      period
      seq_period
    }
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
    avatar
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
export const UpdateAchievementDocument = gql`
    mutation UpdateAchievement($achievement: UpdateAchievement!) {
  UpdateAchievement(achievement: $achievement)
}
    `;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($event: UpdateEvent!) {
  UpdateEvent(event: $event)
}
    `;
export const UpdateStatDocument = gql`
    mutation UpdateStat($stat: UpdateStat!) {
  UpdateStat(stat: $stat)
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UpdateUser!) {
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
    CreateAchievement(variables: CreateAchievementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAchievementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAchievementMutation>(CreateAchievementDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAchievement', 'mutation');
    },
    CreateEvent(variables: CreateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>(CreateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEvent', 'mutation');
    },
    CreateStat(variables: CreateStatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateStatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateStatMutation>(CreateStatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateStat', 'mutation');
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteAchievement(variables: DeleteAchievementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteAchievementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAchievementMutation>(DeleteAchievementDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAchievement', 'mutation');
    },
    DeleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>(DeleteEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEvent', 'mutation');
    },
    DeleteStat(variables: DeleteStatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteStatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteStatMutation>(DeleteStatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteStat', 'mutation');
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUser', 'mutation');
    },
    GetAchievement(variables: GetAchievementQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAchievementQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAchievementQuery>(GetAchievementDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAchievement', 'query');
    },
    GetAchievements(variables?: GetAchievementsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAchievementsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAchievementsQuery>(GetAchievementsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAchievements', 'query');
    },
    GetCurrentUser(variables?: GetCurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentUserQuery>(GetCurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentUser', 'query');
    },
    GetEvent(variables: GetEventQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventQuery>(GetEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEvent', 'query');
    },
    GetEvents(variables?: GetEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventsQuery>(GetEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEvents', 'query');
    },
    GetFullUser(variables: GetFullUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFullUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFullUserQuery>(GetFullUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetFullUser', 'query');
    },
    GetRatingByAchs(variables?: GetRatingByAchsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRatingByAchsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRatingByAchsQuery>(GetRatingByAchsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRatingByAchs', 'query');
    },
    GetRatingByStat(variables: GetRatingByStatQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRatingByStatQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRatingByStatQuery>(GetRatingByStatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRatingByStat', 'query');
    },
    GetStat(variables: GetStatQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStatQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatQuery>(GetStatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStat', 'query');
    },
    GetStats(variables?: GetStatsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatsQuery>(GetStatsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStats', 'query');
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
    UpdateAchievement(variables: UpdateAchievementMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateAchievementMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAchievementMutation>(UpdateAchievementDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAchievement', 'mutation');
    },
    UpdateEvent(variables: UpdateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>(UpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateEvent', 'mutation');
    },
    UpdateStat(variables: UpdateStatMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateStatMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStatMutation>(UpdateStatDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateStat', 'mutation');
    },
    UpdateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUser', 'mutation');
    },
    VerifyCode(variables: VerifyCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyCodeMutation>(VerifyCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VerifyCode', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;