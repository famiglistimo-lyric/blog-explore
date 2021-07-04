import React, {useState} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Row, Select, Space, Table} from "antd";
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
import {saveArticle} from "@/pages/article/article-all/article";

const PLUGINS = undefined;
MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
});
const AllArticleTableList: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const [articleContent, setArticleContent] = useState<any>("");
  const [taskLists, setTaskLists] = useState<any>(null);
  const [mdEditor, setMdEditor] = useState<any>(null);
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
  const handleImageUpload = (file: File,callback:any) => {
    console.log("大家好啊");
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

  function renderHTML(text: string) {
    return mdParser.render(text);
  }

  const onFinish = (values: any) => {
    let title = values.title;
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
    let article = {
      title: title, content: markdownContent, status: 1
      , categoryId: 1, tagList: [{id: 9}], stamp: true, comments: true, recommend: true, appreciate: true
    };
    saveArticle(article).then(r => {
      if (r.success) {
        message.success(r.msg)
        form.resetFields();
        setArticleContent("");
      } else {
        message.warn(r.msg);
      }
    })
  }
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="title">
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <Input placeholder="文章标题" style={{width: 600, marginRight: "13px"}}/>
            <Button htmlType="submit" type="primary" style={{marginRight: "13px"}}>保存</Button>
            <Button htmlType="submit" type="primary" style={{marginRight: "13px"}}>存为草稿</Button>
          </div>
        </Form.Item>
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
    </>


  )
}
export default AllArticleTableList;
