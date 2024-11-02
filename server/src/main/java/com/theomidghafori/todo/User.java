package com.theomidghafori.todo;

import java.io.Serializable;
import java.util.Map;
import java.util.TreeMap;

public class User implements Serializable {
    String username;
    int userID;
    private Map<Integer, Item> items = new TreeMap<Integer, Item>();
    public User(String username) {
        userID = TodoApplication.Data.getLatestUserID();
        this.username = username;
    }
    public String getUsername() {
        return username;
    }
    public int getUserID() {
        return userID;
    }
    public Map<Integer, Item> getItems() {
        return items;
    }
    public void addItem(Item item) {
        items.put(item.getItemID(), item);
    }
    public void removeItem(int itemID) {
        items.remove(itemID);
    }
    public Item updateItem(int itemID, String itemText) {
        Item item = items.get(itemID);
        item.updateItemText(itemText);
        return item;
    }
    @Override
    public String toString() {
        String str = "User{" +
                "username='" + username + '\'' +
                ", userID=" + userID + "}\n";
        for (var entry : items.values()) {
            str += entry + "\n";
        }
        return str;
    }
}
