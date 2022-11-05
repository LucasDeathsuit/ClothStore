package Models;

public class UserModel {

    private int idUser;
    private String username;
    private String password;
    private String userAccess;
    private boolean loggedIn;
    private String token;
    private String displayName;
    private String email;
    private String avatarURL;

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
    
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    @Override
    public String toString() {
        return "UserModel [idUser=" + idUser + ", username=" + username + ", password=" + password + ", userAccess="
                + userAccess + ", loggedIn=" + loggedIn + ", token=" + token + "]";
    }

}
