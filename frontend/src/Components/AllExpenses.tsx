import React, {useState, useEffect} from 'react';
import {Expense} from "./model";
import ExpenseItem from "./ExpenseItem"
import {useNavigate} from "react-router-dom";
import EditExpense from "./EditExpense";

function AllExpenses() {

    const nav = useNavigate();
    const [list, setList] = useState([] as Array<Expense>);


    useEffect(() => {
        fetchAllExpenses()
    }, []);

    const fetchAllExpenses = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/expenses`)
            .then(response => response.json())
            .then((responseBody: Array<Expense>) => {
                setList(responseBody)
            })
    }


    return (
        <div>
            <div>
                <h1>SmartCount &ndash; Your Multi-User Cashbook</h1>
            </div>

            <div>
                {list.map(item => <ExpenseItem key={item.id} expense={item}
                                               onItemDeletion={fetchAllExpenses}
                                               onExpenseChange={setList} />)}
            </div>
            <div>
                <button onClick={() => nav(`/edit`)}>Add New Expense</button>
            </div>
        </div>
    );
}

export default AllExpenses;