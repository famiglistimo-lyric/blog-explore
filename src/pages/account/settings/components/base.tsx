import {UploadOutlined} from '@ant-design/icons';
import {Button, Input, Select, Upload, Form} from 'antd';
import React from 'react';
import styles from './BaseView.less';
import GeographicView from "@/pages/account/settings/components/GeographicView";
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

const {Option} = Select;
// const onChange = ({ fileList: newFileList }) => {
//   setFileList(newFileList);
// };

// const onPreview = async (file: { url: any; originFileObj: Blob; }) => {
//   let src = file.url;
//   if (!src) {
//     src = await new Promise(resolve => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file.originFileObj);
//       reader.onload = () => resolve(reader.result);
//     });
//   }
//   const image = new Image();
//   image.src = src;
//   const imgWindow = window.open(src);
//   imgWindow.document.write(image.outerHTML);
// };
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({avatar}: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      头像
    </div>

    <div className={styles.avatar}>
      <img src={avatar} alt="avatar"/>
    </div>
    <ImgCrop shape={"round"}>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined/>
            点击上传
          </Button>
        </div>
      </Upload>
    </ImgCrop>
  </>
);

const BaseView: React.FC<{}> = () => {

  const handleFinish = () => {

  }

  const getAvatarURL = () => {
    return "https://yi-blog.oss-cn-hangzhou.aliyuncs.com/ceshi/Screenshot_20210424_204530.jpg";
  }
  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="QQ"
            label={"QQ"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="wechat"
            label={"微信"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="email"
            label={"邮箱"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="nickname"
            label={"昵称"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="userSignature"
            label={"个性签名"}
            rules={[
              {
                required: true,
                message: "请输入个人简介",
              },
            ]}
          >
            <Input.TextArea
              placeholder={"个性签名"}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="country"
            label={"国家或地区"}
            rules={[
              {
                required: true,
                message: "请输入您的国家或地区!"
              },
            ]}
          >
            <Select style={{maxWidth: 220}}>
              <Option value="China">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="geographic"
            label={"地理位置"}
            rules={[
              {
                required: true,
                message: "请输入您的地理位置!"
              },
            ]}
          >
            <GeographicView/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={getAvatarURL()}/>
      </div>
    </div>

  );
}

export default BaseView;
