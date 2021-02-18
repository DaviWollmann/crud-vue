<template>
    <div>
        <v-card style="position: absolute; top: 10%; left: 50%; margin-right: -50%; transform: translate(-50%);">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field
                        v-model="user_login"
                        :rules="login_validation"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="user_password"
                        :rules="password_validation"
                        label="Senha"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn color="success" @click="logUser({email: user_login, password: user_password})">Entrar</v-btn>
                    &nbsp;
                    <v-btn color="primary" @click="createUser=true" >Novo Usuário</v-btn>
                </v-form>
            </v-card-text>
        </v-card>

        <v-dialog v-model="createUser" max-width="400px">
            <v-card>
                <v-card-title class="headline">
                    Cadastrar novo usuário
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="register_name"
                        label="Nome"
                        type="text"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="register_email"
                        :rules="login_validation"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="register_password"
                        :rules="password_validation"
                        label="Senha"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn color="success" @click="newUser()">Cadastrar</v-btn>
                    &nbsp;
                    <v-btn color="error" @click="clearForms()">Cancelar</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data: () => ({
        //LOGIN DE USUARIOS
        valid: false,
        user_login: '',
        user_password: '',
        //CADASTRO DE NOVOS USUARIOS
        createUser: false,
        register_name: '',
        register_email: '',
        register_password: '',
        //VALIDACAO DE FORMATACAO DE CAMPOS
        login_validation: [
            login => !!login || 'Email é obrigatório!',
            login => /.+@.+\..+/.test(login) || 'Formato de e-mail inválido!'
        ],
        password_validation: [
            password => !!password || 'Senha é obrigatória!',
        ]
    }),
    computed: {
        ... mapGetters([ 'users' ])
    },
    methods: {
        ... mapActions([ 'logUser', 'registerUser' ]),
        newUser() {
            this.registerUser({
                name: this.register_name,
                email: this.register_email,
                password: this.register_password
            });
            this.clearForms();
        },
        clearForms() {
            this.register_name = '';
            this.register_email = '';
            this.register_password = '';
            this.createUser = false;
        }
    }
};
</script>

<style></style>
