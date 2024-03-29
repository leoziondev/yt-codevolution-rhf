import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    channel: yup.string().required("Channel is required")
})

type FormValues = {
    username: string
    email: string
    channel: string
}

const YupYoutubeForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({
        defaultValues: {
            username: "Jhon Doe",
            email: "",
            channel: ""
        },
        resolver: yupResolver(schema)
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
                            {...register("username")}
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
                            {...register("email")}
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
                            {...register("channel")}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            <p className="text-red-500 text-sm italic">{errors.channel?.message}</p>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed mt-4"                        
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
        <DevTool control={control} />
    </div>
  )
}

export default YupYoutubeForm