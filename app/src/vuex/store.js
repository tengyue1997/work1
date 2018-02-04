import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    bgColor:''
}
const mutations = {
    change(state,{bgColor,title}){
        state.bgColor = bgColor;
        state.title = title;
    }
}

export default new Vuex.Store({
    state,
    mutations
});