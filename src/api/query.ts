export const query = (
  name: string,
  cursor?: string,
  count = 50
): { query: string } => {
  const after = cursor ? `, after: "${cursor}"` : "";
  return {
    query: `
    {
  search(type: REPOSITORY, query: "name:${name}", first: ${count}${after}) {
    repositoryCount
    repos: edges {
      cursor
      repo: node {
        ... on Repository {
          id
          url
          name
          createdAt
          updatedAt
          description
          descriptionHTML
          stargazerCount
          viewerHasStarred
          isPrivate
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          languages(first: 10) {
            nodes {
              name
              color
            }
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
  `,
  };
};
