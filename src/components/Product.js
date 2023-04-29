import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice'

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
    const [starsArray, setStarsArray] = useState(undefined);
    const [hydrated, setHydrated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // This forces a rerender, so the date is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
    );

    // Create an array for stars, if rating is 4 out of 5, then array will be [1, 1, 1, 1, 0]
    useEffect(() => {
        const starsList = [0, 0, 0, 0, 0]
        for (let index = 0; index < rating; index++) {
            starsList[index] = 1;
        }
        setStarsArray(starsList);
    }, [rating]);

    const [hasPrime] = useState(Math.random() < 0.5);

    const addItemToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime };
        // Sending the product as an action to the REDUX store... the basket slice
        dispatch(addToBasket(product));
    }

    // This is to prevent Hydration mismatch error
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
                {category}
            </p>

            <Image src={image} height={200} width={200} className='object-contain' alt='Product Image' />

            <h4 className='my-3'>{title}</h4>

            {/* Show list of stars according to the rating */}
            <div className='flex'>
                {starsArray && starsArray.map((star, index) => {
                    if (star === 1) {
                        return <SolidStar key={index} className='h-5 text-yellow-500' />
                    } else {
                        return <OutlineStar key={index} className='h-5 text-yellow-500' />
                    }
                })}
            </div>

            <div className='flex flex-col justify-start items-start'>
                <p className='text-xs line-clamp-2 my-2'>{description}</p>
                <div className='h-12'>
                    <Currency quantity={price} currency='INR' />
                </div>
                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-5 overflow-hidden relative'>
                        <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
                        <div className='flex flex-col justify-start items-start'>
                            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                        </div>
                    </div>
                )}
            </div>


            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product;