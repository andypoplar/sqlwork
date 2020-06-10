<template>
  <div class="detailFile">
    <div class="detail-record">
      <el-table
        :data="allRecord.slice((currentPage-1)*pageSize,currentPage*pageSize) "
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

      <!-- 分页部分 -->
      <div class="block">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[9,18,27]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecordLength"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有详细记录 1
      allRecord: [
        {
          id: 'abc',
          title: '05-01'
        },
        {
          id: '123abc',
          title: '05-01'
        }
      ],

      // 分页当前页
      currentPage: 1,
      // 分页每个页面展示n条
      pageSize: 9

    }
  },
  computed: {
    // 所有记录数据的长度
    totalRecordLength() {
      return this.allRecord.length
    }
  },
  methods: {
    // 分页改变每页展示条数
    handleSizeChange(size) {
      this.pageSize = size
    },

    // 分页切换当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.detailFile{
  padding: 50px 20px;

  .block{
    float: right;
    margin-top: 10px;
  }
}
</style>
