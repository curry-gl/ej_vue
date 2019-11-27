<template>
  <div class="waiter">
    <!-- 按钮 -->
    <!-- <div>
			<el-button @click="batchCheckHandler"  size="small" type="danger">批量审核</el-button>
		</div> -->
    <!-- /按钮 -->
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="waiters">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="realname" label="姓名" align="center" />
        <el-table-column prop="telephone" label="电话" align="center" />
        <el-table-column prop="idCard" label="身份证号" align="center" />
        <el-table-column prop="bankCard" label="银行卡号" align="center" />
        <el-table-column prop="registerTime" label="注册时间" align="center" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="详情" width="100">
          <template #default="scope">
            <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--/ 表格 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      waiter: {}
    }
  },
  created() {
    this.findAllWaiter()
  },
  computed: {
    ...mapState('waiter', ['waiters', 'loading'])

  },
  methods: {
    ...mapMutations('waiter', ['refreshWaiters', 'beginLoading', 'endLoading']),
    ...mapActions('waiter', ['findAllWaiter']),
    // 普通方法
    toDetailsHandler(waiter) {
      // 跳转到详情页面
      this.$router.push({
        path: '/waiter/details',
        query: { id: waiter.id }
      })
    }
  }

}
</script>
