package Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import Models.ClothModel;
import dbSettings.ConnectionManager;

public class ClothRepository {

	Connection connection;

	ClothModel cloth = new ClothModel();

	public ClothRepository(ConnectionManager connection) {
		this.connection = connection.getDatabaseConnection();
	}


	//Find All
	public List<ClothModel> findAll() {
		List<ClothModel> clothes = new ArrayList<ClothModel>();
		String stmt = "select * from tb_cloth left join tb_cloth_image on tb_cloth.id_cloth = tb_cloth_image.id_cloth";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int idCloth = rs.getInt("id_cloth");
				String description = rs.getString("description");
				String name = rs.getString("name");
				float price = rs.getFloat("price");
				String imageURL = rs.getString("image_url");
				String type = rs.getString("type");

				clothes.add(new ClothModel(idCloth, description, name, imageURL, price, type));
			}
			connection.close();
			return clothes;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	//Find By ID
	public ClothModel findClothById(int id) {
		String stmt = "select * from tb_cloth where id_cloth = ?";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				cloth.setIdCloth(rs.getInt("id_cloth"));
				cloth.setDescription(rs.getString("description"));
				cloth.setName(rs.getString("name"));
				cloth.setPrice(rs.getFloat("price"));
				cloth.setType(rs.getString("type"));
			}
			connection.close();
			return cloth;

		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public List<ClothModel> findAllClothesWithOneImage() {
		List<ClothModel> clothes = new ArrayList<ClothModel>();
		String stmt = "SELECT * FROM tb_cloth LEFT JOIN \r\n"
				+ "(SELECT DISTINCT (id_cloth), image_url FROM tb_cloth_image) AS images ON\r\n"
				+ "tb_cloth.id_cloth = images.id_cloth \r\n";
		
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int idCloth = rs.getInt("id_cloth");
				String description = rs.getString("description");
				String name = rs.getString("name");
				float price = rs.getFloat("price");
				String imageURL = rs.getString("image_url");
				String type = rs.getString("type");
	
				clothes.add(new ClothModel(idCloth, description, name, imageURL, price, type));
			} 
			
			connection.close();
			return clothes;
			
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	//Find by Type
	public List<ClothModel> findClothByType(String type) {
		List<ClothModel> clothes = new ArrayList<ClothModel>();
		String stmt = "select * from tb_cloth c inner join tb_cloth_image ci on c.id_cloth = ci.id_cloth where type = ?";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ps.setString(1, type);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				int id = rs.getInt("id_cloth");
				String description = rs.getString("description");
				String name = rs.getString("name");
				String imageURL = rs.getString("image_url");
				float price = rs.getFloat("price");

				clothes.add(new ClothModel(id, description, name, imageURL, price, type));
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return clothes;
	}
	//Create Cloth
	public boolean createCloth(ClothModel cloth) {
		String stmt = "insert into tb_cloth (id_cloth, description, name, price, type) values (null, ?, ?, ?, ?)";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, cloth.getDescription());
			ps.setString(2, cloth.getName());
			ps.setDouble(3, cloth.getPrice());
			ps.setString(4, cloth.getType());
			ps.executeUpdate();
			ResultSet generatedKeys = ps.getGeneratedKeys();
			if (generatedKeys.next()) {
				cloth.setIdCloth(generatedKeys.getInt(1));
			}
			connection.close();
			return true;

		} catch (Exception e) {
			System.out.println(e);
			return false;
		}
	}
	//Delete Cloth
	public boolean deleteCloth(int id) {
		String stmt = "delete from tb_cloth where id_cloth = ?";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ps.setInt(1, id);
			ps.executeUpdate();
			connection.close();
			return true;
		} catch (Exception e) {
			System.out.println(e);
			return false;
		}
	}
	//Update Entire
	public boolean updateCloth(ClothModel cloth, int id) {
		String stmt = "UPDATE tb_cloth set name = ?, description = ?, price = ?, type = ? where id_cloth = ?";
		cloth.setIdCloth(id);
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ps.setString(1, cloth.getName());
			ps.setString(2, cloth.getDescription());
			ps.setDouble(3, cloth.getPrice());
			ps.setString(4, cloth.getType());
			ps.setInt(5, id);
			ps.executeUpdate();
			connection.close();
			return true;
		} catch (Exception e) {
			System.out.println(e);
			return false;
		}
		
	}


	
}
