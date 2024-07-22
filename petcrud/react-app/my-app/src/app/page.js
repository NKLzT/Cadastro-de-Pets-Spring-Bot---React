'use client'

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

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch('http://localhost:8080/animals');
      const data = await response.json();
      setAnimals(data);
    };

    fetchAnimals();
  }, [refreshKey]);

  const refreshAnimals = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const deleteAnimal = async (id) => {
    const response = await fetch(`http://localhost:8080/animals/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir animal');
    }

    // Atualize a lista de animais após a exclusão
    refreshAnimals();
  };

  return (
      <Router>
        <main className="main">
          <Header refreshAnimals={refreshAnimals} />
          <Routes>
            <Route path="/create-animal" element={<CreateAnimal />} />
            <Route path="/edit-animal/:id" element={<EditAnimal />} />
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
                        <button onClick={() => {
                          if (window.confirm(`Você deseja realmente excluir o animal ${animal.nome}?`)) {
                            deleteAnimal(animal.id);
                          }
                        }}>
                          <FontAwesomeIcon icon={faTrash} className="text-red-500 mr-2" />
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