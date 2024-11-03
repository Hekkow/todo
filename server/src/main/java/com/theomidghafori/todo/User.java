package com.theomidghafori.todo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

public class User implements Serializable {
    String username;
    int userID;
    private ArrayList<Item> items = new ArrayList<Item>();
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
    public ArrayList<Item> getItems() {
        return items;
    }
    public void setItems(Item[] items) {
        this.items = new ArrayList<>(Arrays.asList(items));
        for (Item item : this.items) {
            item.setItemID(TodoApplication.Data.getLatestItemID());
        }
    }
    public void addItem(Item item) {
        item.setItemID(TodoApplication.Data.getLatestItemID());
        items.add(item);
    }
    public int indexOfItem(int itemID) {
        for (int i = 0; i < items.size(); i++) {
            if (items.get(i).getItemID() == itemID) {
                return i;
            }
        }
        return -1;
    }
    public void removeItem(int itemID) {
        items.remove(indexOfItem(itemID));
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
        for (var entry : items) {
            str += entry + "\n";
        }
        return str;
    }
}
