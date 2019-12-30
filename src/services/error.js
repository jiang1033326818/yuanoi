import request0 from '@/utils/request';

const request =request0.request

const baseUrl =request0.baseUrl

export default async function queryError(code) {
  return request(`/api/${code}`);
}
