import Vue from 'vue'
import Vuex from 'vuex'

//db simulado
import { users } from './tbUsers';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: users, //Anotações na mutation logUser()
        userLogged: {},
        logged: false,
        userExists: false,
        categories: [],
        products: [],
        currentProduct: null,
    },
    mutations: {
        /*---------------------------USUARIOS---------------------------*/
        logUser: (state, user) => {
            let uIndx = state.users.findIndex(u => { return u.email == user.email });
            if (uIndx > -1)
                if (state.users[uIndx].password == user.password) {
                    state.userLogged = state.users[uIndx];
                    state.categories = state.userLogged.categories;
                    state.products = state.userLogged.products;
                    state.logged = true;
                }
            //Nunca faria um array de users contendo todos os usuarios do sistema e informações relativas a eles
            //E também é claro, com informações de login e senha dentro do array, fazendo a validação de login no front.
            //São obvias as implicações de performance e segurança
            //Mas como não estou usado um backend aqui para fazer essas devidas validações e armazenar os dados por usuarios
            //Fiz assim mesmo, só pra simular um login, e separar as informações atreladas a cada user
            //xP
        },
        logOutUser: state => {
            state.logged = false;
            state.userLogged = {};
            state.categories = [];
            state.products = [];
        },
        registerUser: (state, userForm) => {
            let userExists = state.users.findIndex(u => { return u.email.toUpperCase() == userForm.email.toUpperCase() }) > -1;
            state.userExists = userExists;
            if(!state.userExists) 
                state.users.push({
                    name: userForm.name,
                    email: userForm.email,
                    password: userForm.password,
                    categories: [],
                    products: []
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
        },

        /*---------------------------PRODUTOS---------------------------*/
        addProduct: (state, product) => state.products.push(product),
        updProduct: (state, product) => {
            let prodToBeDeleted = state.products.findIndex(p => { return p.productId == product.productId });
            state.products[prodToBeDeleted].productName = product.productName;
            state.products[prodToBeDeleted].categoryId = product.categoryId;
            state.products[prodToBeDeleted].categoryName = product.categoryName;
        },
        delProduct: (state, productId) => {
            let prodToBeDeleted = state.products.findIndex(p => { return p.productId == productId });
            state.products.splice(prodToBeDeleted, 1);
        },
    },
    actions: {
        /*---------------------------USUARIOS---------------------------*/
        logUser: (context, user) => context.commit('logUser', user),
        registerUser: (context, userForm) => context.commit('registerUser', userForm),

        /*--------------------------CATEGORIAS--------------------------*/
        addCategory: (context, category) => context.commit('addCategory', category),
        updCategory: (context, category) => context.commit('updCategory', category),
        delCategory: (context, id) => context.commit('delCategory', id),

        /*---------------------------PRODUTOS---------------------------*/
        addProduct: (context, product) => context.commit('addProduct', product),
        updProduct: (context, product) => context.commit('updProduct', product),
        delProduct: (context, productId) => context.commit('delProduct', productId),
    },
    getters: {
        /*---------------------------USUARIOS---------------------------*/
        user: state => ({ name: state.userLogged.name, email: state.userLogged.email }),
        logged: state => state.logged,
        userExists: state => state.userExists,

        /*--------------------------CATEGORIAS--------------------------*/
        categories: state => state.categories,
        categoriesSelect: state => state.categories.map(c => c.id + ' - ' + c.category),
        nextCategoryId: state => { //Considerando que o que vem da base está ordenado por IDs
            let clen = state.categories.length;
            return clen > 0 ? state.categories[state.categories.length-1].id+1 : 1;
        },

        /*---------------------------PRODUTOS---------------------------*/
        products: state => state.products,
        nextProductId: state => { //Considerando que o que vem da base está ordenado por IDs
            let plen = state.products.length;
            return plen > 0 ? state.products[plen-1].productId+1 : 1;
        },
        currentProduct: state => state.currentProduct,
    }
});

export { store }