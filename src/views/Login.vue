<template>
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
                <v-btn color="success" type="submit">Entrar</v-btn>
                &nbsp;
                <v-btn color="primary" >Novo Usuário</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        user_login: '',
        user_password: '',
        login_validation: [
            login => !!login || 'Email é obrigatório!',
            login => /.+@.+\..+/.test(login) || 'Formato de e-mail inválido!'
        ],
        password_validation: [
            password => !!password || 'Senha é obrigatória!',
        ]
    })
};
</script>

<style></style>
