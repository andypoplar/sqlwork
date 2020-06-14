<template>
  <div class="sendfile">
    <div class="container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            drag
            action="http://10.187.1.177:8080/file/uploadfile"
            :on-success="uploadFileSuccess"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>

        <el-form-item label="文件标题">
          <el-input v-model="form.filetitle" />
        </el-form-item>

        <el-form-item label="文件说明">
          <el-input v-model="form.filedecrition" type="textarea" />
        </el-form-item>

        <el-form-item label="收件人">
          <el-input v-model="form.receivephone" placeholder="请输入收件人手机号" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSend">立即发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '@/api/message'
import { notice } from '@/utils/notice'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        senderid: '',
        filetitle: '',
        filedecrition: '',
        receivephone: '',
        filepath: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userid'])
  },
  mounted() {
    this.form.senderid = this.userid
  },
  methods: {
    handleSend() {
      sendMessage(this.form).then(response => {
        console.log(response)
        notice(this, '成功', '发送成功', 'success')
      }, reason => {
        notice(this, '失败', '发送失败', 'warning')
      })
    },

    uploadFileSuccess(value) {
      this.form.filepath = value.result
    }
  }
}
</script>

<style lang="scss" scoped>
.sendfile{
  padding: 50px;
  .container{
    width: 500px;
  }
}
</style>

// reset element style
<style lang="scss">
.sendfile{
  .el-upload-dragger{
    width: 200px;
    height: 150px;
    .el-upload__text{
      font-size: 12px;
    }
  }
}
</style>
