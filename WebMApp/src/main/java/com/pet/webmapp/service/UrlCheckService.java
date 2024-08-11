package com.pet.webmapp.service;


import com.pet.webmapp.model.UrlChecker;
import com.pet.webmapp.repository.UrlCheckRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class UrlCheckService {
    private UrlCheckRepository urlCheckRepository;
    private EmailService emailService;

    private RestTemplate restTemplate = new RestTemplate();

    public UrlCheckService(UrlCheckRepository urlCheckRepository, EmailService emailService) {
        this.urlCheckRepository = urlCheckRepository;
        this.emailService = emailService;
    }

    @Scheduled(fixedRate = 5000)
    public void checkUrls() {
        List<UrlChecker> urls = urlCheckRepository.findAll();
        for (UrlChecker url : urls) {
            try {
                var response = restTemplate.getForEntity(url.getUrl(), String.class);
                if (response.getStatusCodeValue() != 200) {
                    notifyUser(url);
                }
            } catch (Exception e) {

            }

        }
    }

    private void notifyUser(UrlChecker url) {
        emailService.mainNotify(url.getUserEmail(), url.getUrl());
        url.setUp(false);
        urlCheckRepository.save(url);
    }
}
