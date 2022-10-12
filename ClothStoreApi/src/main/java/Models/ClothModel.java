package Models;

import java.text.DecimalFormat;

public class ClothModel {

	private int idCloth;
	private String description;
	private String imageURL;
	private String name;
	private float price;
	private String type;
	
	DecimalFormat dec = new DecimalFormat("#0.00");
	
	public ClothModel() {
	}

	public ClothModel(int idCloth, String description, String name, float price, String type) {
		super();
		this.idCloth = idCloth;
		this.description = description;
		this.name = name;
		this.price = price;
		this.type = type;
	}
	
	public ClothModel(int idCloth, String description, String name, String imageURL, float price, String type) {
		super();
		this.idCloth = idCloth;
		this.description = description;
		this.name = name;
		this.imageURL = imageURL;
		this.price = price;
		this.type = type;
	}


	public int getIdCloth() {
		return idCloth;
	}
	public void setIdCloth(int idCloth) {
		this.idCloth = idCloth;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getImageURL() {
		return imageURL;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	@Override
	public String toString() {
		return "ClothModel [idCloth=" + idCloth + ", description=" + description + ", name=  "
				+ name + ", price=" + price + ", type=" + type + "]";
	}
	
	
	
}
