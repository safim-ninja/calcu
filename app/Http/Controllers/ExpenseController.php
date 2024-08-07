<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->month ? Carbon::parse($request->month)->month : Carbon::now()->month;
        $year = $request->year ?? Carbon::now()->year;
        $expenses = Auth::user()->expenses;
        $total_income_this_month = Expense::where('user_id', Auth::user()->id)->where('type', 1)->whereYear('date', $year)->whereMonth('date', $month)->get();
        $total_expense_this_month = Expense::where('user_id', Auth::user()->id)->where('type', 2)->whereYear('date', $year)->whereMonth('date', $month)->get();
        $total_loan_taken_this_month = Expense::where('user_id', Auth::user()->id)->where('type', 3)->whereYear('date', $year)->whereMonth('date', $month)->get();
        $total_loan_given_this_month = Expense::where('user_id', Auth::user()->id)->where('type', 4)->whereYear('date', $year)->whereMonth('date', $month)->get();

        // dd(Carbon::now()->month);
        return Inertia::render('Expenses/Index', [
            'pre_month' => $request->month,
            'expenses' => $expenses,
            'income' => $total_income_this_month->sum('amount'),
            'expense' => $total_expense_this_month->sum('amount'),
            'loan_taken' => $total_loan_taken_this_month->sum('amount'),
            'loan_given' => $total_loan_given_this_month->sum('amount'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Expenses/Create');
    }

    public function store(Request $request)
    {
        Expense::create([
            'user_id' => \Auth::user()->id,
            'amount' => $request->amount,
            'description' => $request->description,
            'type' => $request->type,
            'date' => $request->date,
        ]);
        return redirect(route('expenses.index'));
    }


    public function show(Expense $expense)
    {
        //
    }

    public function edit(Expense $expense)
    {
        return Inertia::render('Expenses/Edit', [
            'expense' => $expense
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $expense->update([
            'amount' => $request->amount,
            'description' => $request->description,
            'type' => $request->type,
            'date' => $request->date,
        ]);
        return redirect(route('expenses.index'));
    }

    public function destroy(Expense $expense)
    {
        $expense ? $expense->delete() : abort(404);
    }
}
