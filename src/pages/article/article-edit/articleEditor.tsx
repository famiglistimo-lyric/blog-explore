import React, {useEffect, useState} from "react";
import {Button, Drawer, Form, Input, message, Radio, Select} from "antd";
// @ts-ignore
import MarkdownIt from 'markdown-it';
import MdEditor, {Plugins} from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// @ts-ignore
import emoji from 'markdown-it-emoji'
// @ts-ignore
import subscript from 'markdown-it-sub'
// @ts-ignore
import superscript from 'markdown-it-sup'
// @ts-ignore
import footnote from 'markdown-it-footnote'
// @ts-ignore
import deflist from 'markdown-it-deflist'
// @ts-ignore
import abbreviation from 'markdown-it-abbr'
// @ts-ignore
import insert from 'markdown-it-ins'
// @ts-ignore
import mark from 'markdown-it-mark';
// @ts-ignore
import tasklists from 'markdown-it-task-lists';
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-light.css';
import {getArticle, listCategory, listTag, saveArticle} from "@/pages/article/article-all/service";
import {useLocation} from 'react-router-dom'
import {getArticleDetail} from "@/pages/article/article-edit/service";
import './style.less';
import {Article, CategorySelectItem, TagSelectItem} from "@/pages/article/article-all/data";

const PLUGINS = undefined;
MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
});
const ArticleEditor: React.FC<{}> = () => {
  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 2, span: 24},
  };
  const location = useLocation();
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const [articleContent, setArticleContent] = useState<any>("");
  const [mdEditor, setMdEditor] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [categorySelectItems, setCategorySelectItems] = useState<any[] | undefined>(undefined);
  const [tagSelectItems, setTagSelectItems] = useState<any[] | undefined>(undefined);
  const [tagList, setTagList] = useState<any[] | undefined>(undefined);
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str: any, lang: any) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str, true).value
        } catch (__) {
        }
      }
      return ''
    },
  })
    //自定义插件
    .use(emoji)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    // todo
    .use(tasklists)
  const handleEditorChange = (it: { text: string; html: string }, event: any) => {
    // console.log('handleEditorChange', it.text, it.html, event);
    setArticleContent(it.text);
  };
  // 上传图片
  const handleImageUpload = (file: File, callback: any) => {
    return "";
    // return new Promise(resolve => {
    //   const reader = new FileReader();
    //   reader.onload = data => {
    //     // @ts-ignore
    //     resolve(data.target.result);
    //   };
    //   reader.readAsDataURL(file);
    // });
  };

  useEffect(() => {
    let articleId = location.state;
    if (typeof (articleId) != "undefined") {
      getArticleDetail(articleId).then(r => {
        setArticleContent(r.obj.content)
        form.setFieldsValue(r.obj)
      })
    }
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

  function renderHTML(text: string) {
    return mdParser.render(text);
  }

  const putArticle = (values: Article) => {
    let finalTagList: any = [];
    for (let i = 0; i < values.tagList.length; i++) {
      // 如果是数据存在的标签是传的id,如果是数据库不存在的标签是传的新添加的标签
      if (tagList !== undefined) {
        let flag = true;
        for (let j = 0; j < tagList.length; j++) {
          if (tagList[j].id === values.tagList[i]) {
            finalTagList.push({id: tagList[j].id, name: tagList[j].name});
            flag = false;
            break;
          }
        }
        if (flag) {
          finalTagList.push({id: null, name: values.tagList[i]})
        }
      } else {
        // 数据库没有标签的情况
        finalTagList.push({id: null, name: values.tagList[i]})
      }
    }
    values.tagList = finalTagList;
    saveArticle(values).then(r => {
      if (r.success) {
        onClose();
        success(r.msg);
      } else {
        error(r.msg);
      }
    });
  }

  const success = (result: string) => {
    message.success(result);
    listTag().then(r => {
      let tagSelectItems: any = [];
      r.obj.map((item: TagSelectItem) => {
        tagSelectItems.push(<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
      })
      setTagSelectItems(tagSelectItems);
      setTagList(r.obj);
    })
  };

  const error = (result: string) => {
    message.warning(result);
  };

  const onClose = () => {
    setDrawerVisible(false)
    drawerForm.setFieldsValue(null);
  };

  const showDrawer = (id: number) => {
    setDrawerVisible(true)
    if(typeof(id) == "undefined"){
      // 新增
      return;
    }
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

  const onFinish = (values: any) => {
    let title = values.title;
    let id = values.id;
    const markdownContent = mdEditor.getMdValue();
    let warnMessage = "";
    if (markdownContent === "") {
      warnMessage = "内容不允许为空。"
    }
    if (typeof (title) == "undefined" || title == "") {
      warnMessage += "标题不允许为空。"
    }
    if (warnMessage != "") {
      message.warn(warnMessage);
      return;
    }
    // 打开抽屉
    showDrawer(id);
    // let article = {
    //   title: title, content: markdownContent, status: 1
    //   , categoryId: 1, tagList: [{id: 9}], stamp: true, comments: true, recommend: true, appreciate: true
    // };
    // saveArticle(article).then(r => {
    //   if (r.success) {
    //     message.success(r.msg)
    //     form.resetFields();
    //     setArticleContent("");
    //   } else {
    //     message.warn(r.msg);
    //   }
    // })
  }
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <div style={{width: "100%", display: "flex", justifyContent: "center",margin:"18px 0 32px 0"}}>
          <Form.Item name="id" hidden={true}>
            <Input/>
          </Form.Item>
          <Form.Item name="title">
            <Input placeholder="文章标题" style={{width: 600, marginRight: "13px"}}/>
          </Form.Item>
          <Button htmlType="submit" type="primary" style={{marginRight: "13px"}}>保存</Button>
          <Button htmlType="submit" type="primary" style={{marginRight: "13px"}}>存为草稿</Button>
        </div>
      </Form>
      <div className="editor-wrap" style={{marginTop: '30px'}}>
        <MdEditor
          ref={node => setMdEditor(node)}
          style={{height: '500px', width: '100%'}}
          value={articleContent}
          renderHTML={renderHTML}
          plugins={PLUGINS}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            },
            table: {
              maxRow: 5,
              maxCol: 6,
            },
            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
          }}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>
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
            <Input placeholder={"文章标题"}/>
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
export default ArticleEditor;
