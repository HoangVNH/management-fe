import axiosClient from "./axiosClient"

const productApi = {
  getProductList() {
    const url = "/product"
    return axiosClient.get(url)
  },

  getProductById(id) {
    const url = `/product/${id}`
    return axiosClient.get(url)
  },

  getProductsByCategoryId(id) {
    const url = `/product?category=${id}`
    return axiosClient.get(url)
  },

  getProductsPagination(data) {
    const limit = 10
    const search = data.search ? data.search : ''
    const url = `/product?category=${data.categoryId}&search=${search}&page=${data.page}&limit=${limit}`
    return axiosClient.get(url)
  },

  getProductsbySearch(search) {
    const url = `/product?search=${search}`
    return axiosClient.get(url)
  }
}

export default productApi
