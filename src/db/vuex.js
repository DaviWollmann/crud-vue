import Vue from 'vue'
import Vuex from 'vuex'

//db simulado
import { categories } from './tbCategories'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: categories,
    },
    mutations: {
        addCategory: (state, category) => state.categories.push({id: category.id, category: category.name}),
        updCategory: (state, category) => {
            let elemToUpdate = state.categories.findIndex(i => { return i.id == category.id });
            state.categories[elemToUpdate].category = category.name;
        },
        delCategory: (state, id) => {
            let elemToBeDeleted = state.categories.findIndex(i => { return i.id == id });
            state.categories.splice(elemToBeDeleted, 1);
        }
    },
    actions: {
        addCategory: (context, category) => context.commit('addCategory', category),
        updCategory: (context, category) => context.commit('updCategory', category),
        delCategory: (context, id) => context.commit('delCategory', id),
    },
    getters: {
        categories: state => state.categories,
        nextCategoryId: state => state.categories[categories.length-1].id+1 //Considerando que o que vem da base está ordenado por IDs
    }
});

export { store }