import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FormValues = {
    username: string
    email: string
    channel: string
}

const YoutubehtmlForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            username: "Jhon Doe",
            email: "",
            channel: "",
        }
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form Submited: ", data)
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
                            type="channel"
                            id="text"
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
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                </div>
            </form>
        </div>
        <DevTool control={control} />
    </div>
  )
}

export default YoutubehtmlForm