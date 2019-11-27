import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default {
  namespaced:true,
  state:{
    customers:[],
    loading:false,
  },
  getters:{
    customerSize(state){
      return state.customers.length;
    },
  },
  mutations:{

    refreshCustomers(state,customers){
      state.customers = customers;
    },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
    async findAllCustomers({dispatch,commit}){
      // 1. ajax查询
      commit("beginLoading");
      let response = await request.get("/customer/findAll");
      // 2. 将查询结果更新到state中
      commit("refreshCustomers",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    },
    // payload 顾客信息
   
  }
}