import {Card, Col, DatePicker, Row, Tabs} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import React from 'react';
import numeral from 'numeral';
import type {VisitDataType} from '../data.d';
import {Bar} from './Charts';
import styles from '../style.less';

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const rankingListData: { title: string; total: number }[] = [];
rankingListData.push({
  title: "北京",
  total: 45,
}, {
  title: "杭州",
  total: 32,
}, {
  title: "上海",
  total: 17,
}, {
  title: "深圳",
  total: 12,
});

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const BlogCard = ({
                    rangePickerValue,
                    commentsData,
                    viewsData,
                    isActive,
                    handleRangePickerChange,
                    loading,
                    selectDate,
                  }: {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  commentsData: VisitDataType[];
  viewsData: VisitDataType[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                <span>今日</span>
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                <span>本周</span>
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                <span>本月</span>
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                <span>全年</span>
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{width: 256}}
            />
          </div>
        }
        size="large"
        tabBarStyle={{marginBottom: 24}}
      >
        <TabPane
          tab={"评论数"}
          key="sales"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={295}
                  title={"评论趋势"}
                  data={commentsData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <span>各城市评论数排名</span>
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span className={styles.rankingItemValue}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={"访问量"}
          key="views"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={292}
                  title={"访问量趋势"}
                  data={viewsData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <span>各城市访问量排名</span>
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span>{numeral(item.total).format('0,0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default BlogCard;
