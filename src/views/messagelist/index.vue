<template>
  <div class="messagelist">
    <div class="detail-record">
      <el-table
        :data="allRecord.slice((currentPage-1)*pageSize,currentPage*pageSize) "
        style="width: 100%"
      >
        <el-table-column label="文件路径" prop="filepath" />
        <el-table-column label="发送者id" prop="senderid" />
        <el-table-column label="文件描述" prop="filedecrition" />

        <el-table-column align="center" label="操作">
          <template v-slot="scope">
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
import { getMessage, delMessage } from '@/api/message'
import { notice } from '@/utils/notice'
export default {
  data() {
    return {
      // 所有详细记录 1
      allRecord: [],

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
  mounted() {
    this.getMessageList()
  },
  methods: {

    // 分页改变每页展示条数
    handleSizeChange(size) {
      this.pageSize = size
    },

    // 分页切换当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },

    // 删除消息
    handleDelete(item) {
      delMessage(item.id).then(res => {
        notice(this, '成功', '删除成功', 'success')
        this.getMessageList()
      })
    },

    getMessageList() {
      getMessage().then(response => {
        console.log(response)
        this.allRecord = response.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.messagelist{
  padding: 50px 20px;

  .block{
    float: right;
    margin-top: 10px;
  }
}
</style>
