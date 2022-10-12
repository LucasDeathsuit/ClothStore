package Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import Models.ClothImageModel;
import Models.ClothModel;
import dbSettings.ConnectionManager;

public class ClothImageRepository {

	Connection connection;
	
	ClothImageModel clothImage = new ClothImageModel();
	
	public ClothImageRepository (ConnectionManager connection) {
		this.connection = connection.getDatabaseConnection();
	}
	
	public boolean createClothImage(ClothImageModel clothImage, ClothModel cloth) {
		String stmt = "insert into tb_cloth_image (id_cloth_image, image_url, id_cloth) values (null, ?, ?)";
		
		try {
			
			PreparedStatement ps = connection.prepareStatement(stmt, Statement.RETURN_GENERATED_KEYS);
			
			ps.setString(1, clothImage.getImageURL());
			ps.setInt(2, cloth.getIdCloth());
			
			ps.executeUpdate();
			ResultSet generatedKeys = ps.getGeneratedKeys();
			
			if(generatedKeys.next()) {
				clothImage.setIdClothImage(generatedKeys.getInt(1));
			}
			
			connection.close();
			
			return true;
		} catch (Exception e) {
			System.out.println("Error: " + e);
			return false;
		}
	}
 	
}
