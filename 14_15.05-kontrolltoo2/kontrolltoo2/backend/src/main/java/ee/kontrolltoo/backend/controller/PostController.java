package ee.kontrolltoo.backend.controller;

import ee.kontrolltoo.backend.dto.Post;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PostController {

    @Value("${posts.api.url}")
    private String postsApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("posts")
    public List<Post> getPosts() {
        Post[] response = restTemplate.exchange(postsApiUrl, HttpMethod.GET, null, Post[].class).getBody();
        return response == null ? List.of() : Arrays.asList(response);
    }
}
