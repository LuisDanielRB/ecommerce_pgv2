require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const paymentStripe = async (req, res) => {
    const {id, amount} = req.body
    try {
        await stripe.paymentIntents.create(
            {
                amount,
                currency: 'USD',
                payment_method: id,
                confirm:true
            },

        )

        res.send('recived')
    } catch (error) {
        console.log(error.raw.message)
        res.json({message: error.raw.message})
    }
};


module.exports = {
    paymentStripe
};