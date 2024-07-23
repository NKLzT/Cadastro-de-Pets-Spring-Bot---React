'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CreateAnimal from './CreateAnimal';
import EditAnimal from "./EditAnimal";
import './styles/Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch('http://localhost:8080/animals');
      const data = await response.json();
      setAnimals(data);
    };

    fetchAnimals();
  }, [refreshKey]);

  useEffect(() => {
    const fetchAnimals = async () => {
      let url = 'http://localhost:8080/animals';
      if (searchQuery) {
        url += `/search/${searchQuery}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setAnimals(data);
    };
    fetchAnimals();
  }, [searchQuery, refreshKey]);

  const refreshAnimals = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const confirmDelete = (animal) => {
    if (typeof window !== 'undefined') {
      return window.confirm(`Você deseja realmente excluir o animal ${animal.nome}?`);
    }
    return true;
  };

  const deleteAnimal = async (id, animal) => {
    if (!confirmDelete(animal)) {
      return;
    }

    const response = await fetch(`http://localhost:8080/animals/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir animal');
    }

    refreshAnimals();
  };

  return (
      <Router>
        <main className="main">
          <Header refreshAnimals={refreshAnimals}/>
          <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar animal"
          />
          <Routes>
            <Route path="/create-animal" element={<CreateAnimal/>}/>
            <Route path="/edit-animal/:id" element={<EditAnimal/>}/>
            <Route path="/animals" element={
              <table className="table-auto">
                <thead>
                <tr>
                  <th className="px-4 py-2">Imagem</th>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Categoria</th>
                  <th className="px-4 py-2">Data de nascimento</th>
                  <th className="px-4 py-2">Idade</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {animals.map((animal) => (
                    <tr key={animal.id}>
                      <td className="border px-4 py-2">
                        <img src={animal.urlImagem} alt={animal.nome} style={{width: '100px', height: '100px'}}/>
                      </td>
                      <td className="border px-4 py-2">{animal.nome}</td>
                      <td className="border px-4 py-2">{animal.descricao}</td>
                      <td className="border px-4 py-2">{animal.categoria}</td>
                      <td className="border px-4 py-2">{animal.dataNascimento}</td>
                      <td className="border px-4 py-2">{animal.idade} Anos</td>
                      <td className="border px-4 py-2">{animal.status}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/edit-animal/${animal.id}`}>Editar</Link>
                      </td>
                      <td className="border px-4 py-2">
                        <button onClick={() => deleteAnimal(animal.id, animal)}>
                          <FontAwesomeIcon icon={faTrash} className="text-red-500 mr-2"/>
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            }/>
          </Routes>
        </main>
      </Router>
  );
}
