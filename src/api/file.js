import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}

export function findFile(params) {
  return request({
    url: '/file/getfile',
    method: 'get',
    params
  })
}

export function deleteFile(fileid) {
  return request({
    url: '/file/deletefile/' + fileid,
    method: 'get'
  })
}

export function downloadFile(fileid) {
  return request({
    url: '/file/downloadfile/' + fileid,
    method: 'get'
  })
}

