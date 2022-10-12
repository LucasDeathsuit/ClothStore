package Models;

public class UserModel {

	private int idUser;
	private String username;
	private String password;
	private String userAccess;
	private boolean loggedIn;
	private String token;

	public UserModel() {
	}

	public UserModel(int idUser, String username, String password, String userAccess) {
		super();
		this.idUser = idUser;
		this.username = username;
		this.password = password;
		this.userAccess = userAccess;
	}

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserAccess() {
		return userAccess;
	}

	public void setUserAccess(String userAccess) {
		this.userAccess = userAccess;
	}

	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}

	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "UserModel [idUser=" + idUser + ", username=" + username + ", password=" + password + ", userAccess="
				+ userAccess + ", loggedIn=" + loggedIn + ", token=" + token + "]";
	}

	

}
