import axios from "axios";

const provincesApi = {
  listProvinces() {
    return axios({
      method: 'get',
      url: 'https://provinces.open-api.vn/api/p/',
      responseType: 'json'
    });
  },

  getDistricts(provinceCode) {
    return axios({
      method: 'get',
      url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      responseType: 'json'
    });
  },

  getWards(districtCode) {
    return axios({
      method: 'get',
      url: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
      responseType: 'json'
    });
  }
};

export default provincesApi;