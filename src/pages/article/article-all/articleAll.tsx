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
import {getArticle, listCategory, listTag, pageArticle, saveArticle} from './article'
import type {Article, ArticleListItem, CategorySelectItem, TagSelectItem} from './data.d';

const ArticleTableList: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const inputStyle = {width: 250};
  const selectStyle = {width: 180};
  const ButtonStyle = {width: 80};
  const tailLayout = {
    wrapperCol: {offset: 2, span: 24},
  };
  const style = {display: 'flex', justifyContent: 'center'};
  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
  };
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (title: string) => {
        let finalTitle = title;
        if (title.length > 15) {
          finalTitle = title.substring(0, 15) + "...";
        }
        return <a>{finalTitle}</a>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: any) => {
        let badgeStatus: any = "#2ed573";
        let badgeText: string = '已发布';
        if (status === false) {
          //草稿状态
          badgeStatus = 'magenta';
          badgeText = '草稿';
        }
        return <Badge color={badgeStatus} text={badgeText}/>
      }
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (category: any) => (
        category ? <Tag color='blue' key={category.id}>
          {category.name}
        </Tag> : null
      ),
    },
    {
      title: '标签',
      dataIndex: 'tagList',
      render: (tagList: any) => (
        <>
          {tagList.map((tag: any) => {
            return <Tag color='cyan' key={tag.id}>
              {tag.name}
            </Tag>
          })}
        </>
      ),
    },
    {
      title: '评论数',
      dataIndex: 'commentCounts',
      render: (commentCounts: number) => (
        <Tag color='#ffa502' key={commentCounts} style={{borderRadius: '25px'}}>
          {commentCounts}
        </Tag>
      ),
    },
    {
      title: '访问数',
      dataIndex: 'views',
      render: (views: number) => (
        <Tag color='#00E0FF' key={views} style={{borderRadius: '25px'}}>
          {views}
        </Tag>
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
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>编辑</a>
          <a onClick={() => {
            showDrawer(record.id)
          }}>设置</a>
        </Space>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState<ArticleListItem[]>([]);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [categorySelectItems, setCategorySelectItems] = useState<any[] | undefined>(undefined);
  const [tagSelectItems, setTagSelectItems] = useState<any[] | undefined>(undefined);
  const [tagList, setTagList] = useState<any[] | undefined>(undefined);
  const [tag, setTag] = useState<number | undefined>(undefined);
  const initialPage = 1;
  const initialPageSize = 10;
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number | undefined>(initialPageSize);
  const [total, setTotal] = useState<number>(0);
  const [spin, setSpin] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
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

  const success = (result: string) => {
    message.success(result);
    pageArticle({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
    })
  };

  const error = (result: string) => {
    message.warning(result);
  };

  const pageArticleState = (values: ArticleListItem) => {
    setSpin(true)
    setTitle(values.title);
    setStatus(values.status);
    setCategory(values.category);
    setTag(values.tag);
    pageArticle(values).then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      setSpin(false);
    })
  }

  const putArticle = (values: Article) => {
    let finalTagList: any = [];
    values.tagList.map((tag: any) => {
      // 如果是数据存在的tag是传的id,如果是数据库不存在的tag是传的新添加的标签
      if (tagList !== undefined) {
        tagList.map((item: any) => {
          if (item.id === tag) {
            finalTagList.push({id: item.id, name: item.name})
          }
        })
        if (typeof tag === 'string') {
          finalTagList.push({id: null, name: tag})
        }
      } else {
        // 数据库没有标签的情况
        finalTagList.push({id: null, name: tag})
      }
    })
    values.tagList = finalTagList;
    saveArticle(values).then(r => {
      if (r.success) {
        onClose();
        success(r.msg);
      }else{
        error(r.msg);
      }
    });
  }

  const resetPageArticleState = () => {
    setSpin(true)
    setPage(initialPage);
    setPageSize(initialPageSize);
    pageArticle().then(r => {
      setDataSource(r.obj.records);
      setTotal(r.obj.total);
      setSpin(false)
    })
  }

  const showDrawer = (id: number) => {
    setDrawerVisible(true)
    getArticle(id).then(r => {
      if (r.obj.status === false) {
        r.obj.status = 0;
      }
      if (r.obj.status === true) {
        r.obj.status = 1;
      }
      let finalList: any = [];
      r.obj.tagList.map((item: any) => {
        finalList.push(item.id)
      })
      r.obj.tagList = finalList;
      drawerForm.setFieldsValue(r.obj);
    })
  };

  const onClose = () => {
    setDrawerVisible(false)
    drawerForm.setFieldsValue(null);
  };

  useEffect(() => {
    pageArticle({page, pageSize}).then(r => {
      setDataSource(r.obj.records)
      setTotal(r.obj.total);
    })
    listCategory().then(r => {
      let categorySelectItems: any = [];
      r.obj.map((item: CategorySelectItem) => {
        categorySelectItems.push(<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
      })
      setCategorySelectItems(categorySelectItems);
    })
    listTag().then(r => {
      let tagSelectItems: any = [];
      r.obj.map((item: TagSelectItem) => {
        tagSelectItems.push(<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
      })
      setTagSelectItems(tagSelectItems);
      setTagList(r.obj);
    })
  }, [])
  return (
    <>
      <PageContainer>
        <Space direction={"vertical"} style={{width: '100%'}}>
          <Card>
            <Form onFinish={pageArticleState} form={form}>
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item name="title" label="标题" style={inputStyle}>
                    <Input/>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item name="status" label="文章状态">
                    <Select placeholder="请选择文章状态" style={selectStyle}>
                      <Select.Option key={0} value={0}>草稿</Select.Option>
                      <Select.Option key={1} value={1}>已发布</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item name="categoryId" label="文章分类">
                    <Select placeholder="请选择分类" style={selectStyle}>
                      {categorySelectItems}
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item name="tagId" label="文章标签">
                    <Select placeholder="请选择标签" style={selectStyle}>
                      {tagSelectItems}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className="gutter-row" span={6} style={style} offset={18}>
                  <Space size={"middle"}>
                    <Button type="primary" style={ButtonStyle} htmlType="submit">查询</Button>
                    <Button style={ButtonStyle} onClick={() => {
                      form.resetFields();
                      resetPageArticleState();
                    }}>重置</Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card>
            <Spin spinning={spin}>
              <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={pagination}>

              </Table>
            </Spin>
          </Card>
        </Space>
      </PageContainer>
      <Drawer
        title="文章设置"
        placement="right"
        closable={true}
        onClose={onClose}
        destroyOnClose={true}
        visible={drawerVisible}
        width={490}
        style={{position: 'absolute'}}
      >
        <Form {...layout} form={drawerForm} onFinish={putArticle}>
          <Form.Item name="id" label="文章id" hidden={true}>
            <Input/>
          </Form.Item>
          <Form.Item name="title" label="文章标题">
            <Input/>
          </Form.Item>
          <Form.Item name="status" label="文章状态">
            <Select placeholder="请选择状态">
              <Select.Option key={0} value={0}>草稿</Select.Option>
              <Select.Option key={1} value={1}>已发布</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="categoryId" label="文章分类">
            <Select placeholder="请选择分类">
              {categorySelectItems}
            </Select>
          </Form.Item>
          <Form.Item name="tagList" label="文章标签">
            <Select mode="tags" placeholder="选择或输入标签">
              {tagSelectItems}
            </Select>
          </Form.Item>
          <Form.Item name="stamp" label="是否原创">
            <Radio.Group>
              <Radio value={true}>原创</Radio>
              <Radio value={false}>转载</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="comments" label="开启评论">
            <Radio.Group>
              <Radio value={true}>开启</Radio>
              <Radio value={false}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="recommend" label="是否推荐">
            <Radio.Group>
              <Radio value={true}>推荐</Radio>
              <Radio value={false}>不推荐</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="appreciate" label="是否赞赏">
            <Radio.Group>
              <Radio value={true}>可赞赏</Radio>
              <Radio value={false}>不可赞赏</Radio>
            </Radio.Group>
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
export default ArticleTableList;
