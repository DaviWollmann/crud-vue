<template>
    <div class="main-container">
        <v-card>
            <v-card-title>Cadastro de categorias</v-card-title>
            <v-card-subtitle>
                <br>
                <v-btn color="primary" @click="clearFields();insertUpdateCategoryWindow=true;">Nova Categoria</v-btn>
            </v-card-subtitle>
            <v-card-text class="grid-content">
                <v-data-table  :headers="headers" :items="categories" :items-per-page="5">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn icon color="red" @click="delCategory(item.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        &nbsp;
                        <v-btn icon color="orange" @click="idToUpdate = item.id; updatedCategoryName=item.category;">
                            <v-icon>mdi-grease-pencil</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:[`item.category`]="{ item }">
                        <div>
                            <div v-if="item.id == idToUpdate">
                                <v-text-field type="text" v-model="updatedCategoryName" />
                                <v-btn small color="success" @click="updateCategory(item.id, updatedCategoryName)">Salvar</v-btn>
                                &nbsp;
                                <v-btn small color="error" @click="idToUpdate=0">Cancelar</v-btn>
                                <br><br>
                            </div>
                            <span v-else> {{item.category}} </span>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <!-- INSERÇÃO/ATUALIZACAO DE CATEGORIAS -->
        <v-dialog v-model="insertUpdateCategoryWindow" max-width="400px">
            <v-card>
                <v-card-title class="headline">
                    Nova Categoria
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field type="text" label="nome" v-model="newCategoryName" />
                        <v-text-field type="number" label="id" v-model="nextCategoryId" disabled></v-text-field>
                        <v-btn color="success" @click="submitForm()">Confirmar</v-btn>
                        &nbsp;
                        <v-btn color="error" @click="cancelForm()">Cancelar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data: () => ({
        headers: [
            { value: 'actions', sortable: false },
            { text: 'Id', value: 'id' },
            { text: 'Categoria', value: 'category' }
        ],
        insertUpdateCategoryWindow: false,
        newCategoryName: '',
        idToUpdate: 0,
        updatedCategoryName: ''
    }),
    computed: {
        ... mapGetters([ 'categories', 'nextCategoryId' ])
    },
    methods: {
        ... mapActions([ 'addCategory', 'updCategory', 'delCategory' ]),
        submitForm() {
            //Não posso submeter o form de verdade pois os dados estão somente na memória
            this.addCategory({id: this.nextCategoryId, name:this.newCategoryName});
            this.clearFields();
        },
        cancelForm() {
            this.clearFields();
        },
        updateCategory(id, name) {
            this.updCategory({id: id, name: name});
            this.clearFields();
        },
        clearFields() {
            this.newCategoryName = '';
            this.insertUpdateCategoryWindow = false;
            this.updatedCategoryName = '';
            this.idToUpdate = 0;
        }
    }
}
</script>

<style>
    .main-container{
        position: absolute;
        top: 3%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%);
    }
    .grid-content {
        height: 68vh;
        overflow: auto;
    }
</style>
