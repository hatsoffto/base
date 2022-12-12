const { paginatorFields } = usePagination()

export const GET_TENANT = gql`
  query {
    tenant {
      ...TenantFields
    }
  }
  ${tenantFieldsFragment}
`

export const GET_ME = gql`
  query {
    me {
      ...UserFields
    }
  }
  ${userFields}
`

export const GET_POSTS = gql`
  query ($first: Int = 15, $page: Int, $orderBy: [QueryPostsOrderByOrderByClause!]) {
    posts(first: $first, page: $page, orderBy: $orderBy) {
      data {
        id
        title
        type
        slug
        created_at
        updated_at
        status
        published_at
        products_with_access {
          id
          name
        }
      },
      ${paginatorFields}
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query ($slug: String!) {
    postBySlug(slug: $slug) {
      id
      title
      type
      created_at
      updated_at
      status
      published_at
      products_with_access {
        id
        name
      }
    }
  }
`