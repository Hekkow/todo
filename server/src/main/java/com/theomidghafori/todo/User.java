package com.theomidghafori.todo;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;

public class User implements Serializable {
    String username;
    int userID;
    private ArrayList<Item> items = new ArrayList<Item>();
    long modified = Instant.now().toEpochMilli();
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
    public long getModified() {
        return modified;
    }
    public ArrayList<Item> getItems() {
        return items;
    }
    public void addItems(Item[] items) {
        ArrayList<Item> newItems = new ArrayList<>(Arrays.asList(items));

        for (Item item : newItems) {
            item.setItemID(TodoApplication.Data.getLatestItemID());
            this.items.add(item);
        }
        modified = Instant.now().toEpochMilli();
    }
    public void addItem(Item item) {
        items.add(item);
        modified = Instant.now().toEpochMilli();
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
        modified = Instant.now().toEpochMilli();
    }
    public Item updateItem(int itemID, String itemText) {
        int index = indexOfItem(itemID);
        Item item;
        if (index == -1) {
            item = new Item(itemText);
            addItem(item);
        }
        else {
            item = items.get(index);
            item.updateItemText(itemText);
            modified = Instant.now().toEpochMilli();
        }
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
