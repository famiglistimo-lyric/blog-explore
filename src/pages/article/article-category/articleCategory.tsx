import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import {ArticleCategoryItem} from "@/pages/article/article-category/data";
import {pageCategory} from "@/pages/article/article-category/category";
import ButtonGroup from "antd/es/button/button-group";

const ArticleCategory: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: {offset: 0, span: 24},
  };
  const [spin, setSpin] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ArticleCategoryItem[]>([]);
  const initialPage = 1;
  const initialPageSize = 10;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  const columns = [
    {
      title: '名称',
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
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
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
    }
  }
  useEffect(() => {
    pageCategory({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
    })
  }, [])
  const onFinish = () => {

  }
  return (
    <PageContainer>
      <Row gutter={24}>
        <Col span={14}>
          <Card title="分类列表" bordered={false}>
            <Spin spinning={spin}>
              <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={pagination}>

              </Table>
            </Spin>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="添加分类" bordered={false}>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Form.Item name="name" label="分类名称：">
                <Input />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <ButtonGroup>
                  <Button htmlType="submit" type="primary">
                    保存
                  </Button>
                  <Button type="dashed">返回添加</Button>
                </ButtonGroup>

              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
export default ArticleCategory;
