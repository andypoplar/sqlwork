<template>
  <div class="updataFile">
    <div class="container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            drag
            action="http://10.187.1.177:8080/file/uploadfile"
            multiple
            :on-success="uploadFileSuccess"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="文件标题">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="文件说明">
          <el-input v-model="form.introduce" type="textarea" />
        </el-form-item>

        <el-form-item label="选择时间">
          <el-date-picker
            v-model="form.createtime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">立即上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { upload } from '@/api/file'
import { notice } from '@/utils/notice'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        title: '',
        introduce: '',
        createtime: '',
        filepath: '',
        userid: ''
      }
    }
  },

  computed: {
    ...mapGetters(['userid'])
  },
  mounted() {
    this.form.userid = this.userid
  },
  methods: {
    handleSubmit() {
      upload(this.form).then(res => {
        notice(this, '成功', '上传成功', 'success')
      }, reason => {
        notice(this, '失败', '上传失败', 'warning')
      })
    },

    uploadFileSuccess(item) {
      console.log(item)
      console.log(item.result + this.userid)
      this.form.filepath = item.result
    }
  }
}
</script>

<style lang="scss" scoped>
.updataFile{
  padding: 50px;
  .container{
    width: 500px;
  }
}
</style>

// reset element style
<style lang="scss">
.updataFile{
  .el-upload-dragger{
    width: 200px;
    height: 150px;
    .el-upload__text{
      font-size: 12px;
    }
  }
}
</style>
