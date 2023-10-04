export const types = {
    auth: {
        login:   '[AUTH] - LOGIN',
        logout:  '[AUTH] - LOGOUT',
        registerUser: '[AUTH] - REGISTERUSER'
    },
    users: {
        getListUsers: '[USERS] - LISTUSERS',
        getUser: '[USERS] - GETUSER',
        editUser: '[USERS] - EDITUSER',
        deleteUser: '[USERS] - DELETEUSER',
        changePassword: '[USERS] - CHANGEPASSWORD'
    },
    products: {
        listProducts: '[PRODUCTS] - LISTPRODUCTS',
        addProduct: '[PRODUCTS] - ADDPRODUCT',
        editProduct: '[PRODUCTS] - EDITPRODUCT',
        deleteProduct: '[PRODUCTS] - DELETEPRODUCT',
    }
}