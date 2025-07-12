'use client'
import React,{useState,useEffect} from "react"
import { UserButton,useUser } from "@clerk/nextjs"
import CardInfo from "./_components/CardInfo";
import { db } from "../../../../utils/dbConfig";
import { desc, eq, sql, getTableColumns } from "drizzle-orm";
import { Budgets, Incomes, Expenses } from "../../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
function Dashboard(){
    const {user}=useUser();

    const [budgetList,setBudgetList]=useState([])
    const [incomeList,setincomeList]=useState([])
    const [expenseList,setexpenseList]=useState([])

    useEffect(()=>{
        user&&getBudgetList()
    },[user])
    const getBudgetList=async ()=>{
        const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql`sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
            totalItem:sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));
        setBudgetList(result) ;
        getAllExpenses();
        getAllIncomeList();
    };

    const getAllIncomeList=async()=>{
        try{
            const result=await db.select({
                ...getTableColumns(Incomes),
                totalAmount:sql`sum(CAST(${Incomes.amount} AS numeric))`.mapWith(Number),
            }).from(Incomes).groupBy(Incomes.id)
            setincomeList(result);
        }catch(error){
            console.log('error fetching income list',error);
        }
    };

    const getAllExpenses=async()=>{
        const result= await db.select({
            id:Expenses.id,
            name: Expenses.name,
            amount:Expenses.amount,
            createdAt:Expenses.createdAt
        }) .from(Budgets).rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id))
        setexpenseList(result)
    };

    return (
        <div className="p-8">
            <h2 className="font-bold text-4xl">Hi, {user?.fullName }</h2>
            <p className="text-gray-500">Here's what happening with your money.Lets manage your expenses</p>
            <CardInfo budgetList={budgetList} incomeList={incomeList}/>
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
                <div className="lg:col-span-2">
                    <BarChartDashboard budgetList={budgetList}/>
                    <ExpenseListTable
                    expenseList={expenseList}
                    refreshData={()=> getBudgetList()}
                    />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-bold test-lg">Latest Budget</h2>
                    {budgetList?.length>0? budgetList.map((budget,index)=>(
                         <BudgetItem budget={budget} key={index} />
                    )):[1, 2, 3, 4].map((item, index) => (
  <div key={index} className="h-[180px] w-full bg-slate-200 lg animate-pulse"></div>
))}

                </div>
            </div>
        </div>
    );
}
export default Dashboard;