import React, {useEffect, useState} from "react";
import {
  Button, Card, Col, Descriptions, Form, Input, message, PageHeader, Popconfirm,
  Row, Space, Spin, Table
} from "antd";
import './style.less';
import {deleteTechnicalSupport, pageTechnicalSupport} from "@/pages/support/technical-support/service";
import {TechnicalSupportItem} from "@/pages/support/technical-support/data";

const TechnicalSupport: React.FC<{}> = () => {

  const [form] = Form.useForm();
  const [spin, setSpin] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<TechnicalSupportItem[]>([]);
  const initialPage = 1;
  const initialPageSize = 5;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  const [realName, setRealName] = useState<string | undefined>(undefined);
  const [cardList, setCardList] = useState<any>([]);
  const columns = [
    {
      title: '名字',
      dataIndex: 'realName',
      valueType: 'textarea',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        let title = "您确定要删除'" + record.nickname + "'这位小伙伴吗？"
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
      let values = {
        page, pageSize, realName
      }
      pageTechnicalSupport(values).then(r => {
        setDataSource(r.obj.records)
        setTotal(r.obj.total);
        showCardList(r.obj.records);
      })
    }
  }

  useEffect(() => {
    pageTechnicalSupport({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
      showCardList(r.obj.records);
    })
  }, [])

  const pageTechnicalSupportState = (values: TechnicalSupportItem) => {
    setSpin(true)
    setRealName(values.realName);
    pageTechnicalSupport(values).then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      showCardList(r.obj.records);
      setSpin(false);
    })
  }

  const resetPageTechnicalSupportState = () => {
    setSpin(true)
    setPage(initialPage);
    setPageSize(initialPageSize);
    pageTechnicalSupport().then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      showCardList(r.obj.records);
      setSpin(false)
    })
  }

  const cancel = () => {

  }

  const showDrawer = (id: number) => {

  };

  const confirm = (id: number) => {
    deleteTechnicalSupport(id).then(r => {
      message.success("删除成功");
      pageTechnicalSupport({page, pageSize}).then(r => {
        setDataSource(r.obj.records)
        setTotal(r.obj.total);
      })
    });
  }

  const showCardList = (records: any) => {
    let length = records.length;
    let finalCardList = [];
    for (let i = 0; i < length; i++) {
      let record = records[i];
      let avatar = {src:record.avatar}
      finalCardList.push(
        <Card className="right-card-item-wrapper">
        <PageHeader
          title={record.nickname}
          className="site-page-header"
          avatar={avatar}
        >
          <Descriptions>
            <Descriptions.Item label="姓名">{record.realName}</Descriptions.Item>
            <Descriptions.Item label="联系方式">
              <a>{record.contact}</a>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
            <Descriptions.Item label="职业">{record.profession}</Descriptions.Item>
            <Descriptions.Item label="备注">{record.remarks}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Card>
      )
    }
    setCardList(finalCardList)
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
            <Form onFinish={pageTechnicalSupportState} form={form}>
              <Row gutter={24}>
                <Col className="gutter-row" span={12}>
                  <div>
                    <Form.Item name="realName" label="名字" className="card-list-queryInput">
                      <Input/>
                    </Form.Item>
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <div className="card-list-button-wrapper">
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button onClick={() => {
                      form.resetFields();
                      resetPageTechnicalSupportState();
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
        <div className="right-card-items-wrapper">
          {cardList}
        </div>
      </Col>
    </Row>
  )
}
export default TechnicalSupport;
