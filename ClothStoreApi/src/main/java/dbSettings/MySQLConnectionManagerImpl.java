package dbSettings;

import java.sql.Connection;
import java.sql.DriverManager;

public class MySQLConnectionManagerImpl implements ConnectionManager {

	private String url = "jdbc:mysql://127.0.0.1:3306/dbclothstore?useTimezone=true&serverTimezone=UTC";
	private String user = "root";
	private String password = "root";

	public Connection getDatabaseConnection() {

		Connection connection = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(url, user, password);
			return connection;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

}
