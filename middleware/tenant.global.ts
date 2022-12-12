export default defineNuxtRouteMiddleware(async (to, from) => {
  const tenant = useTenant()
  const { $i18n } = useNuxtApp()
  const { clients } = useApollo()

  if (process.server) {
    const headers = useRequestHeaders(['host'])

    try {
      const res = await clients?.default.query({
        query: GET_TENANT, context: {
          headers: {
            'X-Tenant': headers.host
          }
        }
      })

      tenant.value = res.data.tenant ?? null
    } catch (err) {
      //
    }

    if (!tenant.value) throw createError({ statusCode: 404, statusMessage: 'Site not found.' })
  }

  if (tenant.value && tenant.value.locale) {
    $i18n.setLocale(tenant.value.locale)
  }
})