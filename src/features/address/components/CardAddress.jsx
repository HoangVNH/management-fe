import { Card, Row, Col, Typography, Modal, Tag } from 'antd'
import ButtonUI from '../../../components/UIKit/ButtonUI'
import { setDefaultAddress, deleteAddress, selectDefaultAddress } from '../addressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import PropTypes from "prop-types"

// import Address from '../../location/components/Address'
const { Text } = Typography

const CardAddress = (props) => {
    const dispatch = useDispatch()
    const default_address = useSelector(selectDefaultAddress)
    const handleSetDefault = () => {
        dispatch(setDefaultAddress(props.address))
    }
    const handleDelete = () => {
        setVisibilityDelete(true)
    }
    const handleConfirmDelete = () => {
        dispatch(deleteAddress(props.address.id))
        setVisibilityDelete(false)
    }
    const handleCancelDelete = () => {
        setVisibilityDelete(false)
    }

    const [visibilityDelete, setVisibilityDelete] = useState(false)

    return (
        <Card className="mb-4 shadow-sm border">
            <Modal
                title="Xóa địa chỉ"
                visible={visibilityDelete}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                footer={[
                    <ButtonUI text="Quay lại" variant="light" key="back" onClick={handleCancelDelete} />,
                    <ButtonUI text="Xóa" variant="danger" key="submit" onClick={handleConfirmDelete} />
                ]}
            >
                Bạn có chắc chắn muốn xóa địa chỉ này ?
            </Modal>
            <Row >
                {/* Name */}
                <Col span={10}>
                    <Text strong>
                        Tên:
                    </Text>
                </Col>
                <Col>
                    <Text> {props.address.name}</Text>
                </Col>
            </Row>
            {/* Phone */}
            <Row >
                <Col span={10}>
                    <Text strong>
                        Số điện thoại:
                    </Text>
                </Col>
                <Col>
                    <Text>{props.address.phone}</Text>
                </Col>
            </Row>
            {/* Address */}
            <Row >
                <Col span={10}>
                    <Text strong>
                        Địa chỉ:
                    </Text>
                </Col>
                <Col>
                    <Text> {props.address.address} - {props.address.ward.name} - {props.address.district.name} - {props.address.province.name}  </Text>
                    {/* <Text><Address address={props.address} /></Text> */}
                </Col>
            </Row>
            {default_address.id === props.address.id
                ?
                <Tag className="mt-3" color="orange">Địa chỉ mặc định</Tag>
                :
                <Row className="mt-5" type="flex" justify="center">
                    <ButtonUI className="mx-1 my-1" variant="light" text="Đặt làm mặc định"
                        onClick={handleSetDefault}
                    />
                    <ButtonUI className="mx-1 my-1" variant="danger" text="Xóa" onClick={handleDelete} />
                </Row>
            }
        </Card>
    )
}

CardAddress.propTypes = {
    address: PropTypes.object
}


export default CardAddress