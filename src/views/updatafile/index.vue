<template>
  <div class="updataFile">
    <div class="container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>

        <el-form-item label="字段">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="文件标题">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="文件说明">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>

        <el-form-item label="上传时间">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        title: '',
        desc: '',
        time: this.getCurrentTime()
      }
    }
  },
  computed: {

  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    getCurrentTime() {
      return +new Date()
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
