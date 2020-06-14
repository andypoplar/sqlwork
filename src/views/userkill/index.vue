<template>
  <div class="userkill">
    <div class="finduser">
      <el-input v-model="form.phone" placeholder="请输入用户手机号" />
      <el-button plain type="primary" @click="clickFindUser">点击查询</el-button>
      <el-button plain type="danger">清除查询条件</el-button>
    </div>
    <div class="detailrecord">
      <el-table
        :data="allRecord.slice((currentPage-1)*pageSize,currentPage*pageSize) "
        style="width: 100%"
      >
        <el-table-column label="是否禁用">
          <template v-slot="scope">
            <el-tag>{{ scope.row.isavaiable |isAvailable }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="用户id" prop="name" />

        <el-table-column label="手机号" prop="phone" />

        <el-table-column align="center" label="基本操作">
          <template v-slot="scope">
            <el-button size="mini" type="warning" @click="handleNotallow(scope.row)">禁用</el-button>
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

import { notallow, findUser } from '@/api/user'
import { notice } from '@/utils/notice'
import { validPhone } from '@/utils/validate'
export default {
  filters: {
    isAvailable(item) {
      return item === 1 ? '否' : '是'
    }
  },
  data() {
    return {
      // 所有详细记录 1
      allRecord: [],

      // 分页当前页
      currentPage: 1,
      // 分页每个页面展示n条
      pageSize: 9,

      form: {
        // 输入手机号
        phone: ''
      }
    }
  },
  computed: {
    // 所有记录数据的长度
    totalRecordLength() {
      return this.allRecord.length
    }
  },
  mounted() {
    this.getUserList()
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

    // 禁用用户
    handleNotallow(item) {
      notallow(item.id).then(response => {
        notice(this, '成功', '禁用成功', 'success')
      }, reason => {
        notice(this, '失败', '禁用失败', 'warning')
      })
    },

    getUserList() {
      findUser().then(response => {
        this.allRecord = response.result
      })
    },

    clickFindUser() {
      if (!validPhone(this.form.phone)) {
        notice(this, '失败', '请输入正确手机号', 'warning')
        return
      }
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.userkill{
  padding: 50px 20px;
  .finduser{
    display: flex;

    .el-input{
      width: 180px;
      margin-left: 10px;
    }

    .el-button{
      margin-left: 10px;
    }
  }

  .detailrecord{
    margin-top: 20px;
  }

  .block{
    float: right;
    margin-top: 10px;
  }
}
</style>
