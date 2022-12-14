import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Table,
  Skeleton,
  Typography,
  BackTop,
  Row,
  Col,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import ButtonUI from "../../components/UIKit/ButtonUI";
import {
  getOrderList,
  selectOrderList,
  selectPageSizeOrder,
  selectStatusSelected,
  setStatusSelected,
  selectUpdateStatus,
} from "../../stores/order.slice";

import Date from "../../helpers/Date";
import Status from "../../components/UIKit/Status";
import ModalStatus from "./ModalStatus";

const { Column } = Table;
const { Text } = Typography;

const TableOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderList);
  const pageSize = useSelector(selectPageSizeOrder);
  const statusSelected = useSelector(selectStatusSelected);
  const requesting_updateStatus = useSelector(selectUpdateStatus);
  useEffect(() => {
    const data = {
      limit: 10,
      page: 1,
      status: 1,
    };
    dispatch(getOrderList(data));
    dispatch(setStatusSelected(1));
  }, [dispatch]);

  // Handle update status order
  const [idSelected, setIdSelected] = useState("");
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false);
  const modalUpdateCallback = useCallback(
    (val) => {
      setVisibleModalUpdate(val);
    },
    [setVisibleModalUpdate]
  );

  const handleUpdate = (id) => {
    setIdSelected(id);
    setVisibleModalUpdate(true);
  };

  const handlePagination = (e) => {
    const data = {
      limit: 10,
      page: e,
      status: statusSelected,
    };
    dispatch(getOrderList(data));
  };

  return (
    <>
      <ModalStatus
        id={idSelected}
        visible={visibleModalUpdate}
        setVisibility={modalUpdateCallback}
      />
      <Card className="border-small shadow-small mt-4 rounded-3">
        <Table
          dataSource={orders.map((category) => ({
            ...category,
            key: category?.id,
          }))}
          scroll={{ x: 1036 }}
          pagination={{
            total: pageSize,
            onChange: (e) => {
              handlePagination(e);
            },
          }}
          locale={{
            emptyText: orders ? <Skeleton /> : "",
          }}
        >
          {orders.length > 0 ? (
            <>
              <Column
                title={<Text strong>STT</Text>}
                dataIndex="index"
                key="index"
                render={(value, item, index) => 1 + index}
              />

              <Column
                title={<Text strong>Th??ng tin ????n h??ng </Text>}
                dataIndex="name"
                render={(text, record) => (
                  <Text>
                    <Text strong>ID:</Text> {record.id}
                    <br />
                    {record.totalPrice > 0 ? (
                      <>
                        <Text strong>Th??nh ti???n: </Text>
                        {"  "}{" "}
                        {record.totalPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    <Text strong> Ng??y l???p: </Text>{" "}
                    <Date date={record.createdAt} />
                  </Text>
                )}
              />
              <Column
                title={<Text strong>Th??ng tin kh??ch h??ng</Text>}
                dataIndex="name"
                render={(text, record) => (
                  <Text>
                    <Text strong> ID: </Text> {record.customer.id} <br />
                    <Text strong> Email: </Text> {record.customer.email} <br />
                  </Text>
                )}
              />
              <Column
                title={<Text strong>Ghi ch??</Text>}
                dataIndex="description"
                render={(text, record) => <Text>{record.note}</Text>}
              />
              <Column
                title={<Text strong>Tr???ng th??i</Text>}
                dataIndex="name"
                render={(text, record) => (
                  <>
                    {requesting_updateStatus ? (
                      <Spin />
                    ) : (
                      <Status status={record.status} />
                    )}
                  </>
                )}
              />
              <Column
                title={
                  <Row className="d-flex" justify="end">
                    <Text strong>T??y ch???n</Text>
                  </Row>
                }
                dataIndex="LandOwnerName"
                render={(text, record) => (
                  <Row className="d-flex" justify="end" gutter={10}>
                    <Col>
                      <ButtonUI
                        text="Thay ?????i tr???ng th??i"
                        onClick={() => handleUpdate(record.id)}
                      />
                      <br />
                    </Col>
                  </Row>
                )}
              />
            </>
          ) : (
            <Skeleton />
          )}
        </Table>
        <BackTop style={{ right: "5%" }} />
      </Card>
    </>
  );
};

export default TableOrders;
