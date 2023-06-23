import {Form, redirect} from "react-router-dom"

async function fakeAPI_login(request) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                servError: [],
                data: null
            })
        }, 1000)
    })
} 

export async function action({request}) {
    const res = await fakeAPI_login(request)
    if (!res.success) {
        // TODO: make error popups
        return console.log("error")
    }
    return redirect("/dashboard")
}

export default function Login() {
    return (
        <div className="flex">
            <div className="h-screen w-6/12 flex items-center bg-[url('assets/login-bg.png')] bg-cover bg-no-repeat ">
                <p className="ml-20 font-sans font-bold text-gray-50 text-8xl">Welcome<br />Back!</p>
            </div>
            <div className="w-8/12 flex justify-center items-center">
                <Form method="post">
                    <p className="mb-4 text-3xl font-bold">Hallo! 👋</p>
                    <p className="mb-6 font-semibold text-gray-500">Welcome back! Please login to your account.</p>
                    <label className="mb-2 block text-sm text-gray-600 font-semibold" htmlFor="username">Username</label>
                    <input className="block w-full py-2 px-3 mb-4 font-semibold text-sm text-gray-600 rounded-lg border-2 border-slate-200 " id="username" type="text" name="username" placeholder="Enter your username"/>
                    <label className="mb-2 block text-sm text-gray-600 font-semibold" htmlFor="password">Password</label>
                    <input className="block w-full py-2 px-3 mb-8 font-semibold text-sm text-gray-600 rounded-lg border-2 border-slate-200 " id="password" type="password" name="password" placeholder="Enter your password"/>
                    <button className="py-2 px-3 w-full font-extrabold text-zinc-50 bg-stone-950 rounded-lg" type="submit">Login</button>
                </Form>
            </div>
        </div>
    )
}