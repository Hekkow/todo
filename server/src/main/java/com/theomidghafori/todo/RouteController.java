package com.theomidghafori.todo;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RouteController {
    @PostMapping("/user/add/{username}")
    public User registerUser(@PathVariable String username, @RequestBody Item[] items) {
        System.out.println("HERE??");
        if (username.isEmpty()) return null;
        int userID = TodoApplication.Data.getUserID(username);
        if (userID != -1) {
            return TodoApplication.Data.getUser(userID);
        }
        User newUser = new User(username);
        newUser.setItems(items);
        TodoApplication.Data.addUser(newUser);
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
        return null;
    }
    @PutMapping("user/{userID}/items/update/{itemID}")
    public Item updateItem(@PathVariable int userID, @PathVariable int itemID, @RequestBody String itemText) {
        return TodoApplication.Data.updateItem(userID, itemID, itemText);
    }
    @GetMapping("/user/{userID}")
    public User getUser(@PathVariable int userID) {
        return TodoApplication.Data.getUser(userID);
    }
    @GetMapping("/latestItemID")
    public int getLatestItemID() {
        return TodoApplication.Data.getLatestItemIDStationary();
    }
}
