const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: {
              args: true,
              msg: 'Enter a valid email'
          }
      }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: [4], 
              msg: 'Password must be at least 4 characters long'
          }
      }
  }
});

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});


const OrderItems = sequelize.define('OrderItems', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id',
      },
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
});


module.exports = { User, Order, OrderItems };