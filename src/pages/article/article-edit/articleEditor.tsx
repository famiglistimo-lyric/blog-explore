import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, Row, Select, Space, Table} from "antd";

const AllArticleTableList: React.FC<{}> = () => {
  // let articlePage = {
  //   page: 1,
  //   size: 10
  // }

  const inputStyle = {width: 250};
  const selectStyle = {width: 180};
  const ButtonStyle = {width: 80};
  const style = {display: 'flex', justifyContent: 'center'};
  const dataSource = [
    {
      key: '1',
      title: '胡彦斌',
      state: 32,
      tag: '西湖区湖底公园1号',
    },
    {
      key: '2',
      title: '胡彦祖',
      state: 42,
      tag: '西湖区湖底公园1号',
    },
  ];
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'textarea',
    },
    {
      title: '分类',
      dataIndex: 'category',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'tag',
      valueType: 'textarea',
    },
    {
      title: '评论数',
      dataIndex: 'commentCounts',
      valueType: 'textarea',
    },
    {
      title: '访问数',
      dataIndex: 'visitCounts',
      valueType: 'textarea',
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      valueType: 'textarea',
    },
  ];
  // @ts-ignore
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
          <Table columns={columns} dataSource={dataSource}>

          </Table>
        </Card>
        <Card>
          <Table columns={columns} dataSource={dataSource}>

          </Table>
        </Card>
      </Space>
    </PageContainer>
  )
}
export default AllArticleTableList;
