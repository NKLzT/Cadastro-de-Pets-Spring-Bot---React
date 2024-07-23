package com.pet.petcrud.controller;

import com.pet.petcrud.entity.Animal;
import com.pet.petcrud.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping
    public ResponseEntity<?> createAnimal(@RequestBody @Valid Animal animal) {
        try {
            Animal createdAnimal = animalService.createAnimal(animal);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(createdAnimal.getId()).toUri();
            return ResponseEntity.created(location).body(createdAnimal);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating animal: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllAnimals() {
        try {
            List<Animal> animals = animalService.getAllAnimals();
            animals.forEach(animalService::calcularIdade);
            return new ResponseEntity<>(animals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error getting animals: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAnimalById(@PathVariable Long id) {
        try {
            Optional<Animal> animal = animalService.getAnimalById(id);
            animal.ifPresent(animalService::calcularIdade);
            return animal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return new ResponseEntity<>("Error getting animal by id: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAnimal(@PathVariable Long id, @RequestBody @Valid Animal updatedAnimal) {
        try {
            Animal animal = animalService.updateAnimal(id, updatedAnimal);
            return new ResponseEntity<>(animal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating animal: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<?> searchAnimals(@PathVariable String query) {
        try {
            List<Animal> animals = animalService.searchAnimals(query);
            animals.forEach(animalService::calcularIdade);
            return new ResponseEntity<>(animals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error searching animals: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnimal(@PathVariable Long id) {
        try {
            animalService.deleteAnimal(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting animal: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
