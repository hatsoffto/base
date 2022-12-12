export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})