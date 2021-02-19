<template>
  <div class="main-container">
    <v-card>
      <v-card-title>Produtos</v-card-title>
      <v-card-subtitle>
        <br>
        <v-btn color="primary" @click="loadProductInfo({productId: nextProductId});isUpdate=false;">Novo Produto</v-btn>
      </v-card-subtitle>
      <v-card-text class="grid-content">
        <v-data-table
          :headers="headers"
          :items="products"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterContent"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Pesquisar produto ou categoria"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="red" @click="delProduct(item.productId)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            &nbsp;
            <v-btn icon color="orange" @click="loadProductInfo(item)">
              <v-icon>mdi-grease-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- INSERT/UPDATE DE PRODUTO -->
    <v-dialog v-model="insertUpdateProductWindow" max-width="400px">
      <v-card>
        <v-card-title class="headline">
            Novo Produto
        </v-card-title>
        <v-card-text>
          <v-form>
              <v-text-field type="number" label="id" v-model="updProductId" disabled />
              <v-text-field type="text" label="nome" v-model="updProductName" />
              <v-autocomplete
                :items="categoriesSelect"
                v-model="updCategorySelected"
                label="Categoria"
              ></v-autocomplete>
              <v-btn
                color="success"
                @click="submitForm();isUpdate=true;"
              >Confirmar</v-btn>
              &nbsp;
              <v-btn color="error" @click="insertUpdateProductWindow=false;">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
      data: () => ({
        headers: [
          { value: "actions", sortable: false },
          { text: "Produto", value: "productId" },
          { text: "Descrição", value: "productName" },
          { text: "Categoria", value: "categoryId" },
          { text: "Nome", value: "categoryName" },
        ],
        search: '',
        insertUpdateProductWindow: false,
        isUpdate: false, //preparada para inserção quando falsa, ou para atualizacao de produto quando verdadeiro
        updProductId: 0,
        updProductName: '',
        updCategorySelected: '',
      }),
      computed: {
        ...mapGetters(["currentProduct", "products", "categoriesSelect", "nextProductId"]),
      },
      methods: {
        ...mapActions(["addProduct", "updProduct", "delProduct"]),
        filterContent(value, search) {
          return value != null && search != null && typeof value === 'string' &&
          value.toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },
        loadProductInfo(product) {
          //ALIMENTA CAMPOS DA DIALOG COM VALORES DO PRODUTO ATUAL
          this.insertUpdateProductWindow = true;
          this.updProductId = product.productId;
          this.updProductName = product.productName;
          this.updCategorySelected = product.categoryId + ' - ' + product.categoryName;
        },
        submitForm() {
          let product = {
            productId: this.updProductId,
            productName: this.updProductName,
            categoryId: this.updCategorySelected.slice(0, this.updCategorySelected.indexOf(' - ')),
            categoryName: this.updCategorySelected.slice(this.updCategorySelected.indexOf(' - ')+3),
          }
          if(this.isUpdate)
            this.updProduct(product);
          else
            this.addProduct(product);
          this.insertUpdateProductWindow=false;
        },
      },
    };
</script>

<style>
    .main-container {
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