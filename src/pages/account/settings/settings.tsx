import React, {useState} from "react";
import {Button, Card, Col, Form, Input, Menu, message, Radio, Row, Select, Space, Tabs, Upload} from "antd";
import styles from './style.less';
import BaseView from "@/pages/account/settings/components/base";
import NotificationView from "@/pages/account/settings/components/notification";

const {Item} = Menu;

type SettingsStateKeys = 'base' | 'notification';
const Settings: React.FC<{}> = () => {
  // const [form] = Form.useForm();
  const mode = 'inline';
  const [selectKey, setSelectKey] = useState<any>('base');
  const menuMap = {
    base: (
      "基本设置"
    ),
    notification: (
      "消息通知"
    ),
  };
  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  const getRightTitle = () => {
    return menuMap[selectKey];
  };
  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'notification':
        return <NotificationView />;
      default:
        break;
    }

    return null;
  };
  return (
    <>
      <Card>

          <div
            className={styles.main}
          >
            <div className={styles.leftMenu}>
              <Menu
                mode={mode}
                selectedKeys={[selectKey]}
                onClick={({key}) => setSelectKey(key as SettingsStateKeys)}
              >
                {getMenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{getRightTitle()}</div>
              {renderChildren()}
            </div>
          </div>

      </Card>
    </>
  )
}
export default Settings;
