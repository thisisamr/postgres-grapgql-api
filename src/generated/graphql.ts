import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum DbTables {
  Aspnetusers = 'aspnetusers',
  Requests = 'requests'
}

export type Mutation = {
  __typename?: 'Mutation';
  SyncRequests: Scalars['String'];
  getRequestesByDate?: Maybe<Array<Maybe<Request>>>;
  initRequests: Scalars['String'];
  initUsers: Scalars['String'];
};


export type MutationSyncRequestsArgs = {
  requests?: InputMaybe<ReqInput>;
};


export type MutationGetRequestesByDateArgs = {
  date?: InputMaybe<Scalars['Date']>;
};


export type MutationInitRequestsArgs = {
  requests?: InputMaybe<Array<ReqInput>>;
};


export type MutationInitUsersArgs = {
  users?: InputMaybe<Array<UserInput>>;
};

export type Query = {
  __typename?: 'Query';
  GetNumberOfRecords: Scalars['Int'];
  TableIsEmpty: Scalars['Boolean'];
  getLatestModifiedRequest?: Maybe<Scalars['Date']>;
  getLatestRequest: Scalars['Date'];
  getRequests: Scalars['String'];
  getlatestModifiedUser?: Maybe<Scalars['Date']>;
  getlatestUser: Scalars['Date'];
};


export type QueryGetNumberOfRecordsArgs = {
  tablename: DbTables;
};


export type QueryTableIsEmptyArgs = {
  tablename: DbTables;
};

export type ReqInput = {
  addeddate?: InputMaybe<Scalars['Date']>;
  area?: InputMaybe<Scalars['Float']>;
  createdby?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  location?: InputMaybe<Scalars['String']>;
  modifieddate?: InputMaybe<Scalars['Date']>;
  price?: InputMaybe<Scalars['Float']>;
  requestnumber?: InputMaybe<Scalars['String']>;
  requeststatus?: InputMaybe<Scalars['Int']>;
  unittype?: InputMaybe<Scalars['Int']>;
  updatedby?: InputMaybe<Scalars['String']>;
  userid?: InputMaybe<Scalars['String']>;
};

export type Request = {
  __typename?: 'Request';
  addeddate?: Maybe<Scalars['Date']>;
  area?: Maybe<Scalars['Float']>;
  assigned?: Maybe<Scalars['Int']>;
  callcenter?: Maybe<Scalars['Int']>;
  callcenter_note?: Maybe<Scalars['String']>;
  callconfirm?: Maybe<Scalars['Int']>;
  confirmed?: Maybe<Scalars['Int']>;
  createdby?: Maybe<Scalars['String']>;
  currentstatus?: Maybe<Scalars['Int']>;
  done?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  modifieddate?: Maybe<Scalars['Date']>;
  notes?: Maybe<Scalars['String']>;
  payment_confirm?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  receiptimagepath?: Maybe<Scalars['String']>;
  requestnumber?: Maybe<Scalars['String']>;
  requeststatus?: Maybe<Scalars['Int']>;
  sync_status?: Maybe<Scalars['Int']>;
  test?: Maybe<Scalars['String']>;
  unittype?: Maybe<Scalars['Int']>;
  updatedby?: Maybe<Scalars['String']>;
  userid?: Maybe<Scalars['String']>;
};

