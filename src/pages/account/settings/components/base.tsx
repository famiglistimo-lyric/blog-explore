import {UploadOutlined} from '@ant-design/icons';
import {Button, Input, Upload, Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './BaseView.less';
import GeographicView from "@/pages/account/settings/components/GeographicView";
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {getUser, saveUser} from "@/pages/account/settings/service";
import {getPolicy} from "@/services/utils";


const BaseView: React.FC<{}> = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [avatar, setAvatar] = useState<string>("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")
  const [banner,setBanner] = useState<string>("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")
  const [ossData, setOssData] = useState<any>({});
  const [form] = Form.useForm();

  useEffect(() => {
    // todo 登录写完就改这个
    getUser(1).then(r => {
      if (typeof (r.obj.avatar) != "undefined" && r.obj.avatar != "" && r.obj.avatar != null) {
        setAvatar(r.obj.avatar);
      }
      if (typeof (r.obj.banner) != "undefined" && r.obj.banner != "" && r.obj.banner != null) {
        setBanner(r.obj.banner);
      }
      form.setFieldsValue(r.obj)
    });
  }, []);

  const onAvatarChange = ({fileList}: any) => {
    setFileList(fileList);
    if (fileList[0].status === "done") {
      let avatarUrl = ossData.host + "/" + ossData.dir + ossData.UUID + fileList[0].name
      setAvatar(avatarUrl)
      setFileList([])
    }
  };

  const onBannerChange = ({fileList}: any) => {
    setFileList(fileList);
    if (fileList[0].status === "done") {
      let bannerUrl = ossData.host + "/" + ossData.dir + ossData.UUID + fileList[0].name
      setBanner(bannerUrl)
      setFileList([])
    }
  };

  const handleFinish = (values: any) => {
    values.avatar = avatar;
    values.banner = banner;
    saveUser(values).then(r => {
      if (r.success) {
        // todo 登录写完就改这个
        message.success(r.msg);
        getUser(1).then(r => {
          form.setFieldsValue(r.obj)
        });
      } else {
        message.error(r.msg);
      }
    })
  };

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

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item
            name="id"
            label={"id"}
            hidden={true}
          ><Input/>
          </Form.Item>
          <Form.Item
            name="qq"
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
      <div className={styles.middle}>
        <div className={styles.avatar_title}>
          头像
        </div>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar"/>
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
            <div className={styles.button_view}>
              <Button>
                <UploadOutlined/>
                点击上传
              </Button>
            </div>
          </Upload>
        </ImgCrop>
      </div>
      <div className={styles.right}>
        <div className={styles.banner_title}>
          首页图片
        </div>
        <div className={styles.banner}>
          <img src={banner} alt="banner"/>
        </div>
        <Upload
          name={"file"}
          action={"https://yi-blog.oss-cn-hangzhou.aliyuncs.com"}
          multiple={true}
          showUploadList={false}
          data={getExtraData}
          fileList={fileList}
          onChange={onBannerChange}
          beforeUpload={beforeUpload}
        >
          <div className={styles.button_view}>
            <Button>
              <UploadOutlined/>
              点击上传
            </Button>
          </div>
        </Upload>
      </div>
    </div>
  );
}

export default BaseView;
