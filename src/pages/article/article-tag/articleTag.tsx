import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  message,
  Popconfirm,
} from "antd";
import {ArticleTagItem, OneArticleTag} from "@/pages/article/article-tag/data";
import {deleteTag, pageTag, saveTag} from "@/pages/article/article-tag/tag";
import ButtonGroup from "antd/es/button/button-group";

const ArticleTag: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: {offset: 0, span: 24},
  };
  const [spin, setSpin] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ArticleTagItem[]>([]);
  const initialPage = 1;
  const initialPageSize = 10;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  //控制按钮组:0新增,1修改
  const [buttonControl, setButtonControl] = useState<number>(0);
  const [tagAction, setTagAction] = useState<string>("添加标签")
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
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        let title = "您确定要删除'" + record.name + "'该标签吗？"
        return (
          <Space size="middle">
            <a onClick={() => tagEdit(record.id, record.name)}>编辑</a>
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

  const tagEdit = (id: number, name: string) => {
    //执行编辑的逻辑
    setButtonControl(1);
    setTagAction("编辑标签");
    form.setFieldsValue({id: id, name: name});
  }

  const confirm = (id: number) => {
    deleteTag(id).then(r => {
      message.success("删除成功");
      pageTag({page, pageSize}).then(r => {
        setDataSource(r.obj.records)
        setTotal(r.obj.total);
      })
    });
  }
  const success = (result: string) => {
    pageTag({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
    })
    message.success(result);
    form.setFieldsValue({name: null});
  };

  const error = (result: string) => {
    message.warning(result);
  };
  const onFinish = (values: OneArticleTag) => {
    // 保存还是修复的flag,如果是保存,清空表单的值
    let flag = 0;
    if (values.id != null) {
      // 修改
      flag = 1;
    }
    setSpin(true)
    saveTag(values).then(r => {
      if (r.success) {
        success(r.msg);
        setSpin(false)
      } else {
        error(r.msg);
        setSpin(false)
      }
    });
    if (flag === 0) {
      // 保存的话 清空
      form.setFieldsValue({id: null, name: null});
    }
  }
  const cancel = () => {

  }
  const displayButton = () => {
    if (buttonControl == 0) {
      // 新增
      return null;
    }
    if (buttonControl == 1) {
      // 修改
      return (
        <Button type="dashed" onClick={() => {
          setButtonControl(0);
          setTagAction("添加标签");
          form.setFieldsValue({id: null, name: null});
        }}>返回添加</Button>
      )
    }
    return null;
  }

  return (
    <Row gutter={24}>
      <Col span={14}>
        <Card title="标签列表" bordered={false}>
          <Spin spinning={spin}>
            <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={pagination}>

            </Table>
          </Spin>
        </Card>
      </Col>
      <Col span={10}>
        <Card title={tagAction} bordered={false}>
          <Spin spinning={spin}>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Form.Item name="name" label="标签名称：">
                <Input/>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <ButtonGroup>
                  <Button htmlType="submit" type="primary">
                    保存
                  </Button>
                  {displayButton()}
                </ButtonGroup>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
}
export default ArticleTag;
