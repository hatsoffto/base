export const useToken = () => useState('token', () => { return '' })
export const useUser = () => useState('user', () => { return null })
export const useIsLoggedIn = () => useState('isLoggedIn', () => { return false })
export const useRedirectPath = () => useState('redirectPath', () => { return '/' })

const onLoginUser = async (user: any, token: string) => {
  const { onLogin } = useApollo()
  const theUser = useUser()
  const theToken = useToken()
  const redirectPath = useRedirectPath()
  const redirectPathCookie = useCookie('redirect_path')
  const isLoggedIn = useIsLoggedIn()

  theUser.value = user
  theToken.value = token
  isLoggedIn.value = true

  if (redirectPathCookie.value) {
    redirectPath.value = redirectPathCookie.value
    redirectPathCookie.value = null
  }

  onLogin('true', 'default')

  await $fetch(`/api/token`, { method: 'POST', body: { token } })

  return navigateTo(redirectPath.value)
}

export const useLogin = () => {
  const { mutateWithHeaders, onDone, loading, error, errors } = useMutationWithHeaders(LOGIN)

  const login = async (email: string, password: string, device: string) => {
    return mutateWithHeaders({ input: { email, password, device } })
  }

  onDone((res) => {
    console.log(res.data)
    return onLoginUser(res.data.login.user, res.data.login.token)
  })

  return { login, loading, error, errors }
}

export const useRegister = () => {
  const { mutateWithHeaders, onDone, loading, error, errors } = useMutationWithHeaders(REGISTER)

  const register = async (name: string, email: string, password: string, device: string) => {
    return mutateWithHeaders({ input: { name, email, password, device } })
  }

  onDone((res) => {
    return onLoginUser(res.data.register.user, res.data.register.token)
  })

  return { register, loading, error, errors }
}

export const useLogout = () => {
  const { mutateWithHeaders, onDone, loading, error, errors } = useMutationWithHeaders(LOGOUT)
  const { onLogout } = useApollo()

  const logout = async () => {
    return mutateWithHeaders({})
  }

  onDone(async (res) => {
    const theUser = useUser()
    const theToken = useToken()
    const isLoggedIn = useIsLoggedIn()

    theUser.value = null
    theToken.value = ''
    isLoggedIn.value = false

    onLogout()

    await $fetch(`/api/token`, { method: 'POST', body: null })

    return navigateTo('/login')
  })

  return { logout, loading, error, errors }
}

export const useAccountMenu = () => {
  const { t } = useI18n()

  const items = computed(() => {
    return [
      {
        text: t('auth.my-account'),
        to: '/my-account'
      },
      {
        text: t('auth.my-subscriptions'),
        to: '/my-account/subscriptions'
      },
      {
        text: t('auth.my-donations'),
        to: '/my-account/donations'
      },
      {
        text: t('auth.my-invoices'),
        to: '/my-account/invoices'
      },
      {
        text: t('auth.notification-settings'),
        to: '/my-account/notification-settings'
      }
    ]
  })

  return { items }
}