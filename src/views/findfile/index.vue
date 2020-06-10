<template>
  <div class="findfile">
    <div class="header">
      <el-date-picker
        v-model="fileDate"
        type="date"
        placeholder="选择日期"
      />
      <el-input v-model="inputValue" placeholder="请输入文件名称" />
      <el-button plain type="primary">点击查询</el-button>
      <el-button plain type="danger">清除查询条件</el-button>
    </div>

    <div class="container">
      <el-table
        :data="allRecord"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="标题" prop="title" />

        <el-table-column align="center" label="基本操作">
          <template v-slot="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      fileDate: '',
      allRecord: [
        {
          id: 'abc',
          title: '05-01'
        },
        {
          id: '123abc',
          title: '05-01'
        }
      ]
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
