import Vue from 'vue'
import Vuex from 'vuex'

//db simulado
import { categories } from './tbCategories';
import { users } from './tbUsers';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: users, //Anotações na mutation logUser()
        userLogged: {},
        categories: [],
    },
    mutations: {
        /*---------------------------USUARIOS---------------------------*/
        logUser: (state, user) => {
            let uIndx = state.users.findIndex(u => { return u.email == user.email });
            if (uIndx > -1)
                if (state.users[uIndx].password == user.password) {
                    state.userLogged = state.users[uIndx];
                    state.categories = state.userLogged.categories;
                    // console.log(user)
                    console.log(state.categories, state.userLogged)
                }
            //Nunca faria um array de users contendo todos os usuarios do sistema e informações relativas a eles
            //E também é claro, com informações de login e senha dentro do array, fazendo a validação de login no front.
            //São obvias as implicações de performance e segurança
            //Mas como não estou usado um backend aqui para fazer essas devidas validações e armazenar os dados por usuarios
            //Fiz assim mesmo, só pra simular um login, e separar as informações atreladas a cada user
            //xP
        },
        registerUser: (state, userForm) => {
            state.users.push({
                name: userForm.name,
                email: userForm.email,
                password: userForm.password
            })
        },
        /*--------------------------CATEGORIAS--------------------------*/
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
        /*---------------------------USUARIOS---------------------------*/
        logUser: (context, user) => context.commit('logUser', user),
        registerUser: (context, userForm) => context.commit('registerUser', userForm),
        /*--------------------------CATEGORIAS--------------------------*/
        addCategory: (context, category) => context.commit('addCategory', category),
        updCategory: (context, category) => context.commit('updCategory', category),
        delCategory: (context, id) => context.commit('delCategory', id),
    },
    getters: {
        //Usuarios
        user: state => ({ name: state.userLogged.name, email: state.userLogged.email }),
        //Categorias
        categories: state => state.categories,
        nextCategoryId: state => state.categories[categories.length-1].id+1 //Considerando que o que vem da base está ordenado por IDs
    }
});

export { store }