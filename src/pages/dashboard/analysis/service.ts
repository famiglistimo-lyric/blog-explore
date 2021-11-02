import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function chartData() {
  return request('/api/chartData');
}
