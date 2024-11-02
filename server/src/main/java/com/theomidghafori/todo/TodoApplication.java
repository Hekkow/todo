package com.theomidghafori.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class TodoApplication {
	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
		System.out.println("Server started");
	}
	public static class Data {
		private static int latestUserID = -1;
		private static int latestItemID = -1;
		public static int getLatestUserID() {
			latestUserID++;
			return latestUserID;
		}
		public static int getLatestItemID() {
			latestItemID++;
			return latestItemID;
		}
		public static int getLatestItemIDStationary() {
			return latestItemID;
		}
		private static Map<Integer, User> users = new TreeMap<Integer, User>();
		public static void addUser(User user) {
			users.put(user.getUserID(), user);
		}
		public static void addItem(int userID, Item item) {
			users.get(userID).addItem(item);
		}
		public static void removeItem(int userID, int itemID) {
			users.get(userID).removeItem(itemID);
		}
		public static Item updateItem(int userID, int itemID, String itemText) {
			return users.get(userID).updateItem(itemID, itemText);
		}
		public static User getUser(int userID) {
			return users.get(userID);
		}
	}

}
