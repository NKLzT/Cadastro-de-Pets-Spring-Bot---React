'use client'

import { useState } from 'react';
import './styles/CreateAnimal.css';


function CreateAnimal() {
    const [animal, setAnimal] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        dataNascimento: '',
        status: 'Indisponível' // ajustado para ser uma string
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Disponível' : 'Indisponível') : e.target.value;
        setAnimal({
            ...animal,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animal)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar animal');
            }

            const createdAnimal = await response.json();
            setAnimal({
                nome: '',
                descricao: '',
                categoria: '',
                dataNascimento: '',
                status: 'Indisponível'
            });
        } catch (error) {
            console.error('Erro ao criar animal:', error);
        }
    };

    return (
    <div className="bg-background p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
                <span className="text-gray-700">Nome:</span>
                <input type="text" name="nome" value={animal.nome} onChange={handleChange}
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            <label className="block">
                <span className="text-gray-700">Descrição:</span>
                <input type="text" name="descricao" value={animal.descricao} onChange={handleChange}
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            <label className="block">
                <span className="text-gray-700">Categoria:</span>
                <input type="text" name="categoria" value={animal.categoria} onChange={handleChange}
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            <label className="block">
                <span className="text-gray-700">Data de Nascimento:</span>
                <input type="date" name="dataNascimento" value={animal.dataNascimento} onChange={handleChange}
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            <label className="block">
                <span className="text-gray-700">URL da Imagem:</span>
                <input type="text" name="urlImagem" value={animal.urlImagem} onChange={handleChange}
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            <label className="block">
                <span className="text-gray-700">Status:</span>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-700">Disponível</span>
                    <input type="checkbox" name="status" checked={animal.status === 'Disponível'}
                           onChange={handleChange}
                           className="rounded-md border-gray-300 shadow-sm ml-auto"/>
                </div>
            </label>

            <button type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Criar
                Animal
            </button>
        </form>
    </div>
    );
}

export default CreateAnimal;