import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, Row, Select, Space, Table} from "antd";


const AllArticleTableList: React.FC<{}> = () => {
  const inputStyle = {width: 250};
  const selectStyle = {width: 180};
  const ButtonStyle = {width: 80};
  const style = { display: 'flex',justifyContent:'center'};
  const columns = [
    {
      title: '标题',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '分类',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '评论数',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '访问数',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '发布时间',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
  ];
  return (
    <PageContainer>
      <Space direction={"vertical"} style={{width: '100%'}}>
        <Card>
          <Form>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <Form.Item name="title" label="标题" style={inputStyle}>
                  <Input/>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="title" label="状态">
                  <Select placeholder="请选择文章状态" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="title" label="分类">
                  <Select placeholder="请选择分类" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="title" label="标签">
                  <Select placeholder="请选择标签" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
            </Row>
              <Row>
                <Col className="gutter-row" span={6} style={style} offset={18}>
                  <Space size={"middle"}>
                    <Button type="primary" style={ButtonStyle}>查询</Button>
                    <Button style={ButtonStyle}>重置</Button>
                  </Space>
                </Col>
              </Row>
          </Form>
        </Card>
        <Card>
          <Table columns={columns}>

          </Table>
        </Card>
      </Space>
    </PageContainer>
  )
}
export default AllArticleTableList;
