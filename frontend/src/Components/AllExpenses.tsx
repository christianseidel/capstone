import React, {useState, useEffect} from 'react';
import {ExpenseDTO} from "./model";
import ExpenseItem from "./ExpenseItem"
import {useNavigate} from "react-router-dom";
import './expenses.css'

function AllExpenses() {

    const nav = useNavigate();
    const [expensesDTO, setExpensesDTO] = useState({} as ExpenseDTO);
    let loading : String = 'loading ...'

    useEffect(() => {
        fetchAllExpenses()
    }, []);

    const fetchAllExpenses = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/expenses`)
            .then(response => response.json())
            .then((responseBody: ExpenseDTO) => {
                setExpensesDTO(responseBody)
            })
    }

    return (
        <div>
            <div>
                <h1>SmartCount &ndash; Your Multi-User Cashbook</h1>
            </div>

            <div>
                {expensesDTO.expenses ? expensesDTO.expenses.map(item => <ExpenseItem key={item.id} expense={item}
                                                                                onItemDeletion={fetchAllExpenses}
                                                                                onExpenseChange={setExpensesDTO}/>)
                    : <span>{loading}</span>}
            </div>

            <div className={"sum"}>
                {(expensesDTO.sum !== 0) && <span>Gesamtausgaben:</span>}
                <span>{expensesDTO.sum ? (expensesDTO.sum).toLocaleString('de-De', {
                style: 'currency', currency: 'EUR', minimumFractionDigits: 2  // hard-coded "EUR" will be solved and implemented at a later point in time
            })
                : ((expensesDTO.sum === 0) ? <span>Es wurden noch keine Ausgaben erfasst.</span> : <span>{loading}</span>)}</span></div>

            <div>
                <button id={"create-button_FrontPage"} onClick={() => nav('/edit')}>Neue Ausgabe hinzufügen</button>
            </div>
            <div>
                <button id={"createUser-button_FrontPage"} onClick={() => nav('/users')}>Nutzer registrieren</button>
            </div>

        </div>
    );
}

export default AllExpenses;
