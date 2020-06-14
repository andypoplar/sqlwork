<template>
  <div class="findfile">
    <div class="header">
      <el-date-picker
        v-model="form.createtime"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      />
      <el-input v-model="form.title" placeholder="请输入文件名称" />
      <el-button plain type="primary" @click="clickFindFile">点击查询</el-button>
      <el-button plain type="danger" @click="clearFindStatus">清除查询条件</el-button>
    </div>

    <div class="container">
      <el-table
        :data="allRecord"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="文件名称" prop="title" />
        <el-table-column label="创建时间" prop="createtime" />

        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="warning" @click="handleDownLoad(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { downloadFile, deleteFile, findFile } from '@/api/file'
import { notice } from '@/utils/notice'
export default {
  data() {
    return {
      allRecord: [],
      form: {
        title: null,
        userid: -1,
        createtime: null
      }
    }
  },
  mounted() {
    this.getFileList()
  },
  methods: {
    handleDownLoad(item) {
      downloadFile(item.id).then(res => {
        console.log(res)
      })
    },

    handleDelete(item) {
      deleteFile(item.id).then(response => {
        notice(this, '成功', '删除成功', 'success')
        this.getFileList()
      }, reason => {
        notice(this, '失败', '删除失败', 'warning')
      })
    },

    clickFindFile() {
      this.getFileList()
    },

    clearFindStatus() {
      for (const item in this.form) {
        this.form[item] = ''
      }

      this.getFileList()
    },

    getFileList() {
      findFile(this.form).then(response => {
        this.allRecord = response.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.findfile{
  padding:50px 20px;
  .header{
    display: flex;

    .el-input{
      margin-left: 10px;
      width: 200px;
    }

    .el-button{
      margin-left: 10px;
    }
  }

  .container{
    margin-top: 20px;
  }
}
</style>
