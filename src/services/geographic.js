import request0 from '@/utils/request';

const request =request0.request

const baseUrl =request0.baseUrl

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
