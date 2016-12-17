# Mums-shop
A simple nodejs express application for the ticketea challenge

# Technologies

- NodeJS
- MongoDB
- ExpressJS
- jQuery


#Install

```sh
#Optional: Make sure to have mongod running
mongod

git clone https://github.com/josecolella/Mums-shop.git
cd Mums-shop/
# To restore documents into products collection of mumshop db
mongorestore --archive=products.20161712.archive --db mumshop
# Install all dependencies
npm install
# A server is started at http://localhost:3000
npm start
```

#Usage

The main page contains all the products with a simple panel to the right that allows you to see the products added.

!["Main page"](https://d17oy1vhnax1f7.cloudfront.net/items/3p2t3N302D3L2W3a083S/Screen%20Recording%202016-12-17%20at%2003.33%20pm.gif)


- Three for two requirement

!["Three for two requirement"](https://cl.ly/2u1Q2q1V2x3e/Screen%20Recording%202016-12-17%20at%2003.37%20pm.gif)


- Menu requirement

!["Menu requirement"](https://cl.ly/3q0N1O191A3L/Screen%20Recording%202016-12-17%20at%2003.38%20pm.gif)






