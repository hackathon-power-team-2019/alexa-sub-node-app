// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTroweAlexaUserEvents = `query GetTroweAlexaUserEvents($user: String!) {
  getTroweAlexaUserEvents(user: $user) {
    user
    productCode
    productURL
  }
}
`;
export const listTroweAlexaUserEvents = `query ListTroweAlexaUserEvents(
  $filter: TableTroweAlexaUserEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTroweAlexaUserEvents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      user
      productCode
      productURL
    }
    nextToken
  }
}
`;
