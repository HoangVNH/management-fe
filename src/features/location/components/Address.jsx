import { useEffect } from 'react'
import {
  getProvinceById,
  getDistrictById,
  getWardById,
  selectProvinceDetails,
  selectDistrictDetails,
  selectWardDetails
} from 'features/location/locationSlice'
import { useDispatch, useSelector } from "react-redux"
import { Spin } from 'antd'
import PropTypes from "prop-types"
const Address = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (props.address.provinceId
      && props.address.districtId
      && props.address.wardId) {
      dispatch(getProvinceById(props.address.provinceId))
      dispatch(getDistrictById(props.address.districtId))
      dispatch(getWardById(props.address.wardId))
    }
  }, [props.address, dispatch])
  const province_details = useSelector(selectProvinceDetails)
  const district_details = useSelector(selectDistrictDetails)
  const ward_details = useSelector(selectWardDetails)
  return (
    <>
      {province_details.name && district_details.name && ward_details.name
        ?
        <>
          {props.address.address} - {province_details.name} - {district_details.name} - {ward_details.name}
        </>
        : <Spin />
      }
    </>
  )
}

Address.propTypes = {
  address: PropTypes.object
}

export default Address