const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map(item => ({
        quantity: 1,
        price_data: {
            currency: 'inr',
            unit_amount: item.price * 100,
            product_data: {
                description: item.description,
                name: item.title,
                images: [item.image]
            }
        }
    }))

    const shippingRates = [
        {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 10 * 100,
                    currency: 'inr',
                },
                display_name: 'Next-day Delivery',
                // Delivers between 5-7 business days
                delivery_estimate: {
                    minimum: {
                        unit: 'business_day',
                        value: 5,
                    },
                    maximum: {
                        unit: 'business_day',
                        value: 7,
                    },
                }
            }
        }
    ]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: shippingRates,
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'IN']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    })

    res.status(200).json({ id: session.id })
}