"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,

} from "@/components/ui/form"

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";

type FormType = "sign-in" | "sign-up"; // Ensure the type is defined

// Define the form schema dynamically based on the type.
const getFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForm = ({type}: { type: FormType }) => {
    const router = useRouter();
    const formSchema = getFormSchema(type) // Get the dynamic schema based on the type

    // 1. Define your form with the correct schema.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        if (type === "sign-up") {
            toast.success("Account created successfully. Please sign in")
            router.push("/sign-in")

        } else {
            toast.success("Sign up successfully")
            router.push("/")
        }
        try {

        } catch (error) {
            console.log(error)
            toast.error(`Something went wrong: ${error}`)
        }
    }

    const isSignIn = type === "sign-in"

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10 ">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>

                <h3>Practice job interview with ai</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormField name="name"
                                       control={form.control}
                                       label="Name"
                                       placeholder="Your name"
                                       type="text"/>)}
                        <FormField control={form.control}
                                   label="Email"
                                   placeholder="abc@test.com"
                                   name="email"
                                   type="email"/>

                        <FormField
                            control={form.control}
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            type="password"
                        />

                        <Button className="cursor-pointer btn"
                                type="submit">{isSignIn ? "Sign in" : "Create an account"}</Button>
                    </form>

                    <p className="text-center">
                        {isSignIn ? "Not an account yet?" : "Have an account already?"}
                        <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
                            {!isSignIn ? "Sign in" : "Create an account"}
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default AuthForm
