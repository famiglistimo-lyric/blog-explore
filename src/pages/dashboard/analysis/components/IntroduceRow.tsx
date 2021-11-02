import {InfoCircleOutlined} from '@ant-design/icons';
import {Col, Row, Tooltip} from 'antd';

import {FormattedMessage} from 'umi';
import React from 'react';
import numeral from 'numeral';
import {ChartCard, MiniArea, MiniBar, MiniProgress, Field} from './Charts';
import type {CommentCardDataType, ReadDataType, ViewDataType, VisitDataType} from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {marginBottom: 24},
};

const IntroduceRow = ({loading, viewVisitData, readVisitData, commentCardData, viewData, readData}
                        : {
  loading: boolean; viewVisitData: VisitDataType[];
  readVisitData: VisitDataType[], commentCardData: CommentCardDataType;
  viewData: ViewDataType; readData: ReadDataType
}) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={"总评论数"}
        action={
          <Tooltip
            title={"评论数"}
          >
            <InfoCircleOutlined/>
          </Tooltip>
        }
        loading={loading}
        total={() => <>126560</>}
        footer={
          <Field
            label={"日评论数"}
            value={`${numeral(33).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{marginRight: 16}}>
          <span>周同比</span>
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <span>日同比</span>
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={"总访问量"}
        action={
          <Tooltip
            title={"访问量"}
          >
            <InfoCircleOutlined/>
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={
          <Field
            label={"日访问量"}
            value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={viewVisitData}/>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={"总阅读量"}
        action={
          <Tooltip
            title={"阅读量"}
          >
            <InfoCircleOutlined/>
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={
          <Field
            label={"日阅读量"}
            value="22"
          />
        }
        contentHeight={46}
      >
        <MiniBar data={readVisitData}/>
      </ChartCard>
    </Col>
    {/*<Col {...topColResponsiveProps}>*/}
    {/*  <ChartCard*/}
    {/*    loading={loading}*/}
    {/*    bordered={false}*/}
    {/*    title={*/}
    {/*      <FormattedMessage*/}
    {/*        id="dashboardandanalysis.analysis.operational-effect"*/}
    {/*        defaultMessage="Operational Effect"*/}
    {/*      />*/}
    {/*    }*/}
    {/*    action={*/}
    {/*      <Tooltip*/}
    {/*        title={*/}
    {/*          <FormattedMessage*/}
    {/*            id="dashboardandanalysis.analysis.introduce"*/}
    {/*            defaultMessage="Introduce"*/}
    {/*          />*/}
    {/*        }*/}
    {/*      >*/}
    {/*        <InfoCircleOutlined />*/}
    {/*      </Tooltip>*/}
    {/*    }*/}
    {/*    total="78%"*/}
    {/*    footer={*/}
    {/*      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>*/}
    {/*        <Trend flag="up" style={{ marginRight: 16 }}>*/}
    {/*          <FormattedMessage*/}
    {/*            id="dashboardandanalysis.analysis.week"*/}
    {/*            defaultMessage="Weekly Changes"*/}
    {/*          />*/}
    {/*          <span className={styles.trendText}>12%</span>*/}
    {/*        </Trend>*/}
    {/*        <Trend flag="down">*/}
    {/*          <FormattedMessage*/}
    {/*            id="dashboardandanalysis.analysis.day"*/}
    {/*            defaultMessage="Weekly Changes"*/}
    {/*          />*/}
    {/*          <span className={styles.trendText}>11%</span>*/}
    {/*        </Trend>*/}
    {/*      </div>*/}
    {/*    }*/}
    {/*    contentHeight={46}*/}
    {/*  >*/}
    {/*    <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />*/}
    {/*  </ChartCard>*/}
    {/*</Col>*/}
  </Row>
);

export default IntroduceRow;