export type UserInput = {
  accessfailedcount?: InputMaybe<Scalars['Int']>;
  addeddate: Scalars['Date'];
  addressid?: InputMaybe<Scalars['Int']>;
  arabicfullname: Scalars['String'];
  concurrencystamp?: InputMaybe<Scalars['String']>;
  dateofbirth?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  emailconfirmed?: InputMaybe<Scalars['Boolean']>;
  firstlogin?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lockoutenabled?: InputMaybe<Scalars['Boolean']>;
  lockoutendl?: InputMaybe<Scalars['Date']>;
  makerid?: InputMaybe<Scalars['String']>;
  modifieddate?: InputMaybe<Scalars['Date']>;
  normalizedemail?: InputMaybe<Scalars['String']>;
  normalizedusername?: InputMaybe<Scalars['String']>;
  passwordhash?: InputMaybe<Scalars['String']>;
  phonenumber?: InputMaybe<Scalars['String']>;
  phonenumberconfirmed?: InputMaybe<Scalars['Boolean']>;
  securitystamp?: InputMaybe<Scalars['String']>;
  sync_status?: InputMaybe<Scalars['Int']>;
  twofactorenabled?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Aspnetuser = {
  __typename?: 'aspnetuser';
  ArabicFullName?: Maybe<Scalars['String']>;
  Id?: Maybe<Scalars['String']>;
  accessfailedcount?: Maybe<Scalars['Int']>;
  addeddate?: Maybe<Scalars['Date']>;
  addressid?: Maybe<Scalars['Int']>;
  concurrencystamp?: Maybe<Scalars['String']>;
  dateofbirth?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  emailconfirmed?: Maybe<Scalars['Boolean']>;
  firstlogin?: Maybe<Scalars['Boolean']>;
  lockoutenabled?: Maybe<Scalars['Boolean']>;
  lockoutendl?: Maybe<Scalars['Date']>;
  makerid?: Maybe<Scalars['String']>;
  modifieddate?: Maybe<Scalars['Date']>;
  normalizedemail?: Maybe<Scalars['String']>;
  normalizedusername?: Maybe<Scalars['String']>;
  passwordhash?: Maybe<Scalars['String']>;
  phonenumber?: Maybe<Scalars['String']>;
  phonenumberconfirmed?: Maybe<Scalars['Boolean']>;
  securitystamp?: Maybe<Scalars['String']>;
  sync_status?: Maybe<Scalars['Int']>;
  twofactorenabled?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DbTables: DbTables;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReqInput: ReqInput;
  Request: ResolverTypeWrapper<Request>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UserInput: UserInput;
  aspnetuser: ResolverTypeWrapper<Aspnetuser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  ReqInput: ReqInput;
  Request: Request;
  String: Scalars['String'];
  UserInput: UserInput;
  aspnetuser: Aspnetuser;
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  exclusiveMax?: Maybe<Scalars['Float']>;
  exclusiveMin?: Maybe<Scalars['Float']>;
  format?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  maxLength?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Int']>;
  multipleOf?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  uniqueTypeName?: Maybe<Scalars['String']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  SyncRequests?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSyncRequestsArgs, never>>;
  getRequestesByDate?: Resolver<Maybe<Array<Maybe<ResolversTypes['Request']>>>, ParentType, ContextType, RequireFields<MutationGetRequestesByDateArgs, never>>;
  initRequests?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationInitRequestsArgs, never>>;
  initUsers?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationInitUsersArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  GetNumberOfRecords?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryGetNumberOfRecordsArgs, 'tablename'>>;
  TableIsEmpty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryTableIsEmptyArgs, 'tablename'>>;
  getLatestModifiedRequest?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  getLatestRequest?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  getRequests?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getlatestModifiedUser?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  getlatestUser?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export type RequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = {
  addeddate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  assigned?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  callcenter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  callcenter_note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  callconfirm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  confirmed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdby?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentstatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  done?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifieddate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payment_confirm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  receiptimagepath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestnumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requeststatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sync_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unittype?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedby?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AspnetuserResolvers<ContextType = any, ParentType extends ResolversParentTypes['aspnetuser'] = ResolversParentTypes['aspnetuser']> = {
  ArabicFullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accessfailedcount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  addeddate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  addressid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  concurrencystamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateofbirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailconfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  firstlogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lockoutenabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lockoutendl?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  makerid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifieddate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  normalizedemail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  normalizedusername?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordhash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phonenumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phonenumberconfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  securitystamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sync_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  twofactorenabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  aspnetuser?: AspnetuserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
