import moment from 'moment'
import Currency from 'react-currency-formatter';

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
    return (
        <div className='border rounded-md'>
            <div className="flex flex-col md:flex-row justify-between p-5 bg-gray-100 text-sm text-gray-600">
                <div className='pt-2'>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
                </div>

                <div className='pt-2'>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency='INR' /> - Next Day Delivery{"  "}
                        <Currency quantity={amountShipping} currency='INR' />
                    </p>
                </div>
                <div className='pt-2'>
                    <p className='w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
                        ORDER # {id}
                    </p>
                    <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items.length} items</p>
                </div>
            </div>

            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map((image, index) => (
                        <img src={image} key={index} className="h-10 object-contain sm:h-32" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
