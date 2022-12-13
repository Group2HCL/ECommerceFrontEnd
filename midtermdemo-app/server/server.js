const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("sk_test_51M8wDWEFgnWSeeLrYvcDqiRPxIHfthAc2lLufavyuKdXbzZTHAjo4M0e7fNawhsK5GDoNdA8bQg1Nha3KV5abXnp00SIpjO1qz");

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                      name: item.name,
                      images: [item.imageUrl]
                    },
                    unit_amount: item.unitPrice * 100,
                  },
                  quantity: item.quantity,
                })),
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html",
        });

        res.status(200).json(session);
        console.log(JSON.stringify(session));

    } catch (error) {
        next(error);
    }
});


app.listen(4242, () => console.log("App is running on 4242"));