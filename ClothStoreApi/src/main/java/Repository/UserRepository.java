package Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

import Models.UserModel;
import Services.UserService;
import dbSettings.ConnectionManager;

public class UserRepository {

	Connection connection;

	UserModel user;
	UserService service = new UserService();

	public UserRepository(ConnectionManager connection) {
		this.connection = connection.getDatabaseConnection();
	}

	public UserModel doLogin(UserModel loginAttempt) {
		String stmt = "select id_user, username, password, user_access from tb_users where username = ?";

		UserModel user = new UserModel();

		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ps.setString(1, loginAttempt.getUsername());
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				user.setIdUser(rs.getInt("id_user"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setUserAccess(rs.getString("user_access"));
			}

			if (!service.checkPassword(loginAttempt, user)) {
				user.setUserAccess(null);
				user.setLoggedIn(false);
			} else {
				user.setLoggedIn(true);
			}

			connection.close();

			return user;

		} catch (Exception e) {
			System.out.println(e);
			user.setUserAccess(null);
			return user;
		}
	}

	public boolean createUser(UserModel user) throws SQLIntegrityConstraintViolationException, SQLException {
		String stmt = "insert into tb_users(id_user, username, password, user_access) values (null, ?, ?, ?)";

		PreparedStatement ps = connection.prepareStatement(stmt);
		ps.setString(1, user.getUsername());
		ps.setString(2, user.getPassword());
		ps.setString(3, user.getUserAccess());

		ps.executeUpdate();

		connection.close();

		return true;

	}

	public List<UserModel> findAll() {
		List<UserModel> users = new ArrayList<UserModel>();
		String stmt = "select * from tb_users";
		try {
			PreparedStatement ps = connection.prepareStatement(stmt);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				int id = rs.getInt("id_user");
				String username = rs.getString("username");
				String password = rs.getString("password");
				String userAccess = rs.getString("user_access");

				users.add(new UserModel(id, username, password, userAccess));
			}

			return users;

		} catch (Exception e) {
			System.out.println("Error:" + e);
			return null;
		}
	}

}
