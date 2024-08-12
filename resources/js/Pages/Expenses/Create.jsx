import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from "react";

export default function Create({auth})
{
    const {data, setData, post, processing} = useForm({
        amount: '',
        description: '',
        type: '',
        date: new Date().toJSON().slice(0, 10)
    })
    useEffect(() => {
        data.date.length > 10 && setData('date', new Date().toJSON().slice(0, 10))
    }, [data])
    const submit = (e) => {
        e.preventDefault()
        post(route('expenses.store'))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Expenses</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="max-w-md mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" name="amount" id="amount"
                                       value={data.amount}
                                       onChange={(e) => setData('amount', e.target.value)}
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required/>
                                <label htmlFor="amount"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="description" id="description"
                                       value={data.description}
                                       onChange={(e) => setData('description', e.target.value)}
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required/>
                                <label htmlFor="description"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="date" name="date" id="date"
                                       value={data.date}
                                       onChange={(e) => setData('date', e.target.value)}
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required/>
                                <label htmlFor="date"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date{data.date === new Date().toJSON().slice(0, 10) ? (<span className={'ml-2 text-slate-200'}>(Today)</span>) : <></>}</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="countries"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <select id="countries"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option className={'bg-gray-800'} value={''}>Type</option>
                                    <option className={'bg-gray-800'} value={'1'} >Income</option>
                                    <option className={'bg-gray-800'} value={'2'} >Expense</option>
                                    <option className={'bg-gray-800'} value={'3'} >Loan (Taken)</option>
                                    <option className={'bg-gray-800'} value={'4'} >Loan (Given)</option>
                                </select>
                                {/*<label htmlFor="description"*/}
                                {/*       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>*/}
                            </div>


                            <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
