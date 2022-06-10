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
    addresses
    userprofiles
    shippingorders
    paymenttrasnsactions
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
    areatype: Int
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
    areatype: Int
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
  input AddressInput {
    id: Int!
    description: String
    districtid: Int
    userprofileid: Int
    property_number: String
    floor_number: Int
    apartment_number: Int
    streetname: String
    unique_mark: String
    districtId: Int
    requestid: Int
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
    regionid: Int
    sync_status: Int
  }
  type stat {
    tablename: String
    count: Int
  }
  input UserProfileInput {
    id: Int
    telephonenumber: String
    userid: String
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
    haswhatsapp: Boolean
    phonenumbertype: Int
    description: String
    sync_status: Int
  }
  input PaymentTransactionInput {
    id: Int
    merchantrefnum: String
    price: Float
    paymentamount: Float
    fawryfees: Float
    paymentmethod: Int
    orderstatus: Int
    referencenumber: String
    statuscode: String
    statusdescription: String
    requestid: Int
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
    transactiontype: Int
    refundedamount: Float
    sync_status: Int
    userid: String
  }
  input ShippingOrderInput {
    id: Int
    requestid: Int
    shippingtype: Int
    shippingprice: Float
    officeid: Int
    longitude: Float
    latitude: Float
    districtid: Int
    addeddate: Date
    modifieddate: Date
    createdby: String
    updatedby: String
    numberofcopies: Int
    apartmentnumber: Int
    description: String
    floornumber: Int
    propertynumber: Int
    regionid: Int
    streetname: String
    uniquemark: String
    extracopiesprice: Float
    orderstatus: Int
    sync_status: Int
    shippingtype_name: String
    shippingcenter_adress: String
  }
  type Query {
    rualive: Boolean!
    getRequests: String!
    TableIsEmpty(tablename: DbTables!): Boolean!
    GetNumberOfRecords: [stat]
  }
  type Mutation {
    unsafe: String!
    initRequests(requests: [ReqInput!]): String!
    initUsers(users: [UserInput!]): String!
    initAddresses(addresses: [AddressInput!]): String!
    initUserProfiles(userProfiles: [UserProfileInput!]): String!
    initPaymentTransactions(
      paymentTransactions: [PaymentTransactionInput!]
    ): String!
    initShippingOrders(ShippingOrders: [ShippingOrderInput!]): String!
  }
`;
