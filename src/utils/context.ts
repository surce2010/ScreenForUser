export const PRODUCT = process.env.NODE_ENV === 'production';
export const context = '/cldPortal_new/';
export const RESCONTEXT = PRODUCT ? '/screen_new/' : '/';
export const SERVICE = 'http://axsh.campusphere.cn/cldPortal_new/';
export const baseURL = 'http://axsh.campusphere.cn';
export const WS = `${SERVICE}`;
