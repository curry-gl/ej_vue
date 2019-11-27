import request from '@/utils/request'
import {post,post_array} from '@/utils/request'
export default {
    namespaced:true,
        state:{
            categorys:[],
            visible:false,
            title:"添加栏目信息"
        },
        getters:{

        },
        mutations:{
            refreshCategory(state,categorys){
                state.categorys = categorys;
            },
            // pageChangeHandler(state,param,page){
            //     console.log(param.page);
            // },
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
            //查询数据
            async findAllCategory(context){
                // if(!param){
                //     param={
                //         page:0,
                //         pageSize:5
                //     }
                // }
                //1.ajax查询
                let response = await request.get("/category/findAll");
                //2.将查询结果更新到state中
                context.commit("refreshCategory",response.data);
            },
            //删除
            async  deleteCategoryHandler(context,id){
                let response = await request.get("/category/deleteById?id="+id);
                context.dispatch("findAllCategory");
                return response; 
            },
            //保存或更新
            async saveOrUpdateCategory({commit,dispatch},category){
                let response = await post("/category/saveOrUpdate",category)
                //刷新页面
                dispatch("findAllCategory");
                //关闭模态框
                commit("closeModal");
                //提示
                return response;
            },
            //批量删除
            async batchDeleteCategory(context,ids){ 
                let response = await post_array("/category/batchDelete",{ids});
                //分发
                context.dispatch("findAllCategory");
                //返回结果
                return response;
            }
        }
}
