package com.ecommerce.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/login")
    public String login(@RequestBody String user) {
        return "Login success for: " + user;
    }
}