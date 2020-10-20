import axios from 'axios'
import { Message } from 'element-ui'
import {guid, serialize} from "./index"

function showError (err) {
  if (err.response) {
    Message.error(err.response.data.message || err.response.config.url + '请求错误');
  } else {
    console.log('Error---ajax-', err)
    Message.error(err.data.message || err.data);
  }
}

type RequestType = "post" | "postJson" | "get"

export default <Reqtype = any, ResType = any>(
    type: RequestType, 
    url: string, 
    params: Reqtype, 
    isresponse: boolean
) => {
  // 拼凑出erp 需要的四个header内容
  const timestamp = Math.round(new Date().getTime() / 1000);
  axios.defaults.timeout = 30 * 60 * 1000; // 不设置请求超时
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.common['timestamp'] = timestamp;
  axios.defaults.headers.common['ua'] = '5'; //客户端来源 发胜说先随便填一个 cookieGet("ua")
  axios.defaults.headers.common['source'] = '8';
  axios.defaults.headers.common['sn'] = guid();
  axios.defaults.headers.common['Authorization'] = 'Bearer token';

  return new Promise<ResType>((resolve, reject) => {
    switch (type) {
      case 'post':
        params = serialize(params) as any
        axios.post(url, params)
          .then(response => {
            if (response.status == 200 && response.data.code == 200) {
              if (isresponse) {
                resolve(response as any); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                resolve(response.data);
              }
            } else if (response.data.message) {
              showError(response)
              if (isresponse) {
                reject(response); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                reject(response.data);
              }
            }
          }, err => {
            console.log('错误日志', err.response)
            showError(err)
            // Message.error(err.response.data.message);
            reject(err.response)
          })
          .catch((error) => {
            reject(error);
            console.log("post--", error);
          })
        break;
      case 'postJson':
        axios.post(url, params)
          .then(response => {
            if (response.status == 200 && response.data.code == 200) {
              if (isresponse) {
                resolve(response as any); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                resolve(response.data);
              }

            } else {
              showError(response)
              if (isresponse) {
                reject(response); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                reject(response.data);
              }
            }

          }, err => {
            console.log('错误日志', err.response)
            showError(err)
            reject(err.response)

          })
          .catch((error) => {
            reject(error);
            console.log("post--", error);
          })
        break;
      case 'get':
        axios.get(url, {
          params
        })
          .then(response => {
            if (response.status == 200 && response.data.code == 200) {
              if (isresponse) {
                resolve(response as any); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                resolve(response.data);
              }
            } else {
              showError(response)
              if (isresponse) {
                reject(response); //需要返回全部 不然获取不到头部的分页数据类似情况
              } else {
                reject(response.data);
              }
            }

          }, err => {
            console.log('错误日志', err.response)
            showError(err)
            reject(err.response)

          })
          .catch((error) => {
            reject(error);
            console.log("get--", error);
          })
        break;
    }
  })
}
