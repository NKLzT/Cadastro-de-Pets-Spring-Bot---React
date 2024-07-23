package com.pet.petcrud.service;

import com.pet.petcrud.entity.Animal;
import com.pet.petcrud.repository.AnimalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {
    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public void deleteAnimal(Long id) {
        animalRepository.deleteById(id);
    }

    public Animal createAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Optional<Animal> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }

    public void calcularIdade(Animal animal) {
        if (animal.getDataNascimento() != null) {
            int idade = Period.between(animal.getDataNascimento(), LocalDate.now()).getYears();
            animal.setIdade(idade);
        }
    }

    public List<Animal> searchAnimals(String query) {
        return animalRepository.findByNomeContaining(query);
    }

    public Animal updateAnimal(Long id, Animal updatedAnimal) {
        Optional<Animal> optionalAnimal = animalRepository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal existingAnimal = optionalAnimal.get();

            existingAnimal.setNome(updatedAnimal.getNome());
            existingAnimal.setDescricao(updatedAnimal.getDescricao());
            existingAnimal.setUrlImagem(updatedAnimal.getUrlImagem());
            existingAnimal.setCategoria(updatedAnimal.getCategoria());
            existingAnimal.setDataNascimento(updatedAnimal.getDataNascimento());
            existingAnimal.setStatus(updatedAnimal.getStatus());

            return animalRepository.save(existingAnimal);
        } else {
            throw new RuntimeException("Animal não encontrado " + id);
        }
    }
}
