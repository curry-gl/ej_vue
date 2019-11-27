<template>
  <div class="category">
      <!-- 按钮 -->
        <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
      <!-- /按钮 -->
      <!-- 表格 -->
      <el-table :data="categorys" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="num" label="序号" align="center"></el-table-column>
        <el-table-column label="图标" align="center">
          <template #default="scope">
            <img :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template #default="scope">
            <i class="el-icon-delete" @click="deleteHandler(scope.row.id)"></i> &nbsp;
            <i class="el-icon-edit-outline" @click="editorHandler(scope.row)"></i>
          </template>
        </el-table-column>  
      </el-table>
      <!-- /表格 -->
      <!-- 模态框 -->
      <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
        <el-form :model="category" :rules="rules" ref="categoryForm">
          <el-form-item label="名称" label-width="100px" prop="name">
            <el-input v-model="category.name" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="序号" label-width="100px" prop="num">
            <el-input v-model="category.num" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类图标" label-width="100px">
              <el-upload
                class="upload-demo"
                action="http://134.175.154.93:6677/file/upload"
                :file-list="fileList"
                :on-success="uploadSuccessHandler"
                :limit=1
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeModal">取 消</el-button>
          <el-button type="primary" size="small" @click="submitHandler">确 定</el-button>
        </div>
      </el-dialog>
      <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
      return { 
        fileList:[], 
        category:{},
        ids:[],
        rules:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
           num: [
            { required: true, message: '请输入数量', trigger: 'blur' }
          ]
        }
      }
    },
    computed:{
      ...mapState("category",["categorys","visible","title"])
    },
    created(){
      this.findAllCategory();
    },
    methods:{
      ...mapMutations("category",["showModal","closeModal","setTitle"]),
      ...mapActions("category",["findAllCategory","deleteCategoryHandler","saveOrUpdateCategory","batchDeleteCategory"]),
       //上传图片
      uploadSuccessHandler(response){
        //获取返回值中的id，然后将id设置到product
        if(response.status ===200){
          let id = response.data.id;
          let photo = "http://134.175.154.93:8888/group1"+id
          //克隆
          this.category = Object.assign({},this.category);
        }else{
          this.$message.error("上传异常！")
        }
      },
      toAddHandler(){
        this.showModal();
      },
      //删除
      deleteHandler(id){
        this.deleteCategoryHandler(id)
        .then((response)=>{
          this.$message({type:"success",message:response.statusText});
        })
      },
      //提交
      submitHandler(){
         // 校验
        this.$refs.categoryForm.validate((valid)=>{
          // 如果校验通过
          if(valid){
            let promise = this.saveOrUpdateCategory(this.category)
              promise.then((response)=>{
                // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
                this.$message({type:"success",message:response.statusText});
              })
            } else {
              return false;
            }
          })
      },
      dialogCloseHandler(){
          this.$refs.categoryForm.resetFields();
      },
      editorHandler(row){
        this.category = row;
        this.setTitle("修改栏目信息");
        this.fileList.push({name:'',url:row.icon})
        this.showModal();
      },
      toAddHandler(){
        //重置表单
        this.category = {};
        this.setTitle("添加栏目信息");
        //显示模态框
        this.showModal();  
      },
      batchDeleteHandler(){
        this.batchDeleteCategory(this.ids)
        .then((response)=>{
          this.$message({type:"success",message:response.statusText});
        })
      },
      handleSelectionChange(val){
        this.ids = val.map(item=>item.id);
      },
      //分页查询
    //   pageChangeHandler(page){
    //     this.param.page = page-1;
    //     this.findAllCategory(this.param);
    //   },
      //刷新页面
    //   searchHandler(){
    //       this.findAllCategory(this.param);
    //   }
      
    }
}
</script>

<style>

</style>