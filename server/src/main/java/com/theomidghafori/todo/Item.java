package com.theomidghafori.todo;

import java.io.Serializable;

public class Item implements Serializable {
    private int itemID = -1;
    private String itemText;
    public Item() {}
    public Item(String itemName) {
        this.itemID = TodoApplication.Data.getLatestItemID();
        this.itemText = itemName;
    }

    public int getItemID() {
        return itemID;
    }
    public void setItemID(int itemID) {
        this.itemID = itemID;
    }
    public String getItemText() {
        return itemText;
    }
    public void updateItemText(String itemText) {
        this.itemText = itemText;
    }
    @Override
    public String toString() {
        return "Item " + itemID + ": " + itemText;
    }
}
