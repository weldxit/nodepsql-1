const express = require("express")
const bodyParser = require("body-parser")
const db= require('./queries')
const cors=require('cors')

const app=express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))

app.listen(3000,()=>{console.log("server running on port 3000")})

// get all category
app.get('/category', db.getCategory)
app.get('/subcategory/:categoryId', db.getSubCategory);
app.get('/users',db.getUsers)
app.get('/products/:subcategoryId',db.getProducts)
app.post('/users/sign_up', db.createUser)
app.post('/users/login', db.loginUser)
app.put('/users/:id', db.updateUser)
app.get('/recent', db.getRecentProducts)
app.post('products/catagory/:table_name', db.createProduct)





























// app.get('/users/:id',db.getUserbyId)
// app.post('/users',db.Createuser)
// app.put('/users/:id',db.updateUser)
// app.delete('/users/:id',db.deleteUser)
