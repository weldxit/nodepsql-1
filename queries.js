const pool = require("./pool");
const AWS = require('aws-sdk');
require('dotenv').config();


//get all users from database

const getUsersById = (req, res) => {
  const userId = req.params.userId;
  pool.query("SELECT * FROM users WHERE id = $1", [userId], (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send(result.rows);
  });
};

// login user from database

const loginUser = (req, res) => {
  const body = req.body;
  pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [body.email, body.password],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        res.status(200).send(result.rows);
      } else {
        res.status(404).send("User Not Found");
      }
    }
  );
};

//create a buyer user account

const createUser = (req, res) => {
  const body = req.body;
  console.log(body);
  pool.query(
    "INSERT INTO users (email, password, phone, first_name, last_name) VALUES ($1, $2, $3, $4, $5)",
    [body.email, body.password, body.phone, body.first_name, body.last_name],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send("added successfully");
    }
  );
};

//create a seller user account from registration application

const createSeller = (req, res) => {
  const body = req.body;
  console.log(body);
  pool.query(
    "INSERT INTO users (first_name, last_name, village, city, block, district, sco_id, aadhaar_id, pincode, phone, email, password, unique_id, payment_id, location, image, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
    [
      body.firstName,
      body.lastName,
      body.village,
      body.city,
      body.block,
      body.district,
      body.scoId,
      body.aadhaarId,
      body.pincode,
      body.phone,
      body.email,
      body.password,
      body.firstName + body.phone,
      body.paymentId,
      body.location,
      body.image,
      body.status,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};

//create a seller user account

const updateUser = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(body);
  // const userId = body.first_name.substring(0, 4).toUpperCase() + body.phone;
  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, village = $3, city = $4, block = $5, district = $6, sco_id = $7, aadhaar_id = $8, pincode = $9, phone = $10 WHERE id = $11",
    [
      body.first_name,
      body.last_name,
      body.village,
      body.city,
      body.block,
      body.district,
      body.sco_id,
      body.aadhaar_id,
      body.pincode,
      body.phone,
      id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("updated successfully");
    }
  );
};

// get all category items

const getCategory = (req, res) => {
  pool.query("SELECT * FROM category", (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send(result.rows);
  });
};

// get all subcategory items based on category id

const getSubCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  pool.query(
    "SELECT * FROM subcategory WHERE category_id = $1",
    [categoryId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};

//get a products catagory from database

const getProducts = (req, res) => {
  const productCatagory = req.params.subcategoryId;
  pool.query(
    "SELECT * FROM products WHERE subcategory_id = $1",
    [productCatagory],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};

//get recent products catagory from database

const getRecentProducts = (req, res) => {
  pool
    .query(
      "SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id ASC LIMIT 10",
      [1]
    )
    .then((agriculture) => {
      pool
        .query(
          "SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id ASC LIMIT 10",
          [4]
        )
        .then((handlooms) => {
          pool
            .query(
              "SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id ASC LIMIT 10",
              [2]
            )
            .then((horticulture) => {
              pool.query(
                "SELECT * FROM subcategory WHERE category_id = $1 ORDER BY id ASC LIMIT 10",
                [3],
                (error, handicrafts) => {
                  if (error) {
                    throw error;
                  }
                  res.status(200).send({
                    Agriculture: agriculture.rows,
                    Horticulture: horticulture.rows,
                    Handlooms: handlooms.rows,
                    Handicrafts: handicrafts.rows,
                  });
                }
              );
            });
        });
    });
};

//get a single user from the database

const getUserbyId = (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM mock_data WHERE id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(result.rows);
  });
};

//add new products

const createProduct = (req, res) => {
  const body = req.body;

  const productName = body.name.toString();
  const finalName = productName.charAt(0).toUpperCase() + productName.slice(1);
  const searchParams = finalName.toCamelCase(finalName);

  console.log(searchParams);

  pool.query(
    "INSERT INTO products (product_name, description, price, image, quantity, rating, user_id, subcategory_id, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      searchParams,
      body.description,
      body.price,
      body.image,
      body.quantity,
      0,
      body.userId,
      body.subcategoryId,
      body.type,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("added successfully");
    }
  );
};

