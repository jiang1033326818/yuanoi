import request from '@/utils/request';

// const request =request0.request
//
// const baseUrl =request0.baseUrl

export async function query() {
  return request('/api/users');
}

// export async function queryCurrent() {
//   return request('/v1/user/profile',{
//     method: 'POST',
//     data:{}
//   });
// }
