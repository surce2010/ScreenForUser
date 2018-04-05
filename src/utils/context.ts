export const PRODUCT = process.env.NODE_ENV === 'production';
export const context = '/cldPortal_new/';
export const RESCONTEXT = PRODUCT ? '/screen_new/' : '/';
export const SERVICE = PRODUCT ? 'http://axsh.campusphere.cn/cldPortal_new/' : 'http://axsh.campusphere.cn/cldPortal_new/';
export const baseURL = PRODUCT ? 'http://116.62.162.198:8080/data-open-web/do/api/realTimeQuery/call' : '/appsummary/call/'
export const WS = `${SERVICE}`;
