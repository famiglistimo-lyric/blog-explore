import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, Row, Select, Space, Table, Tag} from "antd";
import {pageArticle} from './article'
import type {ArticleListItem} from './data.d';

const ArticleTableList: React.FC<{}> = () => {
  const inputStyle = {width: 250};
  const selectStyle = {width: 180};
  const ButtonStyle = {width: 80};
  const style = {display: 'flex', justifyContent: 'center'};
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
      dataIndex: 'views',
      render: (views: number) => (
        views ? <Tag color='#00E0FF' key={views} style={{borderRadius: '25px'}}>
          {views}
        </Tag> : null
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      valueType: 'textarea',
    },
  ];
  const [dataSource, setDataSource] = useState<ArticleListItem[]>([]);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [tag, setTag] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [total, setTotal] = useState<number>(0);
  const pagination = {
    current: page,
    pageSize: pageSize,
    total: total,
    showTotal: (total: number) => {
      return <div>总计：{total} 条</div>;
    },
    onChange: (page: number, pageSize: number | undefined) => {
      setPage(page);
      setPageSize(pageSize);
      let values = {
        title, status, category, tag, page, pageSize
      }
      pageArticleState(values)
    }
  }
  const pageArticleState = (values: ArticleListItem) => {
    setTitle(values.title);
    setStatus(values.status);
    setCategory(values.category);
    setTag(values.tag);
    pageArticle(values).then(r => {
      setDataSource(r.records);
      setTotal(r.total);
    })
  }
  useEffect(() => {
    pageArticle({page, pageSize}).then(r => {
      setDataSource(r.records)
      setTotal(r.total);
    })
  }, [])
  return (
    <PageContainer>
      <Space direction={"vertical"} style={{width: '100%'}}>
        <Card>
          <Form onFinish={pageArticleState}>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <Form.Item name="title" label="标题" style={inputStyle}>
                  <Input/>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="status" label="状态">
                  <Select placeholder="请选择文章状态" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="category" label="分类">
                  <Select placeholder="请选择分类" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item name="tag" label="标签">
                  <Select placeholder="请选择标签" style={selectStyle}>

                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="gutter-row" span={6} style={style} offset={18}>
                <Space size={"middle"}>
                  <Button type="primary" style={ButtonStyle} htmlType="submit">查询</Button>
                  <Button style={ButtonStyle}>重置</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card>
          <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={pagination}>
          </Table>
        </Card>
      </Space>
    </PageContainer>
  )
}
export default ArticleTableList;
