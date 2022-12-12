const getHeaders = (client: string) => {
  const tenant = useTenant()
  const headers = <any>{}

  if (tenant.value && client === 'default') {
    headers['X-Tenant'] = tenant.value?.primaryDomain?.domain
    headers['X-Locale'] = tenant.value.locale ?? 'nl'
  }

  return headers
}

export const useErrors = () => {
  const getRefreshedErrors = (errs: any, field: string) => {
    let errors = errs
    if (errors && errors[field] || errors && errors[`input.${field}`]) {
      delete errors[field]
      delete errors[`input.${field}`]

      if (Object.keys(errors).length === 0) errors = null
    }

    return errors
  }

  return {
    getRefreshedErrors
  }
}

export const useMutationWithHeaders = (query: any, update = <any>null, client = 'default') => {
  const { mutate, onDone, onError, loading } = useMutation(query, { clientId: client, update })

  const done = ref(false)
  const failed = ref(false)
  const error = <any>ref(null)
  const errors = <any>ref(null)

  onError((err: any) => {
    failed.value = true
    if (err?.graphQLErrors[0]) {
      error.value = err?.graphQLErrors[0].message
      errors.value = {}

      if (err?.graphQLErrors[0]?.extensions?.validation) {
        Object.keys(err?.graphQLErrors[0]?.extensions?.validation).forEach(function (key) {
          errors.value[key] = err?.graphQLErrors[0]?.extensions?.validation[key][0]
        })
      }
    }
  })

  onDone(() => {
    done.value = true
  })

  const mutateWithHeaders = (variables: any) => {
    error.value = null
    errors.value = null
    const headers = getHeaders(client)
    return mutate(variables, {
      context: {
        headers
      }
    })
  }

  return { mutateWithHeaders, onDone, onError, errors, error, loading, done, failed }
}

export const useFetchQuery = async (query: any, variables = {}, clientId = 'default') => {
  const { clients } = useApollo()
  const headers = getHeaders(clientId)

  const data = ref(null)
  const pending = ref(true)

  const res = await clients?.[clientId].query({
    query, variables, context: {
      headers
    }
  })

  pending.value = false
  data.value = res?.data ?? null

  return { data, pending }
}

export const useQueryWithHeaders = (query: any, variables = {}, client = 'default', prefetch = true) => {
  const headers = getHeaders(client)
  const loaded = ref(false)

  const { result, onResult, onError, loading, refetch } = useQuery(query, variables, {
    clientId: client,
    prefetch,
    context: {
      headers
    }
  })

  onResult(() => {
    loaded.value = true
  })

  onError(() => {
    loaded.value = true
  })

  const ssrLoading = computed(() => {
    return !loaded.value || loading.value
  })

  return { result, onResult, onError, ssrLoading, loading, refetch }
}

function lowercaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const useUpdatePaginatedCacheOnCreated = ({ cache, query, type, variables = {}, created = {} }: { cache: any, query: object, type: string, variables: object, created: object }) => {
  let data = cache.readQuery({ query, variables })

  if (!data) return

  const newData: any = {}

  newData[type] = {
    ...data[type],
    data: [
      created,
      ...data[type].data
    ],
    paginatorInfo: {
      ...data[type].paginatorInfo,
      count: data[type].paginatorInfo.count + 1,
      lastItem: data[type].paginatorInfo.lastItem + 1,
      total: data[type].paginatorInfo.total + 1,
    }
  }

  cache.writeQuery({ query, variables, data: newData })
}

export const useResourceMutation = ({ query = <any>{}, customCachedOrderByColumn = null, cachedQueryToUpdate = null, customMutationName = null, customCachedType = null, customCacheVariables = null, withoutCacheUpdate = false, tenantFileRelations = [], belongsToRelations = [], hasManyRelations = [], deleteDisconnectedHasManyRelations = [] }) => {

  const updateCache = (cache: any, data: any) => {
    if (withoutCacheUpdate) return

    const mutationName = customMutationName ?? query.definitions[0].selectionSet.selections[0].name.value


    if (mutationName.startsWith('create') && cachedQueryToUpdate) {

      const cachedType = customCachedType ?? lowercaseFirstLetter(mutationName.replace('create', '').replace('update', '')) + 's'
      const cacheVariables = customCacheVariables ?? { first: 15, orderBy: [{ column: customCachedOrderByColumn ?? "CREATED_AT", order: "DESC" }] }

      useUpdatePaginatedCacheOnCreated({
        cache,
        query: cachedQueryToUpdate,
        type: cachedType,
        variables: cacheVariables,
        created: data.data[mutationName]
      })
    }
  }

  const {
    mutateWithHeaders,
    errors,
    error,
    loading,
    done,
    failed,
    onDone,
    onError
  } = useMutationWithHeaders(query, updateCache)

  const mutate = (variables: any = {}, currentState: any = {}, ignoreInputFields: any = []) => {
    if (variables.input) {
      for (const key in ignoreInputFields) {
        delete variables.input[ignoreInputFields[key]]
      }

      for (const key in tenantFileRelations) {
        if (variables.input[tenantFileRelations[key]]) {
          variables.input[tenantFileRelations[key]] = {
            connect: variables.input[tenantFileRelations[key]].id
          }
        } else {
          variables.input[tenantFileRelations[key]] = {
            disconnect: true
          }
        }
      }

      for (const key in belongsToRelations) {
        if (variables.input[belongsToRelations[key]]) {
          variables.input[belongsToRelations[key]] = {
            connect: variables.input[belongsToRelations[key]]
          }
        } else {
          variables.input[belongsToRelations[key]] = {
            disconnect: true
          }
        }
      }

      for (const key in hasManyRelations) {
        if (variables.input[hasManyRelations[key]] && Array.isArray(variables.input[hasManyRelations[key]])) {
          const relation = variables.input[hasManyRelations[key]]
          variables.input[hasManyRelations[key]] = {}

          const updatedIds = []

          for (const k in relation) {
            if (relation[k].id) {
              updatedIds.push(relation[k].id)

              if (!variables.input[hasManyRelations[key]]['update']) {
                variables.input[hasManyRelations[key]]['update'] = []
              }

              variables.input[hasManyRelations[key]]['update'].push(relation[k])
            } else {
              if (!variables.input[hasManyRelations[key]]['create']) {
                variables.input[hasManyRelations[key]]['create'] = []
              }

              delete relation[k].id

              variables.input[hasManyRelations[key]]['create'].push(relation[k])
            }
          }

          if (currentState[hasManyRelations[key]] && Array.isArray(currentState[hasManyRelations[key]])) {
            for (const k in currentState[hasManyRelations[key]]) {
              if (!updatedIds.includes(currentState[hasManyRelations[key]][k].id)) {
                const disconnectName = deleteDisconnectedHasManyRelations.includes(hasManyRelations[key]) ? 'delete' : 'disconnect'

                if (!variables.input[hasManyRelations[key]][disconnectName]) {
                  variables.input[hasManyRelations[key]][disconnectName] = []
                }

                variables.input[hasManyRelations[key]][disconnectName].push(currentState[hasManyRelations[key]][k].id)
              }
            }
          }
        }
      }
    }

    return mutateWithHeaders(variables)
  }

  onError((err) => {
    // console.log('error: ', { err })
  })

  return {
    mutate,
    errors,
    error,
    loading,
    done,
    failed,
    onDone
  }
}