export default defineNuxtPlugin((nuxtApp) => {
  const bearerToken = useToken()
  const isLoggedIn = useIsLoggedIn()

  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    if (bearerToken.value && isLoggedIn.value) {
      token.value = bearerToken.value
    }
  })
})