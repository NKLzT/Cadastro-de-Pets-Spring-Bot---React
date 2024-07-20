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
    private AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
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
}