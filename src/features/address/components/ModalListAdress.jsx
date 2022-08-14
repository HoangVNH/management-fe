import { Modal, Row } from 'antd'
import CardAddress from './CardAddress'
import ButtonUI from 'components/UIKit/ButtonUI'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAddressList } from '../addressSlice'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from "prop-types"

const ModalListAddress = ({ setVisibility, visible }) => {
    const list_address = useSelector(selectAddressList)
    const handleOk = () => {
        setVisibility(false)
    }
    const handleCancel = () => {
        setVisibility(false)
    }


    return (
        <Modal
            title="Danh sách địa chỉ"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <ButtonUI text="Quay lại" variant="light" key="back" onClick={handleCancel} />,
                <ButtonUI text="Xác nhận" key="submit" onClick={handleOk} />
            ]}
        >
            {list_address && list_address.length > 0 ?
                <>{list_address.map((item) => {
                    return <CardAddress key={item.id} address={item} />
                })} </> : null}
            <Row className="mt-5" type="flex" justify="end">
                <Link to="/address/add">
                    <ButtonUI withIcon={<PlusOutlined />} variant="light" text="Thêm địa chỉ" />
                </Link>
            </Row>
        </Modal>
    )
}

ModalListAddress.propTypes = {
    setVisibility: PropTypes.func,
    visible: PropTypes.bool
}
export default ModalListAddress