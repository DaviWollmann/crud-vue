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
                        :type="passwordType"
                        required
                        :append-icon="passwordType == 'password' ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="togglePasswordType('log')"
                    ></v-text-field>
                    <v-btn color="success" @click="login()">Entrar</v-btn>
                    &nbsp;
                    <v-btn color="primary" @click="createUser=true" >Novo Usuário</v-btn>
                    <br><br>
                    <v-expand-transition>
                        <v-alert type="error" v-show="loginErrorMessage" class="mx-auto secondary">
                            {{loginErrorMessage}}
                        </v-alert>
                    </v-expand-transition>
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
                        v-model="registerName"
                        label="Nome"
                        type="text"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="registerEmail"
                        :rules="login_validation"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="registerPassword"
                        :rules="password_validation"
                        label="Senha"
                        :type="regPasswordType"
                        required
                        :append-icon="regPasswordType == 'password' ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="togglePasswordType('reg')"
                    ></v-text-field>
                    <v-btn color="success" @click="register()">Cadastrar</v-btn>
                    &nbsp;
                    <v-btn color="error" @click="clearForms()">Cancelar</v-btn>
                    <br><br>
                    <v-expand-transition>
                        <v-alert type="error" v-show="registerErrorMessage" class="mx-auto secondary">
                            {{registerErrorMessage}}
                        </v-alert>
                    </v-expand-transition>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: () => ({
        //LOGIN DE USUARIOS
        valid: false,
        user_login: '',
        user_password: '',
        //CADASTRO DE NOVOS USUARIOS
        createUser: false,
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        //VALIDACAO DE FORMATACAO DE CAMPOS
        login_validation: [
            login => !!login || 'Email é obrigatório!',
            login => /.+@.+\..+/.test(login) || 'Formato de e-mail inválido!'
        ],
        password_validation: [
            password => !!password || 'Senha é obrigatória!'
        ],
        passwordType: 'password',
        regPasswordType: 'password',
        loginErrorMessage: '',
        registerErrorMessage: '',
    }),
    computed: {
        ... mapGetters([ 'logged', 'userExists' ]),
    },
    methods: {
        ... mapActions([ 'logUser', 'registerUser' ]),
        clearForms() {
            this.registerName = '';
            this.registerEmail = '';
            this.registerPassword = '';
            this.createUser = false;
            this.registerErrorMessage = '';
        },
        login() {
            this.logUser({email: this.user_login, password: this.user_password});
            if(this.logged) {
                this.loginErrorMessage = "";
                this.$router.options.isAuthenticated = true;
                this.$router.push('produtos');
            } else {
                this.loginErrorMessage = "Usuário ou senha inválidos!";
            }
        },
        register() {
            if(this.registerName) {
                this.registerUser({
                    name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                });
                if (!this.userExists){
                    this.clearForms();
                } else this.registerErrorMessage = "Email indisponível para uso!";
            } else this.registerErrorMessage = "Nome é obrigatório!";
        },
        togglePasswordType(from) {
            if(from == 'log') this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
            else this.regPasswordType = this.regPasswordType == 'password' ? 'text' : 'password';
        }
    }
};
</script>

<style></style>
