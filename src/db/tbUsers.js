export const users = [
    {
        name: 'admin',
        email: 'admin@mail.com',
        password: 'admin123',
        categories: [
            { id: 1, category: 'Roupas' },
            { id: 2, category: 'Calçados' },
            { id: 3, category: 'Relógios' },
            { id: 4, category: 'Óculos' },
            { id: 5, category: 'Praia' },
            { id: 6, category: 'Cama mesa e banho' }
        ],
        products: [
            { productId: 1, productName: 'Calça Jeans', categoryId: 1, categoryName: 'Roupas'},
            { productId: 2, productName: 'Calça Moletom', categoryId: 1, categoryName: 'Roupas'},
            { productId: 3, productName: 'Óculos de Sol', categoryId: 4, categoryName: 'Óculos'},
            { productId: 4, productName: 'Óculos de Grau', categoryId: 4, categoryName: 'Óculos'},
        ]
    },
];
