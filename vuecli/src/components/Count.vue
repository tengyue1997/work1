<template>
    <div>
        {{$store.state.num}}--
        {{num}}
        <button @click="$store.commit('add')">+1</button>
        <button @click="$store.commit('reduce')">-1</button>
        
    </div>
</template>

<script>
    import store from '@/vuex/store';
    import {mapState} from 'vuex';
    export default {
        store,
        computed:mapState(['num'])
        
    }
    
</script>

<style scoped>

</style>