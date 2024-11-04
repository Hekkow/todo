package com.theomidghafori.todo;

import java.io.Serializable;

public class Item implements Serializable {
    private int itemID = -1;
    private String itemText;
    private boolean local;
    public Item() {}
    public Item(String itemText) {
        this.itemID = TodoApplication.Data.getLatestItemID();
        this.itemText = itemText;
        this.local = false;
    }

    public int getItemID() {
        return itemID;
    }
    public void setItemID(int itemID) {
        this.itemID = itemID;
        this.local = false;
    }
    public String getItemText() {
        return itemText;
    }
    public void updateItemText(String itemText) {
        this.itemText = itemText;
        this.local = false;
    }
    @Override
    public String toString() {
        return "Item " + itemID + ": " + itemText + " local: " + local;
    }
}
