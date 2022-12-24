import { useEffect, useState } from "react";
import { auth } from '../FireBaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from "react-router-dom";



export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);


    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                // se tem user logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    };

                    localStorage.setItem("@detailUser", JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true);
                }else{
                    // não possui user logado
                    setLoading(false);
                    setSigned(false);
                }
                console.log(unsub);
            })
        }
        checkLogin();
    },[]);

    if(loading){
        return(
            <div>
                <span>Carregando...</span>
            </div>
        );
    }
    if (!signed) {
        return <Navigate to="/"/>
    }

    return children;
}