import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Image from "next/image";
import Header from "../../components/Header";
import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function SignIn({ providers }) {
    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-md justify-center mx-auto">
                    <img onClick={() => router.push('/')} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" className="w-40 h-12 mt-8 cursor-pointer object-cover" />
                </div>
                <div className="max-w-md w-4/6 justify-center mx-auto mt-6 border border-opacity-60 border-gray-400 rounded-md">
                    <div className="min-w-full">
                        <div className="text-2xl p-2 mx-2 border-b border-gray-400 border-opacity-60">
                            <h1 className="pr-32 pb-2">Sign In</h1>
                        </div>
                        <div>
                            <UserCircleIcon className="w-20 h-20 my-6 rounded-full justify-center mx-auto m-4" />
                            {Object.values(providers).map((provider) => (
                                <div className="flex flex-col space-y-2 m-4" key={provider.name}>
                                    <button className="button text-sm" onClick={() => SignIntoProvider(provider.id, {
                                        callbackUrl: "/"
                                    })}>
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <p className="justify-center text-xs italic mx-auto mt-6">This is not a real application. It is build for educational purposes only.</p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers },
    }
}