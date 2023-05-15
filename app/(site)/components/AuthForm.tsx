'use client'; //Defining to Next.js that this is a client component not a server component!

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import {useCallback, useState} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {FaGithub, FaGoogle} from 'react-icons/fa';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    //sets the button to Login or Register based on the current variant
    const toggleVariant = useCallback(() =>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }
        else{
            setVariant('LOGIN');
        }
    },[variant]);

    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        //the default values in the user form
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant === 'REGISTER'){
            //!TODO Axios Register
        }
        if(variant === 'LOGIN'){
            //!TODO NextAuth SignIn
        }
    }

    const socialAction = (action: string) =>{
        setIsLoading(true);
        //!TODO NextAuth Social Sign In
    }

    //The Form uses handleSubmit so it can pass the data to the onSubmit function above
    return (  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input id="name" label={"Name"} type="name" register={register} errors={errors}/>
                    )}
                    <Input id="email" label={"Email Address"} type="email"register={register} errors={errors}/>
                    <Input id="password" label={"Password"} type="password"register={register} errors={errors}/>
                    <div>
                        <Button disabled={isLoading} fullWidth type='submit'>
                            {variant === 'LOGIN'? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={FaGithub} onClick={()=>socialAction('github')}/>
                        <AuthSocialButton icon={FaGoogle} onClick={()=>socialAction('google')}/>
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?':'Already have an account?'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer hover:text-sky-500">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuthForm