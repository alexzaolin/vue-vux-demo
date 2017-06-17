<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <alert v-model="showAlert" :title="msg" :content="msg"></alert>
  </div>
</template>

<script>
import {Alert} from 'vux'
export default {
    components:{
        Alert
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            showAlert:false
        }
    },
    mounted(){
        this.showAlert = true;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
