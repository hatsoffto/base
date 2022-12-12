export const useUploadFile = () => {
  const uploading = ref(false)
  const progress = ref(0)
  const key = ref(null)
  const downloadUrl = ref(null)
  const fileToUpload = ref(<any>null)

  const { mutateWithHeaders, onDone, onError, errors, error } = useMutationWithHeaders(CREATE_UPLOAD_URL)

  onError(() => {
    uploading.value = false
  })

  const upload = (file: any) => {
    uploading.value = true
    fileToUpload.value = file

    const body = {
      name: file.name,
      filetype: file.type ? file.type : 'image/jpeg'
    }

    return mutateWithHeaders({ input: body })
      .then((res) => {
        downloadUrl.value = res?.data.createUploadUrl.downloadUrl
        key.value = res?.data.createUploadUrl.key

        return $fetch(res?.data.createUploadUrl.uploadUrl, {
          method: 'PUT',
          body: fileToUpload.value,
          headers: {
            'Content-Type': body.filetype
          }
        })
          .then(() => {
            return {
              key: key.value, name: fileToUpload.value.name, filetype: fileToUpload.value?.type, url: downloadUrl
            }
          })
          .catch(err => {
            error.value = err.response.data
            uploading.value = false
          })
      })
  }

  return {
    uploading,
    progress,
    errors,
    error,
    key,
    downloadUrl,
    upload
  }
}

export const useCreateTenantFile = () => {
  const tenantFile = ref(null)

  const { mutateWithHeaders, onDone, errors, error } = useMutationWithHeaders(CREATE_TENANT_USER_FILE)

  onDone((res) => {
    tenantFile.value = res.data.createTenantUserFile
  })

  const createTenantFile = ({ name, filetype, key, acl = 'private', size_name = null, originalTenantFile = null, cropped = null }: { name: string, filetype: string, key: string, size_name: any, acl: string, originalTenantFile: any, cropped: any }) => {
    tenantFile.value = null

    const input: any = {
      name,
      filetype,
      key: key.replace('tmp/', '')
    }

    return mutateWithHeaders({ input })
  }

  return {
    tenantFile,
    createTenantFile,
    errors,
    error
  }
}