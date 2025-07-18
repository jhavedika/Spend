import {
    PiggyBank, // <-- corrected
    ReceiptText,
    Wallet,
    Sparkles,
    CircleDollarSign
} from 'lucide-react'
import React,{useEffect,useState} from 'react'
import getFinancialAdvice from '../../../../../utils/getFinancialAdvice'
import formatNumber from '../../../../../utils/index' // <-- add this import

function CardInfo({budgetList,incomeList}){
    const [totalBudget, setTotalBudget]= useState(0)
    const [totalSpend,setTotalSpent]= useState(0)
    const [totalIncome,setTotalIncome]= useState(0)
    const [financialAdvice,setFinancialAdvice]= useState('')

    useEffect(()=>{
        if(budgetList.length>0||incomeList.length>0){ // fixed
            CalculateCardInfo();
        }
    },[budgetList,incomeList])

    useEffect(()=>{
        if(totalBudget>0||totalIncome>0||totalSpend>0){
            const fetchFinancialAdvice=async ()=>{
                const advice=await getFinancialAdvice(totalBudget,totalIncome,totalSpend)
            
            setFinancialAdvice(advice)
            };
        fetchFinancialAdvice();
    }
},[totalBudget,totalIncome,totalSpend]);

    const CalculateCardInfo=()=>{
        let totalBudget_=0;
        let totalIncome_=0;
        let totalSpend_=0;

        budgetList.forEach((element)=>{
            totalBudget_ = totalBudget_ + Number(element.amount)
            totalSpend_ = totalSpend_ + Number(element.totalSpend);
        })
        incomeList.forEach((element)=>{
            totalIncome_ = totalIncome_ + Number(element.totalAmount);
        })

        setTotalBudget(totalBudget_)
        setTotalSpent(totalSpend_)
        setTotalIncome(totalIncome_)
    };
    return (
        <div>
            {budgetList.length>0?( // fixed
                <div>
                    <div className='p-7 border mt-4 rounded-2xl flex items-center justify-between'>
                        <div>
                            <div className='flex mb-2 flex-row space-x-1 items-center'>
                                <h2 className='text-md'>Spend Smart AI</h2>
                                <Sparkles className='rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 vai-red-500 to-yellow-500 background-animate'/>
                            </div>
                            <h2 className='font-light text-md'>
                                {financialAdvice||"loading financial advice..."}
                            </h2>
                        </div>
                    </div>
                <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='p-7 border rounded-2xl flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>${formatNumber(totalBudget)}</h2> {/* fixed */}
                        </div>
                        <PiggyBank className='bg-blue-800 p-3 h-12 w-12 rounded-full text-white'/>
                    </div>
                    <div className='p-7 border rounded-2xl flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Spend</h2>
                            <h2 className='font-bold text-2xl'>${formatNumber(totalSpend)}</h2> {/* fixed */}
                        </div>
                        <ReceiptText className='bg-blue-800 p-3 h-12 w-12 rounded-full text-white'/>
                    </div>
                    <div className='p-7 border rounded-2xl flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>No. of Budget</h2>
                            <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                        </div>
                        <Wallet className='bg-blue-800 p-3 h-12 w-12 rounded-full text-white'/>
                    </div>
                    <div className="p-7 border rounded-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">Sum of Income Streams</h2>
                            <h2 className="font-bold text-2xl">
                              ${formatNumber(totalIncome)}
                            </h2>
                        </div>
                        <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                    </div>
                </div>
            </div>   
            ):(
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
export default CardInfo;
