const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("server running on port 3000");
});

// get all category
app.get("/category", db.getCategory);

//get all subcategory by category id
app.get("/subcategory/:categoryId", db.getSubCategory);

//get a user by user id
app.get("/users/:userId", db.getUsersById);

//get all products by sub category
app.get("/products/:subcategoryId", db.getProducts);

//create a user account
app.post("/users/sign_up", db.createUser);

//login a user
app.post("/users/login", db.loginUser);

//create a seller user account by update upser
app.put("/users/:id", db.updateUser);

//create a seller account from registration application
app.post("/users/seller_register", db.createSeller);

//get recent products and category
app.get("/recent", db.getRecentProducts);

//add a product to product table
app.post("products/catagory/:table_name", db.createProduct);

//add a product to favorite table
app.post("/add_favorite", db.addProductTOFavorite);

//get all favorite products bu user id
app.get("/favorite/:userId", db.getFavoriteProducts);

//remove a product from favorite table

// add a product to cart table
app.post("/add_cart", db.addProductToCart);

//get all cart's products by user id
app.get("/cart/:userId", db.getProductsFromCart);

//modify a cart items details
app.put("/modify_cart/:cartId", db.modifyCart);

// app.get('/users/:id',db.getUserbyId)
// app.post('/users',db.Createuser)
// app.put('/users/:id',db.updateUser)
// app.delete('/users/:id',db.deleteUser)
