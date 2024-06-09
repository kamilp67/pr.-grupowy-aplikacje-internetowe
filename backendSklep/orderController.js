const { Order, OrderItems } = require('./model')

exports.getAllOrders = async (req, res) => {
    
    try {
      const userId = res.locals.user.dataValues.id
      const orders = await Order.findAll({
        where: {
            userId: userId
        }
      })
      res.json(orders)
    } catch (error) {
    //   console.error(error);
      res.status(500).send('Internal Server Error', error);
    }
}; 

exports.getOrderItems = async (req, res) => {

    try {
        const orderId = req.params.id
        const orderItems = await OrderItems.findAll({
            where: {
                orderId: orderId
            }
          })
        res.json(orderItems)
    } catch(err) {
        // console.error(err);
      res.status(500).send('Internal Server Error', err);
    }
}

exports.createOrder = async (req, res) => {
    try {

        const { id, address, books, price } = req.body;
        console.log(id, address, books, price);

        const user_id = 1


        const order = await Order.create({
            userId: user_id,
            address: address,
            price: price,
            status: 'Pending'
        })

        console.log(order.id);

        // console.log(books.length);
        for (const book of books) {
            console.log(book);
            await OrderItems.create({
                orderId: order.id,
                bookId: book.id,
                quantity: book.quantity
            })
        }

        res.status(201).json({ order });

    } catch (error) {
        console.error('Blad przy wykonywaniu zamówienia: ', error.message);
        res.status(500).send('Błąd przy wykonywaniu zamówienia.');
    }
};