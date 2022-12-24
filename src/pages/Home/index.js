import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../FireBaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { toast } from "react-toastify";

import './style.css';

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {

          toast.success("Sucesso");
          navigate('/admin', { replace: true });
        })
        .catch((e) => {
          console.log(e.code)
          if (e.code === 'auth/user-not-found') {
            toast.error('E-mail não encontrado ou incorreto!');
          }
          else if (e.code === 'auth/wrong-password') {
            toast.error('Senha incorreta!');
          }
          else {
            toast.error('Conta não autenticada! ' + e.code);
          }
        });

    } else {
      toast.warn('Preencha todos os campos')
    }
  }

  return (
    <>
      <div className='home-container'>
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua agenda de forma fácil</span>

        <form className='form' onSubmit={handleLogin}>
          <input type="text" placeholder='Digite seu email...'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Digite sua senha...'
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Acessar</button>
        </form>

        <Link to="/register">
          Não possui uma conta? Cadastre-se aqui
        </Link>
      </div>
    </>
  )
}

export default Home;