import axiosClient from "./axiosClient"

const prefix = "order"

const orderApi = {
    insertOrder(data) {
        const url = prefix
        return axiosClient.post(url, data)
    }
}

export default orderApi