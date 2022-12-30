import { useState, useEffect } from 'react';

import { auth, db } from '../../FireBaseConnection';
import { signOut } from 'firebase/auth';

import {
  addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc
} from 'firebase/firestore';


import { toast } from "react-toastify";

import './style.css';

const Admin = () => {
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [tarefaInput, setTarefaInput] = useState('');
  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];
          snapshot.forEach((item) => {
            lista.push({
              id: item.id,
              tarefa: item.data().tarefa,
              userUid: item.data().userUid,
            })
          });

          setTarefas(lista);
          console.log(unsub);
        });
      }
    }
    loadTarefas();
  }, [])

  async function handleTask(e) {
    e.preventDefault();
    if (tarefaInput === '') {
      toast.warn("Digite sua tarefa", { position: "top-center" });
      return;
    }

    if (edit?.id) {
      handleUpdateTask();
      return;
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        toast.success("Tarefa salva com sucesso!", { position: "top-center" });
        setTarefaInput('');
      })
      .catch((e) => {
        toast.error("Ocorreu um erro: " + e, { position: "top-center" });
      })
  }

  async function handleUpdateTask() {
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
      .then(() => {
        toast.success("Tarefa atualizada com sucesso!", { position: "top-center" });
      })
      .catch((e) => {
        toast.error("Ocorreu um erro: " + e, { position: "top-center" });
      });
    setTarefaInput('');
    setEdit({});
  }

  async function deleteTask(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("Tarefa concluída com sucesso!", { position: "top-center" });
      })
      .catch((e) => {
        toast.error("Ocorreu um erro: " + e, { position: "top-center" });
      })
  }

  async function editTask(objTask) {
    setTarefaInput(objTask.tarefa);
    setEdit(objTask);
  }

  async function handleLogout() {
    await signOut(auth);
  }


  return (
    <>
      <div className='admin-container'>
        <h1>App Minhas Tarefas</h1>

        <form className='form' onSubmit={handleTask}>
          <textarea
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            placeholder='Digite sua tarefa' />

          {Object.keys(edit).length > 0 ?
            (
              <button className='btn-register' style={{ backgroundColor: '#4FB524' }} type='submit'>Atualizar Tarefa</button>
            )
            :
            (
              <button className='btn-register' type='submit'>Registrar Nova Tarefa</button>
            )
          }
        </form>

        <h1>Lista de Tarefas</h1>
        {tarefas &&
          tarefas.map((item) => (
            <article key={item.id} className='list'>
              <p>{item.tarefa}</p>

              <div>
                <button onClick={() => editTask(item)}>Editar</button>
                <button onClick={() => deleteTask(item.id)} className='btn-delete'>Concluir</button>
              </div>
            </article>))
        }

        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    </>
  )
}

export default Admin