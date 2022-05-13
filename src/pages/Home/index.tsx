import React, { useState, useEffect } from 'react' // importar React, useState e useEffect do react
import './styles.css'

import { Card, CardProps } from '../../components/Card'

interface ProfileResponse {
  name: string
  avatar_url: string
}

interface User {
  name: string
  avatar: string
}

export const Home = () => {
  const [studentName, setStudentName] = useState('') // Armazenar valor do input
  const [students, setStudents] = useState<CardProps[]>([]) // Armazenar lista de estudantes em um array
  const [user, setUser] = useState<User>({} as User) // Armazenar dois objetos

  function handleAddStudent() { // Criar objetos
    const newStudent = {
      name: studentName, // Variável que está armazenado pelo input
      time: new Date().toLocaleDateString("pt-br" , { // Horário atual
        // configurações
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent]) // Armazenando objeto na função
  }

  /* useEffect(() => {
    console.log('I Change...')
  },[students]) // Caso vetor esteja vazio, será chamado ao renderizar, caso tenha mais de um argumento serão chamados ao inicializa-los individualmente */

/*  useEffect(() => {
    fetch('https://api.github.com/users/RAUE08') // API para requisição HTTP
    .then(response => response.json()) // Promise para converter em formato json
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }) */

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/RAUE08')
      const data = await response.json() as ProfileResponse
      console.log(" Dados ===> ", data)

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [])

  return(
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

    <input
      type="text" 
      placeholder="Digite o nome" 
      onChange={e => setStudentName(e.target.value)}
    />
    <button type="button" onClick={handleAddStudent}>
      Adicionar
    </button>

    {
      students.map(student => ( // percorrer cada item que exite dentro da lista
      <Card 
        key={student.time}
        name={student.name} 
        time={student.time} 
      /> 
      ) 
    )}
    </div>
  )
}