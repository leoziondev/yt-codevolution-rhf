import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react'

type FormValues = {
    username: string
    email: string
    channel: string
    social: {
        twitter: string
        facebook: string
    }
    phoneNumbers: string[]
    phNumbers: {
        number: string
    }[],
    age: number
    dob: Date
}

const YoutubehtmlForm = () => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        getValues,
        setValue,
        reset,
        trigger,
        formState: {
            errors,
            touchedFields,
            dirtyFields,
            isDirty,
            isValid,
            isSubmitting,
            isSubmitted,
            isSubmitSuccessful,
            submitCount
        }
    } = useForm<FormValues>({
        defaultValues: {
            username: "Jhon Doe",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: '' }],
            age: 0,
            dob: new Date()
        },
        mode: "onTouched"
    })

    // console.log({ touchedFields, dirtyFields, isDirty, isValid })
    console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount })

    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form Submited: ", data)
        
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log("Form Errors: ", errors)
    }

    const handleGetValues = () => {
        // console.log("Get values: ", getValues("social"))
        console.log("Get values: ", getValues(["username","email", "social"]))
    }

    const handleSetValue = () => {
        setValue("username", "", {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    useEffect(() => {
        if (isSubmitSuccessful) reset()
    }, [isSubmitSuccessful, reset])

    // const watchUsername = watch('username')
    // const watchForm = watch()
    // console.log(watchForm)

    // useEffect(() => {
    //     const subscription = watch((value) => {
    //         console.log(value)
    //     })
    //     return () => subscription.unsubscribe()
    // }, [watch])

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6" noValidate>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="username"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.username?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-2">
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email format"
                                },
                                validate: {
                                    notAdmin: (fieldValue) => {
                                        return (
                                            fieldValue !== "admin@example.com" ||
                                            "Enter a different email address"
                                        )
                                    },
                                    notBlackListed: (fieldValue) => {
                                        return !fieldValue.endsWith("baddomain.com") ||
                                        "This domain is not supported"
                                    },
                                    emailAvailable: async (fieldValue) => {
                                        const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
                                        const data = await res.json()

                                        return data.length == 0 || "Email already exists"
                                    }
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.email?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="channel" className="block text-sm font-medium leading-6 text-gray-900">Channel</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="channel"
                            {...register("channel", {
                                required: {
                                    value: true,
                                    message: "Channel is required"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.channel?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-gray-900">Twitter</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="twitter"
                            {...register("social.twitter", {                                
                                // disabled: true,
                                disabled: watch("channel") === "",
                                required: "Enter twitter profile"
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 disabled:cursor-not-allowed" />
                            <p className="text-red-500 text-sm italic">{errors.social?.twitter?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="facebook" className="block text-sm font-medium leading-6 text-gray-900">Facebook</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="facebook"
                            {...register("social.facebook", {
                                required: {
                                    value: true,
                                    message: "Facebook is required"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.social?.facebook?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="WhatsApp" className="block text-sm font-medium leading-6 text-gray-900">WhatsApp</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="WhatsApp"
                            {...register("phoneNumbers.0", {
                                required: {
                                    value: true,
                                    message: "Enter whatsapp number"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.phoneNumbers?.[0]?.message}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="comercialPhone" className="block text-sm font-medium leading-6 text-gray-900">Comercial Phone</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="comercialPhone"
                            {...register("phoneNumbers.1", {
                                required: {
                                    value: true,
                                    message: "Enter comercial phone contact"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.phoneNumbers?.[1]?.message}</p>
                    </div>
                </div>

                <div>
                    <label>List of phone numbers</label>
                    {fields.map((field, index) => {
                        return (
                            <div className="flex gap-2 mt-2" key={field.id}>
                                <input
                                    type="text"
                                    {...register(`phNumbers.${index}.number` as const)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-red-500 py-1 px-2 rounded-md text-white"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <button
                        type="button"
                        onClick={() => append({ number: "" })}
                        className="mt-2 bg-indigo-500 py-1 px-2 rounded-md text-white"
                    >
                        Add +
                    </button>
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                    <div className="mt-2">
                        <input
                            type="number"
                            id="age"
                            {...register("age", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "age is required"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.age?.message}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                    <div className="mt-2">
                        <input
                            type="date"
                            id="dob"
                            {...register("dob", {
                                valueAsDate: true,
                                required: {
                                    value: true,
                                    message: "Date o birth is required"
                                }
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.dob?.message}</p>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"                   
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed mt-4"
                        disabled={!isDirty ||  isSubmitting}
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        onClick={handleGetValues}                        
                        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                    >
                        Get Values
                    </button>
                    <button
                        type="button"
                        onClick={handleSetValue}
                        className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                    >
                        Set Value
                    </button>
                    <button
                        type="button"
                        onClick={() => trigger("channel")}
                        className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                    >
                        Validation Trigger
                    </button>
                </div>
            </form>
        </div>
        <DevTool control={control} />
    </div>
  )
}

export default YoutubehtmlForm