export const LOGIN = gql`
  mutation login ($input: LoginUserInput) {
    login (input: $input) {
      user {
        ...UserFields
      }
      token
      access_token
      expires_at
    }
  }
  ${userFields}
`

export const REGISTER = gql`
  mutation register ($input: RegisterUserInput) {
    register (input: $input) {
      user {
        ...UserFields
      }
      token
      access_token
      expires_at
    }
  }
  ${userFields}
`

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: ForgotPasswordInput) {
    forgotPassword (input: $input)
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword ($input: ResetPasswordInput) {
    resetPassword (input: $input)
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`

export const CREATE_UPLOAD_URL = gql`
  mutation ($input: CreateUploadUrlInput) {
    createUploadUrl (input: $input) {
      uploadUrl
      key
      downloadUrl
    }
  }
`

export const CREATE_TENANT_USER_FILE = gql`
  mutation ($input: CreateTenantUserFileInput!) {
    createTenantUserFile (input: $input) {
      ...FullTenantFile
    }
  }
  ${fullTenantFile}
`

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser (input: $input) {
      ...UserFields
    }
  }
  ${userFields}
`

export const UPDATE_PASSWORD = gql`
  mutation ($input: UpdatePasswordInput!) {
    updatePassword (input: $input) {
      ...UserFields
    }
  }
  ${userFields}
`