import { gql } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const typeDefs = gql`
  scalar Date
  enum DbTables {
    aspnetusers
    requests
  }
  type aspnetuser {
    Id: String
    ArabicFullName: String
    addeddate: Date
    modifieddate: Date
    makerid: String
    dateofbirth: Date
    firstlogin: Boolean
    addressid: Int
    username: String
    normalizedusername: String
    email: String
    normalizedemail: String
    emailconfirmed: Boolean
    passwordhash: String
    securitystamp: String
    concurrencystamp: String
    phonenumber: String
    phonenumberconfirmed: Boolean
    twofactorenabled: Boolean
    lockoutendl: Date
    lockoutenabled: Boolean
    accessfailedcount: Int
    sync_status: Int
  }

  type Request {
    unittype: Int
    requeststatus: Int
    location: String
    area: Float
    price: Float
    receiptimagepath: String
    requestnumber: String
    userid: String
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
    callcenter_note: String
    currentstatus: Int
    payment_confirm: Int
    callconfirm: Int
    callcenter: Int
    test: String
    done: Int
    assigned: Int
    confirmed: Int
    notes: String
    sync_status: Int
    id: Int
  }

  input ReqInput {
    id: Int!
    unittype: Int
    requeststatus: Int
    location: String
    area: Float
    price: Float
    requestnumber: String
    userid: String
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
  }
  input UserInput {
    id: String!
    arabicfullname: String!
    addeddate: Date!
    modifieddate: Date
    makerid: String
    dateofbirth: Date
    firstlogin: Boolean
    addressid: Int
    username: String
    normalizedusername: String
    email: String
    normalizedemail: String
    emailconfirmed: Boolean
    passwordhash: String
    securitystamp: String
    concurrencystamp: String
    phonenumber: String
    phonenumberconfirmed: Boolean
    twofactorenabled: Boolean
    lockoutendl: Date
    lockoutenabled: Boolean
    accessfailedcount: Int
    sync_status: Int
  }
  type LatestUserInfo {
    addeddate: Date
    id: String
  }
  type LatestRequestInfo {
    addeddate: Date
    id: Int
  }
  type Query {
    getRequests: String!
    TableIsEmpty(tablename: DbTables!): Boolean!
    GetNumberOfRecords(tablename: DbTables!): Int!
    getlatestUser: [LatestUserInfo]
    getlatestModifiedUser: Date
    getLatestRequest: [LatestRequestInfo]
    getLatestModifiedRequest: Date
  }
  type Mutation {
    initRequests(requests: [ReqInput!]): String!
    getRequestesByDate(date: Date): [Request]
    initUsers(users: [UserInput!]): String!
    SyncRequests(requests: ReqInput): String!
  }
`;
