import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../FireBaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { toast } from "react-toastify";

import './style.css';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    if (email && password) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Conta cadastrada com sucesso", { position: "top-center" });

          navigate('/admin', { replace: true });
        })
        .catch((e) => {
          console.log(e.code)
          if (e.code === 'auth/invalid-email') {
            toast.error('E-mail digitado é inválido! ' + e.code, { position: "top-center" });
          }
          else if (e.code === 'auth/weak-password') {
            toast.error('A senha precisa conter pelo menos 6 caracteres! ' + e.code, { position: "top-center" });
          } else {
            toast.error('Erro ao criar conta! ' + e.code, { position: "top-center" });
          }
        });

    } else {
      toast.warn('Preencha todos os campos', { position: "top-center" })
    }
  }

  return (
    <>
      <div className='home-container'>

        <h1>Crie sua conta</h1>
        <span>Com poucos dados e de forma segura</span>
        <form className='form' onSubmit={handleRegister}>
          <input type="text" placeholder='Digite seu email...'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Digite sua senha...'
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Cadastrar</button>
        </form>

        <div className="info">
          <Link to="/">
            <p>
              Já possui uma conta?
            </p>
            <p>
              Clique aqui para fazer sua autenticação
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Register;