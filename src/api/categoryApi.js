import axiosClient from "./axiosClient"

const categoryApi = {
  getCategoryList() {
    const url = "/category?"
    return axiosClient.get(url)
  },
  getCategoryById(id) {
    const url = `/category/${id}`
    return axiosClient.get(url)
  },
}

export default categoryApi
