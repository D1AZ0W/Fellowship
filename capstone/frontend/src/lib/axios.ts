import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})
api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const request = error.config

    if (
      error.response.status === 401 &&
      !request.retry &&
      !request.url.includes('refresh')
    ) {
      request.retry = true

      try {
        await api.post('api-auth/refresh/')
        return api(request)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
