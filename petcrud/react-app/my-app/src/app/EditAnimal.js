'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function EditAnimal() {
    const [animal, setAnimal] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchAnimal = async () => {
            const response = await fetch(`http://localhost:8080/animals/${id}`);
            const data = await response.json();
            setAnimal(data);
        };

        fetchAnimal();
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.name === 'status' ? (e.target.checked ? 'Disponível' : 'Indisponível') : e.target.value;
        setAnimal({
            ...animal,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/animals/${animal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animal)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar animal');
            }

            const updatedAnimal = await response.json();
            setAnimal(updatedAnimal);

            // Exibe um popup de notificação
            alert('Animal atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar animal:', error);
        }
    };

    if (!animal) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-background p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="nome" value={animal.nome} onChange={handleChange} placeholder="Nome" className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                <input type="text" name="descricao" value={animal.descricao} onChange={handleChange} placeholder="Descrição" className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                <input type="text" name="categoria" value={animal.categoria} onChange={handleChange} placeholder="Categoria" className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                <input type="date" name="dataNascimento" value={animal.dataNascimento} onChange={handleChange} placeholder="Data de Nascimento" className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
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
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Atualizar
                    Animal
                </button>
            </form>
        </div>
    );
}

export default EditAnimal;