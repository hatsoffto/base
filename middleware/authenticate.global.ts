export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useToken()
  const user = useUser()
  const isLoggedIn = useIsLoggedIn()
  const tokenInCookie = useCookie('token')
  const apolloCookie = useCookie('apollo:default.token')
  const { clients } = useApollo()

  if (process.server && tokenInCookie.value) {
    isLoggedIn.value = true
    token.value = tokenInCookie.value
    const headers = useRequestHeaders(['host'])

    try {
      const res = await clients?.default.query({
        query: GET_ME, context: {
          headers: {
            'X-Tenant': headers.host
          }
        }
      })

      user.value = res.data.me ?? null
    } catch (err) {
      //
    }

    if (!user.value) {
      isLoggedIn.value = false
      token.value = ''
      tokenInCookie.value = null
      apolloCookie.value = null
    }
  }
})