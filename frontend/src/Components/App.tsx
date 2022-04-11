import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllExpenses from "./AllExpenses";
import EditExpense from "./EditExpense";
import CreateExpense from "./CreateExpense";
import CreateUser from "./UserManagement/CreateUser";
import AuthProvider from "./UserManagement/AuthProvider";
import LoginUser from "./UserManagement/LoginUser";

function App() {

    return (
        <div>
            <Suspense fallback={"Loading..."}>
                <BrowserRouter>
                    <AuthProvider>

                        <Routes>
                            <Route path={'/'} element={<AllExpenses/>}/>
                            <Route path={'/expenses'} element={<AllExpenses/>}/>
                            <Route path={'/edit'} element={<CreateExpense/>}/>
                            <Route path={'/edit/:expenseId'} element={<EditExpense/>}/>
                            <Route path={'/users/register'} element={<CreateUser/>}/>
                            <Route path={'/users/login'} element={<LoginUser/>}/>

                        </Routes>

                    </AuthProvider>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
