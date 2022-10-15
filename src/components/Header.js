import Image from 'next/image'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const items = useSelector(selectItems);

    return (
        <header>
            {/* Top Nav */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                {/* Company logo */}
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image onClick={() => router.push('/')} src="https://links.papareact.com/f90" objectFit='contain' className='cursor-pointer' width={150} height={40} />
                </div>

                {/* Search */}
                <div className='hidden sm:flex bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md items-center flex-grow cursor-pointer'>
                    <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md' />
                    <MagnifyingGlassIcon className='h-12 p-4' />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div onClick={!session ? signIn : signOut} className='link'>
                        <p>{session ? `Hello, ${session?.user?.name}` : 'Sign In'}</p>
                        <p className='font-extrabold md:text-sm'>Account & List</p>
                    </div>
                    <div className='link' onClick={() => router.push('/orders')}>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div className='relative link flex items-center' onClick={() => router.push('/checkout')}>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className='flex items-center space-x-3 pl-6 bg-amazon_blue-light text-white text-sm'>
                <p className='link flex items-center'>
                    <Bars3Icon className='h-6 mr-1' />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's deal</p>
                <p className='link hidden md:inline-flex'>Electronics</p>
                <p className='link hidden md:inline-flex'>Food & Grocery</p>
                <p className='link hidden md:inline-flex'>Prime</p>
                <p className='link hidden md:inline-flex'>Buy Again</p>
                <p className='link hidden md:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden md:inline-flex'>Health & Personal Kit</p>
            </div>
        </header>
    )
}

export default Header
