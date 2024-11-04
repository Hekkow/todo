package com.theomidghafori.todo;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RouteController {
    @PostMapping("/user/add/{username}")
    public User registerUser(@PathVariable String username, @RequestBody Item[] items) {
        if (username.isEmpty()) return null;
        int userID = TodoApplication.Data.getUserID(username);
        if (userID != -1) {
            User user = TodoApplication.Data.getUser(userID);
            user.addItems(items);
            return user;
        }
        User newUser = new User(username);
        newUser.addItems(items);
        TodoApplication.Data.addUser(newUser);
        System.out.println(newUser);
        return newUser;
    }
    @PostMapping("/user/{userID}/items/add")
    public Item addItem(@PathVariable int userID, @RequestBody String itemText) {
        if (userID == -1 || itemText.isEmpty()) return null;
        Item newItem = new Item(itemText);
        TodoApplication.Data.addItem(userID, newItem);
        System.out.println(TodoApplication.Data.getUser(userID));
        return newItem;
    }
    @DeleteMapping("user/{userID}/items/remove/{itemID}")
    public Object removeItem(@PathVariable int userID, @PathVariable int itemID) {
        TodoApplication.Data.removeItem(userID, itemID);
        System.out.println(TodoApplication.Data.getUser(userID));
        return null;
    }
    @PutMapping("user/{userID}/items/update/{itemID}")
    public Item updateItem(@PathVariable int userID, @PathVariable int itemID, @RequestBody String itemText) {
        System.out.println(TodoApplication.Data.getUser(userID));
        return TodoApplication.Data.updateItem(userID, itemID, itemText);
    }
    @GetMapping("/user/{userID}")
    public User getUser(@PathVariable int userID) {
        User user = TodoApplication.Data.getUser(userID);
        System.out.println(user);
        return user;
    }
    @GetMapping("/latestItemID")
    public int getLatestItemID() {
        return TodoApplication.Data.getLatestItemIDStationary();
    }
    @GetMapping("/ping")
    public boolean ping() {
        return true;
    }
}
