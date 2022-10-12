package Services;

import Models.UserModel;

public class UserService {

	public boolean checkPassword(UserModel loginAttempt, UserModel user) {
		
		if (loginAttempt.getPassword().equals(user.getPassword())) {
			return true;
		}
		
		return false;
		
	}
	
}
