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


//get a products catagory from database

const getProducts=(req,res) =>{
    const productCatagory = req.params.catagory
    pool.query(`SELECT * FROM ${productCatagory} ORDER BY id ASC`,(error,result)=>{
        if (error){
            throw error;
        }

        res.status(200).send(result.rows)
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


//create a buyer user account

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


//create an user on the db

const Createuser=(req,res)=>{
    const {name,age} = req.body

    pool.query('INSERT INTO users (name,age) VALUES ($1,$2) RETURNING *',[name,age],(error,result)=>{
        if (error){
            throw error
        }
        res.status(201).send(`user created ${result.rows[0].name}`)
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
    Createuser,
    updateUser,
    deleteUser,
    getProducts,
    createUser,
    loginUser,
}
