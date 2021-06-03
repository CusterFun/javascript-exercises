import request from '@/utils/request'

export default {
  // 上传图片
  uploadImage(data = {}) {
    return request({
      url: `/article/file/upload`,
      method: 'POST',
      data
    })
  },
  // 删除图片 /article/file/delete?fileUrl=http://xxx
  deleteImage(imageUrl) {
    return request({
      url: `/article/file/delete`,
      method: 'delete',
      parmas: { 'fileUrl': imageUrl }
    })
  }
}
