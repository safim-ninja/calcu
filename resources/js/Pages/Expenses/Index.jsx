import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Link, Head, useForm} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Edit } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
const padIndex = (index, maxEntries) => {
    const maxDigits = String(maxEntries).length;
    return String(index).padStart(maxDigits, '0');
};
export default function Index({auth, expenses, income, expense, loan_taken, loan_given, pre_month}) {

    const {delete: destroy} = useForm();

    const handleDelete = (id) => {
        destroy(route('expenses.destroy', id), {
            preserveScroll: true
        });
    }

    const [month, setMonth] = useState(pre_month || dayjs().format('MMMM'));
    const [year, setYear] = useState(dayjs().format('YYYY'));

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ]
    const years = Array.from({ length: 10 }, (_, i) => dayjs().year() - i);

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
    };

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };
    const maxEntries = expenses.length;

    return (
        <AuthenticatedLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 dark:text-slate-200 leading-tight">Expenses</h2>}
        >
            <Head title="Profile"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Report */}
                    <div className="pt-4 pb-8 px-8 bg-white dark:bg-slate-400/10 shadow sm:rounded-lg">
                        <div className="flex justify-center pb-4">
                            <h1 className="text-black text-2xl dark:text-slate-400 font-semibold ">
                                Report of
                                <select onChange={handleMonthChange} defaultValue={month}
                                        className="border-0 underline bg-none bg-gray-50 text-black text-2xl dark:text-slate-400 font-semibold rounded-lg focus:transparent dark:focus:ring-transparent ring-transparent dark:ring-transparent p-2 dark:bg-transparent dark:border-transparent dark:placeholder-gray-400 text-center">
                                    {months.map((month, index) => (
                                        <option className={'bg-gray-800'} key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <select onChange={handleYearChange} defaultValue={year}
                                    className="border-0 underline bg-none bg-gray-50  text-black text-2xl dark:text-slate-400 font-semibold rounded-lg focus:transparent dark:focus:ring-transparent ring-transparent dark:ring-transparent p-2 dark:bg-transparent dark:border-transparent dark:placeholder-gray-400">
                                    {years.map((year) => (
                                        <option className={'bg-gray-800'} key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <Link href={route('expenses.index', {month: month, year: year})} preserveScroll>Filter</Link>
                            </h1>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                                <thead
                                    className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3"> Income </th>
                                    <th scope="col" className="px-6 py-3"> Expense </th>
                                    <th scope="col" className="px-6 py-3"> Loan taken </th>
                                    <th scope="col" className="px-6 py-3"> Loan Given </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className='bg-white font-semibold dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'>
                                    <th className="px-6 py-3">{income}</th>
                                    <td className="px-6 py-3">{expense}</td>
                                    <td className="px-6 py-3">{loan_taken}</td>
                                    <td className="px-6 py-3">{loan_given}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="pt-4 pb-8 px-8 bg-white dark:bg-slate-400/10 shadow sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex justify-center pb-4">
                            <h1 className="text-black text-2xl dark:text-slate-400 font-semibold ">
                                Report of
                            </h1>
                        </div>
                            <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Amount</th>
                                        <th scope="col" className="px-6 py-3">Type</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                        <th scope="col" className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {expenses?.map((expense, index) => {
                                    return (
                                        <tr key={index} className={`bg-white font-semibold dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 ${index+1 !== expenses.length ? 'border-b' : ''}`}>
                                            <th scope="row" className="px-6 py-2 text-slate-900 whitespace-nowrap dark:text-white"> {padIndex(index + 1, maxEntries)}</th>
                                            <td className="px-6 py-2"> {expense.amount} </td>
                                            <td className="px-6 py-2">
                                                {expense.type === 1 ? 'Income' : expense.type === 2 ? 'Expense' : expense.type === 3 ? 'Loan Taken' : expense.type === 4 ? 'Loan Given' : ''}
                                            </td>

                                            <td className="px-6 py-2 font-mono"> {dayjs(expense.date).format('DD MMM YYYY')} </td>
                                            <td className="px-6 py-2"> {expense.description} </td>
                                            <td className="px-6 py-2 text-right">
                                                <Link href={route('expenses.edit', expense.id)} >
                                                    <button className="font-medium rounded bg-slate-800 px-3 py-1 mx-1 hover:text-blue-500 hover:bg-slate-900">
                                                        <Edit />
                                                    </button>
                                                </Link>
                                                <button onClick={() => handleDelete(expense)} className="font-medium rounded bg-slate-800 px-3 py-1 mx-1 hover:text-blue-500 hover:bg-slate-900"><DeleteOutlineIcon /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
