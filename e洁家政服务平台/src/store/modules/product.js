import request from '@/utils/request'
import {get,post,post_array} from '@/utils/request'
export default {
    namespaced:true,
        state:{
            products:[],
            visible:false,
            title:"添加产品信息",
            product:{}  //当前产品的信息
        },
        getters:{

        },
        mutations:{
            refreshProduct(state,products){
                state.products = products;
            },
            refreshProducts(state,product){
                state.product = product;
            },
            showModal(state){
                state.visible = true;
            },
            closeModal(state){
                state.visible = false;
            },
            setTitle(state,title){
                state.title = title;
            }
        },
        actions:{
            //根据id查询产品信息
            async findProductById(context,id){
                let response = await get("/product/findById",{id})
                context.commit('refreshProducts',response.data);
            },
            //查询数据
            async findAllProduct(context){
                //1.ajax查询
                let response = await request.get("/product/findAll");
                //2.将查询结果更新到state中
                context.commit("refreshProduct",response.data);
            },
            async deleteProductById(context,id){
                let response = await request.get("/product/deleteById?id="+id);
                context.dispatch("findAllProduct");
                return response;
            },
            async saveOrUpdateProduct({commit,dispatch},playload){
                let response = await post("/product/saveOrUpdate",playload)
                //刷新页面
                dispatch("findAllProduct");
                //关闭模态框
                commit("closeModal");
                //提示
                return response; 
            },
            //批量删除
            async batchDeleteProduct(context,ids){
                let response = await post_array("/product/batchDelete",{ids});
                //分发
                context.dispatch("findAllProduct");
                //返回结果
                return response;
            }    
        }
}