//add a product to favorite list by user id and product id

const addProductTOFavorite = (req, res) => {
  const body = req.body;

  pool.query(
    "INSERT INTO favorite (product_id, user_id) VALUES ($1, $2)",
    [body.productId, body.userId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send("added successfully");
    }
  );
};

//get all favorite products by user id

const getFavoriteProducts = (req, res) => {
  const userId = req.params.userId;
  console.log("The user id is", userId);
  pool.query(
    "SELECT * FROM favorite INNER JOIN products ON favorite.product_id = products.id WHERE favorite.user_id = $1",
    [userId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};

//remove favorite product from favorite table

const removeProductFromFavorite = (req, res) => {
  const favoriteId = req.params.favoriteId;

  pool.query(
    "DELETE FROM favorite WHERE favorite_primery_id = $1",
    [favoriteId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send("removed successfully");
    }
  );
};

//add a product to cart table by user id and product id

const addProductToCart = (req, res) => {
  const body = req.body;

  pool.query(
    "INSERT INTO cart (user_id, product_id, cart_product_quantity) VALUES ($1, $2, $3)",
    [body.userId, body.productId, body.quantity],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send("added successfully");
    }
  );
};

// update a cart by cart id

const modifyCart = (req, res) => {
  const body = req.body;
  const cartId = req.params.cartId;

  pool.query(
    "UPDATE cart SET cart_product_quantity = $1 WHERE cart_primery_id = $2",
    [body.quantity, cartId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send("updated successfully");
    }
  );
};

//get all cart products by user id

const getProductsFromCart = (req, res) => {
  const userId = req.params.userId;
  console.log("The user id is", userId);
  pool.query(
    "SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = $1 ORDER BY cart.cart_primery_id DESC",
    [userId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};

// remove a product from cart by cartId

const removeProductFromCart = (req, res) => {
  const cartId = req.params.cartId;

  pool.query("DELETE FROM cart WHERE cart_primery_id = $1", [cartId], (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send("removed successfully");
  });
};

//get a type of product by subcategory Id

const getTypesBySubcategoryId = (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  pool.query(
    "SELECT * FROM type WHERE subcategory_id = $1",
    [subcategoryId],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).send(result.rows);
    }
  );
};


//get a list of products by search

const searchProducts = (req, res) => {
  const searchName = req.params.searchName.toString();
  const finalName = searchName.charAt(0).toUpperCase() + searchName.slice(1);
  const searchParams = finalName.toCamelCase(finalName);

  console.log('Search name :', searchParams);

  pool.query(`SELECT * FROM products WHERE product_name LIKE '%${searchParams}%' OR type LIKE '%${searchParams}%'`, (error, result) => {

    if (error) {
      throw error;
    }

    res.status(200).send(result.rows);
  });
};


//send sms from user list
const sendMessage = (req, res) => {

  console.log("Message = " + req.query.message);
  console.log("Number = " + req.query.number);
  console.log("Subject = " + req.query.subject);
  var params = {
      Message: req.query.message,
      PhoneNumber: '+' + req.query.number,
      MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
              'DataType': 'String',
              'StringValue': req.query.subject
          }
      }
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

  publishTextPromise.then(
      function (data) {
          res.end(JSON.stringify({ MessageID: data.MessageId }));
      }).catch(
          function (err) {
              res.end(JSON.stringify({ Error: err }));
          });

}

//delete an user from the db

const deleteUser = (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM users WHERE id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send(`user deleted with id ${id}`);
  });
};

String.prototype.toCamelCase = function(str) {
  return str
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); });
}

module.exports = {
  getUsersById,
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
  addProductTOFavorite,
  getFavoriteProducts,
  addProductToCart,
  getProductsFromCart,
  modifyCart,
  createSeller,
  getTypesBySubcategoryId,
  removeProductFromFavorite,
  removeProductFromCart,
  searchProducts,
  sendMessage,
};
