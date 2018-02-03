import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state =  {
    num:1
}
const mutations = {
    add(state){
        state.num++;
    },
    reduce(state){
        state.num--;
    }
}

export default new Vuex.Store({
    state,
    mutations
});