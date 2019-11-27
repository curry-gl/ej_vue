<template>
  <div class="details">
    <h2>员工详情</h2>
    <el-button
      size="small"
      type="text"
      @click="backHandler"
    >返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        基本信息...
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
        订单信息...
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'info'
    }
  },
  computed: {

  },
  created() {
    console.log(this.$route)
    const id = this.$route.query.id
  },
  methods: {
    // 返回
    backHandler() {
      this.$router.go(-1)
    }

  }

}
</script>
