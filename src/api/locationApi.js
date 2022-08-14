import axiosClient from "./axiosClient"

const locationApi = {
  getProvinces() {
    const url = `provinces?page=1&limit=63`
    return axiosClient.get(url)
  },
  getDistricts(provinceId) {
    const url = `districts?provinceId=${provinceId}`
    return axiosClient.get(url)
  },
  getWards(districtId) {
    const url = `wards?districtId=${districtId}`
    return axiosClient.get(url)
  },
  getProvinceById(id) {
    const url = `provinces/${id}`
    return axiosClient.get(url)
  },
  getDistrictById(id) {
    const url = `districts/${id}`
    return axiosClient.get(url)
  },
  getWardById(id) {
    const url = `wards/${id}`
    return axiosClient.get(url)
  }
}

export default locationApi
