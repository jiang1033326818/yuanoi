import request0 from '@/utils/request';

const request =request0.request

const baseUrl =request0.baseUrl

export async function menuOne() {
  return request('/api/menuone');
}

export async function menuTwo() {
  return request('/api/menutwo');
}

export async function menuThree() {
  return request('/api/menuthree');
}
