import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  Col, Form, Input, message, Popconfirm,
  Row, Select, Space, Spin, Table, Tag,
} from "antd";
import './style.less';
import {ArticleTagItem} from "@/pages/article/article-tag/data";
import {deleteTag, pageTag} from "@/pages/article/article-tag/service";

const TechnicalSupport: React.FC<{}> = () => {

  const [form] = Form.useForm();
  const [spin, setSpin] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ArticleTagItem[]>([]);
  const initialPage = 1;
  const initialPageSize = 5;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      render: (name: string) => {
        let finalName = name;
        if (name.length > 15) {
          finalName = name.substring(0, 15) + "...";
        }
        return finalName;
      }
    },
    {
      title: '文章数',
      dataIndex: 'articleCounts',
      render: (articleCounts: number) => (
        <Tag color='#1e90ff' key={articleCounts} style={{borderRadius: '25px'}}>
          {articleCounts}
        </Tag>
      ),
    },
    {
      title: '名字',
      dataIndex: 'realName',
      render: (articleCounts: number) => (
        articleCounts ? <Tag color='#1e90ff' key={articleCounts} style={{borderRadius: '25px'}}>
          {articleCounts}
        </Tag> : null
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      render: (articleCounts: number) => (
        <Tag color='#1e90ff' key={articleCounts} style={{borderRadius: '25px'}}>
          {articleCounts}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        let title = "您确定要删除'" + record.nickName + "'这位小伙伴吗？"
        return (
          <Space size="middle">
            <a onClick={() => {
              showDrawer(record.id)
            }}>设置</a>
            <Popconfirm
              title={title}
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>

          </Space>
        )
      }
    },
  ];

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
      pageTag({page, pageSize}).then(r => {
        setDataSource(r.obj.records)
        setTotal(r.obj.total);
      })
    }
  }

  useEffect(() => {
    pageTag({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
    })
  }, [])

  const cancel = () => {

  }

  const showDrawer = (id: number) => {

  };

  const confirm = (id: number) => {

  }

  const pageTechnicalSupport = () => {

  }

  return (
    <Row gutter={24}>
      <Col span={10}>
        <div>
          <Card title="技术支持" bordered={false}>
            <div className="card-word-wrapper">
              <p>寒舍已备一壶浊酒</p>
              <p>等君来慰三千风尘</p>
            </div>
          </Card>
        </div>
        <div>
          <Card bordered={true} className="card-list-wrapper">
            <Form onFinish={pageTechnicalSupport} form={form}>
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <div className="card-list-button-wrapper">
                    <div>
                      <Form.Item name="realName" label="名字" className="card-list-queryInput">
                        <Input/>
                      </Form.Item>

                    </div>
                      <Button type="primary" htmlType="submit">查询</Button>
                      <Button onClick={() => {
                        form.resetFields();
                      }}>重置</Button>
                      <Button onClick={() => {

                      }}>新增</Button>

                  </div>
                </Col>
              </Row>
            </Form>
            <Spin spinning={spin}>
              <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={pagination}>

              </Table>
            </Spin>
          </Card>
        </div>

      </Col>
      <Col span={14}>
        <div>dasdasdasdas</div>
      </Col>
    </Row>
  )
}
export default TechnicalSupport;
