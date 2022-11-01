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


//create a user account

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


//update an user from the db
const updateUser=(req,res)=>{
    const id = parseInt(req.param.id)
    const {name, age} = req.body

    pool.query('UPDATE users SET name=$1, age=$2',[name,age],(error,result)=>{
        if (error){
            throw error
        }

        res.status(200).send(`updates for user with id ${id} are ${name} and ${age}`)

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
