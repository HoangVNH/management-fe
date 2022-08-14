import axiosClient from "./axiosClient"

const prefix = '/auth/me/address'

const addressApi = {
  insertAddress(data){
    const url = prefix
    return axiosClient.post(url,data)
  },

  getAddressList() {
    const url = `${prefix}`
    return axiosClient.get(url)
  },

  getAddressById(id) {
    const url = `${prefix}/${id}`
    return axiosClient.get(url)
  },

  deleteAddressById(id) {
    const url = `${prefix}/${id}`
    return axiosClient.delete(url)
  },

  updateAddress(id,data){
    const url = `${prefix}/${id}`
    return axiosClient.patch(url, data)
  }
}

export default addressApi
