package Models;

public class ClothImageModel {
	
	private int idClothImage;
	private int idCloth;
	private String imageURL;
	
	public ClothImageModel() {
	}

	public ClothImageModel(int idClothImage, int idCloth, String imageURL) {
		super();
		this.idClothImage = idClothImage;
		this.idCloth = idCloth;
		this.imageURL = imageURL;
	}

	public int getIdClothImage() {
		return idClothImage;
	}

	public void setIdClothImage(int idClothImage) {
		this.idClothImage = idClothImage;
	}

	public int getIdCloth() {
		return idCloth;
	}

	public void setIdCloth(int idCloth) {
		this.idCloth = idCloth;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
}
