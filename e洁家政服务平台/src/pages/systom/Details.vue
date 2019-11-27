<template>
    <div class="details">
        <el-button type="text" size="small" @click="backHandler">返回</el-button>
        <p><strong>产品名称：</strong>{{product.name}}</p>
        <p><strong>产品单价：</strong>{{product.price}}</p>
        <p><strong>产品介绍：</strong>{{product.description}}</p>
        <p><strong>产品主图：</strong>
            <img :src="product.photo" alt="">
        </p>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapState('product',['product'])
        
    },
    created(){
        let id = this.$route.query.id;
        //通过id查询商品的详细信息
        this.findProductById(id);
    },
    methods:{
        ...mapActions('product',['findProductById']),
        backHandler(){
            this.$router.go(-1);
        }
    }
}
</script>