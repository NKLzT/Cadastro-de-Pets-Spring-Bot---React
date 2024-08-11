package com.pet.webmapp.controller;


import com.pet.webmapp.model.UrlChecker;
import com.pet.webmapp.repository.UrlCheckRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/url-check")
public class UrlCheckController {
    private UrlCheckRepository urlCheckRepository;

    public UrlCheckController(UrlCheckRepository urlCheckRepository) {
        this.urlCheckRepository = urlCheckRepository;
    }

    @PostMapping
    public UrlChecker addUrl(@RequestBody UrlChecker urlChecker) {
        return urlCheckRepository.save(urlChecker);
    }

}
