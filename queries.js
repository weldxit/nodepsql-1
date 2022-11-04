const pool= require('./pool')
//get all users from database

const getUsers =(req,res)=>{
    pool.query('SELECT * FROM users',(error,result)=>{
        if (error){
            throw error;
        }

        res.status(200).send(result.rows)
    })
}


// login user from database

const loginUser = (req,res)=> {
    const body = req.body
    pool.query('SELECT * FROM users WHERE email=$1 AND password=$2',[body.email, body.password],(error,result)=>{
        if (error){
            throw error;
        }
        if(result.rowCount > 0) {
            res.status(200).send('User Available')
        } else {
            res.status(404).send('User Not Found')
        }
    })
}


//create a buyer user account

const createUser=(req,res) =>{
    const body = req.body
    console.log(body);
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [body.email, body.password], (error, result) =>{
        if (error){
            throw error;
        }

        res.status(200).send('added successfully')
    })
}

//create a seller user account

const updateUser=(req,res) =>{
    const body = req.body
    const id = req.params.id
    console.log(body);
    const userId = body.first_name.substring(0, 4).toUpperCase() + body.phone
    pool.query('UPDATE users SET first_name = $1, last_name = $2, village = $3, city = $4, block = $5, district = $6, farmer_id = $7, aadhaar_id = $8, pincode = $9, phone = $10, user_id = $11, payment_id = $12 where id = $13',
    [body.first_name, body.last_name, body.village, body.city, body.block, body.district, body.farmer_id, body.aadhaar_id, body.pincode, body.phone, userId, body.payment_id, id],
    (error, result) => {
        if (error){
            throw error;
        }
        res.status(200).send('updated successfully')
    })
}


// get all category items

const getCategory =(req,res)=> {
    pool.query('SELECT * FROM category',(error,result)=>{
        if (error){
            throw error;
        }

        res.status(200).send(result.rows)
    })
}

// get all subcategory items based on category id

const getSubCategory =(req,res)=> {
    const categoryId = req.params.categoryId;
    pool.query('SELECT * FROM subcategory WHERE category_id = $1', [categoryId], (error,result)=>{
        if (error){
            throw error;
        }

        res.status(200).send(result.rows)
    })
}


//get a products catagory from database

const getProducts=(req,res) => {
    const productCatagory = req.params.subcategoryId
    pool.query('SELECT * FROM products WHERE subcategory_id = $1', [productCatagory],(error,result)=>{
        if (error){
            throw error;
        }

        res.status(200).send(result.rows)
    })
}


//get recent products catagory from database

const getRecentProducts= (req,res) => {
    pool.query('SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id DESC LIMIT 10', [1]).then(
        (agriculture) => {
            pool.query('SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id DESC LIMIT 10', [2]).then((horticulture) => {
                pool.query('SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id DESC LIMIT 10', [3], (error, handicrafts) => {
                    if (error) {
                        throw error;
                    }
                    res.status(200).send({Agriculture: agriculture.rows, Horticulture: horticulture.rows, Handicrafts: handicrafts.rows})
                })
            })
        }
    )
    
}



//get a single user from the database

const getUserbyId=(req,res)=>{
    const id= req.params.id

    pool.query('SELECT * FROM mock_data WHERE id=$1',[id],(error,result)=>{
        if (error){
            throw error
        }
        res.status(200).send(result.rows)
    })
}


//add new products

const createProduct=(req,res) => {
    const body = req.body
    const table = req.params.table_name

    pool.query(`INSERT INTO ${table} (name, description, price, image, quantity, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
    [body.name, body.description, body.price, body.image, body.quantity, body.user_id, body.user_id], (error,result) => {
        if (error){
            throw error;
        }
        res.status(200).send('added successfully')
    })
}


//delete an user from the db

const deleteUser=(req,res)=>{
    const id=req.param.id

    pool.query('DELETE FROM users WHERE id=$1',[id],(error,result)=>{
        if(error){
            throw error
        }

        res.status(200).send(`user deleted with id ${id}`)
    })
}


module.exports = {
    getUsers,
    getUserbyId,
    updateUser,
    deleteUser,
    getProducts,
    createUser,
    loginUser,
    getRecentProducts,
    createProduct,
    getCategory,
    getSubCategory,
}
