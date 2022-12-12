export const useTenant = () => <any>useState('tenant', () => { return null })

export const useTenantHead = () => {
  const tenant = useTenant()

  useHead({
    style: [
      { children: tenant.value?.primary_color_string },
      { children: tenant.value?.secondary_color_string }
    ],
    // bodyAttrs: {
    //   class: 'dark'
    // }
  })
}