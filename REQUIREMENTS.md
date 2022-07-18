

## Schema Database

# ProductsOrder 

  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17, 2) NOT NULL, /* Limit price to 15 digits before decimal, and two after. */
  category VARCHAR(50) NOT NULL

# Products 


  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17, 2) NOT NULL, /* Limit price to 15 digits before decimal, and two after. */
  category VARCHAR(50) NOT NULL


# Users Schema

  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL

# Orders 

 id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id BIGINT REFERENCES users(id) NOT Null




## The Endpoints

# Users

endpoint : /api/users/
method : get
response : user objects

endpoint : /api/users/:id  => id for user id 
method : get
response : user object


endpoint : /api/users
method : POST
response : user objects
=> to create new user
need to json body request for  "email , userName,firstName , lastName ,password
      


endpoint : /api/users/:id  => id for user id 
method : Delete
response :user object
=> to delete the user 




endpoint : /api/users/:id  => id for user id 
method : patch
response :user object
=> to delete the user 
need to json body request for  "email , userName,firstName , lastName ,password


endpoint : /api/users/authenticate
method : POST
response :user object
=> need to json body request for info " userName , password "



# Products

endpoint : /api/products
method : GET
response :products object

endpoint : /api/products/:id
method : GET
response :product object

endpoint : /api/products
method : POST
response :product object
=> to create product
need to json body request for info " name , description,price,category"


endpoint : /api/products/:id
method : DELETE
response :products object


endpoint : /api/products/:id
method : patch
response :products object
need to json body request for info " id,name , description,price,category"


endpoint : /api/products
method : GET
response :products  object


  



# Orders

endpoint : /api/orders
method : GET
response :orders object

endpoint : /api/orders/:id
method : GET
response :order object


endpoint : /api/orders/:id
method : DELETE
response :deleted order object


endpoint : /api/orders/:id
method : patch
response :update order product 
need to json body request 

endpoint : /api/orders
method : POST
response :order object
need to json body request 









# Order Products

endpoint : /api/order-products/:order_id/products/:product_id
method : patch
response : array of the products  with an order
need to json body request 


endpoint : /api/order-products/:order_id/products/:product_id
method : DELETE
response : array of the products  with an order
need to json body request  for order id and product id



endpoint :/api/order-products/:order_id/products
method : GET
response :array of the products  with  order

endpoint : /api/order-products/:order_id/products/:product_id
method : GET
response : array of the products  with an order



endpoint : /api/orders/:id
method : patch
response :update order product 
need to json body request 




