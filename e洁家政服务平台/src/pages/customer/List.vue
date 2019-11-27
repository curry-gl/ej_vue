<template>
  <div class="customer">
		<!-- 表格 -->
		<div v-loading="loading">
      <el-table :data="customers" size="mini" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="record">
              <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
		</div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      customer:{},
      
    }
  },
  computed:{
    ...mapState("customer",["customers","loading"]),
    ...mapGetters("customer",["customerSize"])
  },
  created(){
    this.findAllCustomers();
  },
  methods:{
    ...mapActions("customer",["findAllCustomers"]),
    
    // 普通方法
    toDetailsHandler(customer){
      //跳转到详情页面
      this.$router.push({
        path:"/customer/details",
        query:{id:customer.id}
      })
    },
}

}
</script>
<style scoped>

</style>