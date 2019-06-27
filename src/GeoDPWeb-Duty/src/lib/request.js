import axios from "axios";
import { Message } from "element-ui";
import util from "./util";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method == "get") {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      };
    }
    // Do something before request is sent
    const token = util.getToken();
    if (!!token && true) {
      // 让每个请求携带token
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (!response.data.success) console.log(response.data.error);
    return response;
  },

  error => {
    console.log("err" + error); // for debug
    let msg = error.message;
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      msg = error.response.data.error.details;
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      msg = error.response.data.error.message;
    } else if (!error.response) {
      msg = "请求出现未知错误!";
    }
    Message({
      message: msg,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
