export const usePagination = () => {
  const paginatorFields = 'paginatorInfo{count,currentPage,hasMorePages,lastPage,perPage,total,firstItem,lastItem}'

  return {
    paginatorFields
  }
}

export const useData = (props: { size: any; defaultOrderBy: any; variables: any; query: any; client: any; path: string | number; mergeItems: any }) => {
  const route = useRoute()

  const getParams = (query: any) => {
    const params: any = {}

    if (props.size) {
      query['first'] = props.size
    }

    if (!query) return params

    for (const key in query) {
      if (!['first', 'page', 'published', 'order'].includes(key)) {
        params[key] = query[key]
      }
      if (['first', 'page']) {
        params[key] = parseInt(query[key])
      }
      if (key === 'published') {
        params['published'] = true
      }
    }

    if (query['orderBy'] && query['order']) {
      params['orderBy'] = [{ column: query['orderBy'], order: query['order'] }]
    } else if (props.defaultOrderBy) {
      params['orderBy'] = props.defaultOrderBy
    }

    return params
  }

  const items = ref(<any>[])
  const paginatorInfo = ref(null)
  const queryParams = ref(getParams(route.query))
  const variables = computed(() => {
    return props.variables ?? {}
  })

  const firstLoaded = ref(false)
  const { result, onResult, loading, refetch } = useQueryWithHeaders(props.query, { ...queryParams.value, ...variables.value }, props.client ?? 'default', false)

  onResult(() => {
    paginatorInfo.value = result.value[props.path]?.paginatorInfo

    if (props.mergeItems) {
      items.value.push(result.value[props.path]?.data ?? [])
    } else {
      items.value = result.value[props.path]?.data ?? []
    }

    firstLoaded.value = true
  })

  const isEmptyOnInit = computed(() => {
    return !loading.value && !items.value.length && firstLoaded.value
  })

  const isEmptyAfterFilter = computed(() => {
    return !loading.value && !items.value.length && !firstLoaded.value
  })

  const initialRoutePath = route.path

  watch(route, (newValue, oldValue) => {
    if (newValue.path != initialRoutePath) {
      // route is switched so don't fetch data
      return
    }

    queryParams.value = getParams(newValue.query)

    return refetch(queryParams.value)
  })

  return {
    items,
    loading,
    firstLoaded,
    queryParams,
    paginatorInfo,
    isEmptyOnInit,
    isEmptyAfterFilter
  }
}