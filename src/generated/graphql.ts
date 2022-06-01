import { GraphQLResolveInfo } from 'graphql';
import { AppContext } from '../lib/server/graphql/context';
import { DeepPartial } from '@types';
export type Maybe<T> = T | null;
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
};

export type CreateDinosaurDietInput = {
  name: Scalars['String'];
};

export type CreateDinosaurInput = {
  name: Scalars['String'];
  typeId: Scalars['ID'];
  length?: Maybe<Scalars['Int']>;
  dietId: Scalars['ID'];
  timeId: Scalars['ID'];
};

export type CreateDinosaurTimeInput = {
  name: Scalars['String'];
};

export type CreateDinosaurTypeInput = {
  name: Scalars['String'];
};

export type Dinosaur = {
  __typename?: 'Dinosaur';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: DinosaurType;
  length?: Maybe<Scalars['Int']>;
  diet: DinosaurDiet;
  time: DinosaurTime;
};

export type DinosaurDiet = {
  __typename?: 'DinosaurDiet';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DinosaurTime = {
  __typename?: 'DinosaurTime';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DinosaurType = {
  __typename?: 'DinosaurType';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _root?: Maybe<Scalars['Boolean']>;
  createDinosaur: Dinosaur;
  createDinosaurType: DinosaurType;
  createDinosaurDiet: DinosaurDiet;
  createDinosaurTime: DinosaurTime;
};


export type MutationCreateDinosaurArgs = {
  input: CreateDinosaurInput;
};


export type MutationCreateDinosaurTypeArgs = {
  input: CreateDinosaurTypeInput;
};


export type MutationCreateDinosaurDietArgs = {
  input: CreateDinosaurDietInput;
};


export type MutationCreateDinosaurTimeArgs = {
  input: CreateDinosaurTimeInput;
};

export type Query = {
  __typename?: 'Query';
  _root?: Maybe<Scalars['Boolean']>;
  dinosaurs: Array<Dinosaur>;
  dinosaurById?: Maybe<Dinosaur>;
  dinosaurTypes?: Maybe<Array<Maybe<DinosaurType>>>;
  dinosaurDiets?: Maybe<Array<Maybe<DinosaurDiet>>>;
  dinosaurTimes?: Maybe<Array<Maybe<DinosaurTime>>>;
  searchTypeDietTime: Array<SearchResult>;
};


export type QueryDinosaurByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySearchTypeDietTimeArgs = {
  search: Scalars['String'];
};

export type SearchResult = DinosaurType | DinosaurDiet | DinosaurTime;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  Dinosaur: ResolverTypeWrapper<DeepPartial<Dinosaur>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  DinosaurType: ResolverTypeWrapper<DeepPartial<DinosaurType>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  DinosaurDiet: ResolverTypeWrapper<DeepPartial<DinosaurDiet>>;
  DinosaurTime: ResolverTypeWrapper<DeepPartial<DinosaurTime>>;
  SearchResult: DeepPartial<ResolversTypes['DinosaurType'] | ResolversTypes['DinosaurDiet'] | ResolversTypes['DinosaurTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateDinosaurInput: ResolverTypeWrapper<DeepPartial<CreateDinosaurInput>>;
  CreateDinosaurTypeInput: ResolverTypeWrapper<DeepPartial<CreateDinosaurTypeInput>>;
  CreateDinosaurDietInput: ResolverTypeWrapper<DeepPartial<CreateDinosaurDietInput>>;
  CreateDinosaurTimeInput: ResolverTypeWrapper<DeepPartial<CreateDinosaurTimeInput>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Boolean: DeepPartial<Scalars['Boolean']>;
  Dinosaur: DeepPartial<Dinosaur>;
  ID: DeepPartial<Scalars['ID']>;
  String: DeepPartial<Scalars['String']>;
  DinosaurType: DeepPartial<DinosaurType>;
  Int: DeepPartial<Scalars['Int']>;
  DinosaurDiet: DeepPartial<DinosaurDiet>;
  DinosaurTime: DeepPartial<DinosaurTime>;
  SearchResult: DeepPartial<ResolversParentTypes['DinosaurType'] | ResolversParentTypes['DinosaurDiet'] | ResolversParentTypes['DinosaurTime']>;
  Mutation: {};
  CreateDinosaurInput: DeepPartial<CreateDinosaurInput>;
  CreateDinosaurTypeInput: DeepPartial<CreateDinosaurTypeInput>;
  CreateDinosaurDietInput: DeepPartial<CreateDinosaurDietInput>;
  CreateDinosaurTimeInput: DeepPartial<CreateDinosaurTimeInput>;
};

export type DinosaurResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Dinosaur'] = ResolversParentTypes['Dinosaur']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DinosaurType'], ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  diet?: Resolver<ResolversTypes['DinosaurDiet'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['DinosaurTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DinosaurDietResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['DinosaurDiet'] = ResolversParentTypes['DinosaurDiet']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DinosaurTimeResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['DinosaurTime'] = ResolversParentTypes['DinosaurTime']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DinosaurTypeResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['DinosaurType'] = ResolversParentTypes['DinosaurType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _root?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createDinosaur?: Resolver<ResolversTypes['Dinosaur'], ParentType, ContextType, RequireFields<MutationCreateDinosaurArgs, 'input'>>;
  createDinosaurType?: Resolver<ResolversTypes['DinosaurType'], ParentType, ContextType, RequireFields<MutationCreateDinosaurTypeArgs, 'input'>>;
  createDinosaurDiet?: Resolver<ResolversTypes['DinosaurDiet'], ParentType, ContextType, RequireFields<MutationCreateDinosaurDietArgs, 'input'>>;
  createDinosaurTime?: Resolver<ResolversTypes['DinosaurTime'], ParentType, ContextType, RequireFields<MutationCreateDinosaurTimeArgs, 'input'>>;
};

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _root?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dinosaurs?: Resolver<Array<ResolversTypes['Dinosaur']>, ParentType, ContextType>;
  dinosaurById?: Resolver<Maybe<ResolversTypes['Dinosaur']>, ParentType, ContextType, RequireFields<QueryDinosaurByIdArgs, 'id'>>;
  dinosaurTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['DinosaurType']>>>, ParentType, ContextType>;
  dinosaurDiets?: Resolver<Maybe<Array<Maybe<ResolversTypes['DinosaurDiet']>>>, ParentType, ContextType>;
  dinosaurTimes?: Resolver<Maybe<Array<Maybe<ResolversTypes['DinosaurTime']>>>, ParentType, ContextType>;
  searchTypeDietTime?: Resolver<Array<ResolversTypes['SearchResult']>, ParentType, ContextType, RequireFields<QuerySearchTypeDietTimeArgs, 'search'>>;
};

export type SearchResultResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'DinosaurType' | 'DinosaurDiet' | 'DinosaurTime', ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  Dinosaur?: DinosaurResolvers<ContextType>;
  DinosaurDiet?: DinosaurDietResolvers<ContextType>;
  DinosaurTime?: DinosaurTimeResolvers<ContextType>;
  DinosaurType?: DinosaurTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppContext> = Resolvers<ContextType>;
