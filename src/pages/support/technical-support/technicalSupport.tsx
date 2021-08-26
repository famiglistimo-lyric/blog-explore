import React, {useEffect, useState} from "react";
import {
  Button, Card, Col, Descriptions, Drawer, Form, Input, message, PageHeader, Popconfirm,
  Row, Space, Spin, Table, Upload
} from "antd";
import './style.less';
import {
  deleteTechnicalSupport, getTechnicalSupport,
  pageTechnicalSupport,
  saveTechnicalSupport
} from "@/pages/support/technical-support/service";
import {TechnicalSupportItem} from "@/pages/support/technical-support/data";
import ImgCrop from "antd-img-crop";
import {UploadOutlined} from "@ant-design/icons/lib";
import {getPolicy} from "@/services/utils";
import 'antd/es/modal/style';
import 'antd/es/slider/style';

const TechnicalSupport: React.FC<{}> = () => {
  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 2, span: 24},
  };
  const initAvatar = "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const [spin, setSpin] = useState<boolean>(false);
  const [cardSpin, setCardSpin] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<TechnicalSupportItem[]>([]);
  const initialPage = 1;
  const initialPageSize = 5;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  const [realName, setRealName] = useState<string | undefined>(undefined);
  const [cardList, setCardList] = useState<any>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);
  const [avatar, setAvatar] = useState<string>(initAvatar)
  const [ossData, setOssData] = useState<any>({});
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
    setSpin(true);
    setCardSpin(true);
    setRealName(values.realName);
    pageTechnicalSupport(values).then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      showCardList(r.obj.records);
      setSpin(false);
      setCardSpin(false);
    })
  }

  const resetPageTechnicalSupportState = () => {
    setSpin(true)
    setCardSpin(true);
    setPage(initialPage);
    setPageSize(initialPageSize);
    pageTechnicalSupport().then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      showCardList(r.obj.records);
      setSpin(false)
      setCardSpin(false);
    })
  }

  const cancel = () => {

  }

  const showDrawer = (id?: number) => {
    if (id != null) {
      getTechnicalSupport(id).then(r => {
        setAvatar(r.obj.avatar)
        drawerForm.setFieldsValue(r.obj);
      })
    }
    setDrawerVisible(true)
  };

  const confirm = (id: number) => {
    deleteTechnicalSupport(id).then(r => {
      message.success("删除成功");
      pageTechnicalSupport({page, pageSize}).then(r => {
        setDataSource(r.obj.records);
        setTotal(r.obj.total);
        showCardList(r.obj.records);
      })
    });
  }

  const showCardList = (records: any) => {
    let length = records.length;
    let finalCardList = [];
    for (let i = 0; i < length; i++) {
      let record = records[i];
      let avatar = {src: record.avatar}
      finalCardList.push(
        <Card className="right-card-item-wrapper" key={i}>
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
  const onClose = () => {
    setDrawerVisible(false)
    setAvatar(initAvatar)
    drawerForm.resetFields();
  }

  const success = (result: string) => {
    message.success(result);
    pageTechnicalSupport({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
      showCardList(r.obj.records);
    })
  };

  const error = (result: string) => {
    message.warning(result);
  };

  const putTechnicalSupport = (values: any) => {
    values.avatar = avatar
    saveTechnicalSupport(values).then(r => {
      if (r.success) {
        onClose();
        success(r.msg);
      } else {
        error(r.msg);
      }
    });
  }

  const getExtraData = (file: any) => {
    return {
      key: ossData.dir + ossData.UUID + file.name,
      OSSAccessKeyId: ossData.accessId,
      policy: ossData.policy,
      signature: ossData.signature,
      host: ossData.host,
      dir: ossData.dir
    };
  }

  const beforeUpload = async (file: any) => {
    await getPolicy().then(r => {
      setOssData({
        policy: r.obj.policy,
        signature: r.obj.signature,
        expire: r.obj.expire,
        host: r.obj.host,
        accessId: r.obj.accessid,
        dir: r.obj.dir,
        UUID: r.obj.UUID
      });
    })
    return file;
  };

  const onAvatarChange = ({fileList}: any) => {
    setFileList(fileList);
    if (fileList[0].status === "done") {
      let avatarUrl = ossData.host + "/" + ossData.dir + ossData.UUID + fileList[0].name
      setAvatar(avatarUrl)
      setFileList([])
    }
  };

  return (
    <>
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
                        showDrawer()
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
            <Spin spinning={cardSpin}>
            {cardList}
            </Spin>
          </div>
        </Col>
      </Row>
      <Drawer
        title="技术支持设置"
        placement="right"
        closable={true}
        onClose={onClose}
        destroyOnClose={true}
        visible={drawerVisible}
        width={490}
        style={{position: 'absolute'}}
      >
        <Form {...layout} form={drawerForm} onFinish={putTechnicalSupport}>
          <Form.Item name="id" label="技术支持id" hidden={true}>
            <Input/>
          </Form.Item>
          <Form.Item name="nickname" label="昵称"
                     rules={[{required: true, message: '必须输入昵称!'}]}>
            <Input placeholder={"昵称"}/>
          </Form.Item>
          <Form.Item name="avatar" label="头像">
            <div>
              <div>
                <img className="drawer-img" src={avatar} alt="avatar"/>
              </div>
              <ImgCrop shape={"round"}>
                <Upload
                  name={"file"}
                  action={"https://yi-blog.oss-cn-hangzhou.aliyuncs.com"}
                  multiple={true}
                  showUploadList={false}
                  data={getExtraData}
                  fileList={fileList}
                  onChange={onAvatarChange}
                  beforeUpload={beforeUpload}
                >
                  <div className="upload-outlined-button_view">
                    <Button>
                      <UploadOutlined/>
                      点击上传
                    </Button>
                  </div>
                </Upload>
              </ImgCrop>
            </div>
          </Form.Item>
          <Form.Item name="realName" label="姓名">
            <Input placeholder={"姓名"}/>
          </Form.Item>
          <Form.Item name="contact" label="联系方式">
            <Input placeholder={"联系方式"}/>
          </Form.Item>
          <Form.Item name="technicalSupportWebsite" label="个人网站地址">
            <Input placeholder={"个人网站地址"}/>
          </Form.Item>
          <Form.Item name="profession" label="职业">
            <Input placeholder={"职业"}/>
          </Form.Item>
          <Form.Item name="remarks" label="备注">
            <Input.TextArea
              placeholder={"备注"}
              rows={4}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
export default TechnicalSupport;
