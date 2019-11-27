<template>
   <div id="product">
    <!-- 按钮 -->
    <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
    <el-button size="small" type="danger" @click="batchHandler">批量删除</el-button>
    <!-- /按钮 -->
      <!-- 表格 -->
       <el-table :data="products" @selection-change="handleSelectionChange">
         <el-table-column type="selection" align="center"></el-table-column>
         <el-table-column prop="id" label="编号" align="center"></el-table-column>
         <el-table-column prop="name" label="名称" align="center"></el-table-column>
         <el-table-column prop="description" label="描述" align="center"></el-table-column>
         <el-table-column prop="price" label="价格" align="center"></el-table-column>
         <el-table-column prop="status" label="状态" align="center"></el-table-column>
         <el-table-column prop="categoryId" label="所属栏目" align="center"></el-table-column>
         <el-table-column label="详情">
           <template #default="scope">
             <a href="" @click.prevent="toDetailsHandler(scope.row.id)">查看</a>
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
        <el-form :model="product" :rules="rules" ref="productForm">
          <el-form-item label="名称" label-width="100px" prop="name">
            <el-input v-model="product.name" autocomplete="off" clearable></el-input>
          </el-form-item>
           <el-form-item label="价格" label-width="100px" prop="price">
            <el-input v-model="product.price" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
            <el-select v-model="product.categoryId">
              <el-option v-for="c in categorys" :key="c.id" :label="c.name" :value="c.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" label-width="100px" prop="description">
            <el-input v-model="product.description" autocomplete="off" clearable type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="产品主图" label-width="100px">
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
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
      return {
        fileList:[],
        product:{},
        ids:[],
         rules:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          categoryId:[
            { required: true, message: '请选择所属栏目', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      //查询所有产品
        this.findAllProduct();
        //查询所有栏目
        this.findAllCategory();
    },
    computed:{
        ...mapState("product",["products","visible","title"]),
        ...mapState("category",["categorys"])
    },
    methods:{
      //上传图片
      uploadSuccessHandler(response){
        //获取返回值中的id，然后将id设置到product
        if(response.status ===200){
          let id = response.data.id;
          let photo = "http://134.175.154.93:8888/group1"+id
          //克隆
          this.product = Object.assign({},this.product);
        }else{
          this.$message.error("上传异常！")
        }
      },
      //跳转到详情页面
        toDetailsHandler(id){
            this.$router.push({
              path:"/sysom/details",
              query:{id}

            })
        },
        ...mapMutations("product",["showModal","closeModal","setTitle"]),
        ...mapActions("product",["findAllProduct","deleteProductById","saveOrUpdateProduct","batchDeleteProduct"]),
        ...mapActions("category",["findAllCategory"]),
        //普通方法
        deleteHandler(id){
          this.deleteProductById(id)
          .then((response)=>{
            this.$message({type:"success",message:response.statusText});
          })
        },
        toAddHandler(){
          this.product = {};
          this.setTitle("添加产品信息");
          this.showModal();
        },
        submitHandler(){
          //校验
          this.$refs.productForm.validate((valid)=>{
            //如果检验通过
            if(valid){
              let promise = this.saveOrUpdateProduct(this.product)
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
          this.$refs.productForm.resetFields();
        },
        //修改
        editorHandler(row){
          //将当前行的信息绑定product
          this.product = row;
          this.setTitle("修改产品信息");
          this.fileList.push({name:'',url:row.photo})
          this.showModal();
        },
        //批量删除
        batchHandler(){
          this.batchDeleteProduct(this.ids)
          .then((response)=>{
          this.$message({type:"success",message:response.statusText});
          }) 
        },
        //监听复选框
        handleSelectionChange(val){
          this.ids = val.map(item=>item.id);
        }
        //分页
        // pageChangeHandler(page){
        //     this.param.page = page-1;
        //     this.findAllProduct(this.param);
        // },
        //查询
        // serachHandler(){
        //     this.findAllProduct(this.param);
        // }
    }

}
</script>
<style scoped>

</style>>