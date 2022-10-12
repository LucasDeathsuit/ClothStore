package dbSettings;

import java.sql.Connection;

public interface ConnectionManager {
	public Connection getDatabaseConnection();
}
