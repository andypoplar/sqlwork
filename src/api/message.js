import request from '@/utils/request'

export function getMessage() {
  return request({
    url: '/message/getmessage',
    method: 'get'
  })
}

export function sendMessage(data) {
  return request({
    url: '/message/sendMessage',
    method: 'post',
    data
  })
}

export function delMessage(messageid) {
  return request({
    url: '/message/delmessage/' + messageid,
    method: 'get'
  })
}
