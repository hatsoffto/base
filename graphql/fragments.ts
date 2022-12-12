export const tenantFileUrls = gql`
  fragment TenantFileUrls on TenantFile {
    id
    cdn_path
  }
`

export const fullTenantFile = gql`
  fragment FullTenantFile on TenantFile {
    id
    name
    filetype
    url  
    cdn_path
  }
`

export const userFields = gql`
  fragment UserFields on User {
    id
    name
    email
    thumbnail {
      ...FullTenantFile
    }
  }
  ${fullTenantFile}
`

export const tenantFieldsFragment = gql`
  fragment TenantFields on Tenant {
    id
    name
    slug
    currency
    locale
    country
    payment_provider_type
    primaryDomain {
      id
      domain
    }
    primary_color
    secondary_color
    primary_color_string
    secondary_color_string
    thumbnail {
      ...TenantFileUrls
    }  
    logo {
      ...TenantFileUrls
    }
    logoDarkMode {
      ...TenantFileUrls
    }
  }
  ${tenantFileUrls}
`