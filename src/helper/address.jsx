import { useEffect } from 'react'
import {
    getProvinceById,
    getDistrictById,
    getWardById,
    selectProvinceDetails,
    selectDistrictDetails,
    selectWardDetails
} from 'features/location/locationSlice'
import { Spin } from 'antd'
import { useDispatch, useSelector } from "react-redux"
const Address = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.address) {
            dispatch(getProvinceById(props.address.provinceId))
            dispatch(getDistrictById(props.address.districtId))
            dispatch(getWardById(props.address.wardId))
        }
    }, [])
    const province_details = useSelector(selectProvinceDetails)
    const district_details = useSelector(selectDistrictDetails)
    const ward_details = useSelector(selectWardDetails)
    return (
        <>
            {props.address 
                ?
                <>
                    {props.address.address} - {province_details.name} - {district_details.name} - {ward_details.name}
                </>
                : <Spin />
            }
        </>
    )
}

export default Address