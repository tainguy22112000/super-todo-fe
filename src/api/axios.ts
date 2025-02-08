import axios from 'axios';
import { API_URL } from '@/api/url';

export const originAxios = axios.create({
  baseURL: API_URL
});

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// axiosInstance.interceptors.request.use(async (request) => {
//   const accessToken = await getAccessToken();
//   if (accessToken) {
//     request.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return request;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const refreshToken = await getRefreshToken();
//       axiosInstance
//         .post(`${API_URL}/api/auth/refresh-token`, { refreshToken })
//         .then(async ({ data }: any) => {
//           prevRequest.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
//           await clearAccessToken();
//           setAccessToken(data.data.accessToken);
//           window.location.reload();
//           return axiosInstance(prevRequest);
//         })
//         .catch(() => {
//           clearToken();
//           const host = location.protocol.concat('//').concat(window.location.host);
//           window.location.href = `${host}/auth`;
//           return axiosInstance(prevRequest);
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
