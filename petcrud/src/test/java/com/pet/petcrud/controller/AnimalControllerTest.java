package com.pet.petcrud.controller;

import com.pet.petcrud.entity.Animal;
import com.pet.petcrud.service.AnimalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class AnimalControllerTest {

    @Mock
    private AnimalService animalService;

    @InjectMocks
    private AnimalController animalController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllAnimals() {
        List<Animal> animals = Arrays.asList(new Animal(), new Animal());

        when(animalService.getAllAnimals()).thenReturn(animals);

        ResponseEntity<?> response = animalController.getAllAnimals();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(animalService, times(1)).getAllAnimals();
        verify(animalService, times(2)).calcularIdade(any(Animal.class));
    }

    @Test
    void getAnimalById() {
        Animal animal = new Animal();
        Optional<Animal> optionalAnimal = Optional.of(animal);

        when(animalService.getAnimalById(anyLong())).thenReturn(optionalAnimal);

        ResponseEntity<?> response = animalController.getAnimalById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(animalService, times(1)).getAnimalById(anyLong());
        verify(animalService, times(1)).calcularIdade(any(Animal.class));
    }

    @Test
    void updateAnimal() {
        Animal animal = new Animal();

        when(animalService.updateAnimal(anyLong(), any(Animal.class))).thenReturn(animal);

        ResponseEntity<?> response = animalController.updateAnimal(1L, animal);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(animalService, times(1)).updateAnimal(anyLong(), any(Animal.class));
    }

    @Test
    void searchAnimals() {
        List<Animal> animals = Arrays.asList(new Animal(), new Animal());

        when(animalService.searchAnimals(anyString())).thenReturn(animals);

        ResponseEntity<?> response = animalController.searchAnimals("query");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(animalService, times(1)).searchAnimals(anyString());
        verify(animalService, times(2)).calcularIdade(any(Animal.class));
    }

    @Test
    void deleteAnimal() {
        doNothing().when(animalService).deleteAnimal(anyLong());

        ResponseEntity<?> response = animalController.deleteAnimal(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(animalService, times(1)).deleteAnimal(anyLong());
    }
}
