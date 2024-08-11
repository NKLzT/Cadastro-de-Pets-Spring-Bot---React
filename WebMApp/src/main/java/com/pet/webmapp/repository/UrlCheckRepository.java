package com.pet.webmapp.repository;

import com.pet.webmapp.model.UrlChecker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UrlCheckRepository extends JpaRepository<UrlChecker, Long> {
    List<UrlChecker> findByUserEmail(String email);
    List<UrlChecker> findByIsUp(boolean isUp);
    List<UrlChecker> findByUserEmailAndIsUp(String email, boolean isUp);
}
