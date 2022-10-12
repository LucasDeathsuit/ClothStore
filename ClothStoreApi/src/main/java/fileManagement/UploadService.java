package fileManagement;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.Context;

public class UploadService {
	
	public String saveFile(InputStream file, String imageName, HttpServletRequest servletRequest) {
		
		int randomPath = (int) Math.floor(Math.random() * (99999 - 10000 + 1) - 10000);

		// TODO Create Service method that returns filePath
		String path = servletRequest.getServletContext().getRealPath("") + "cloth-images/" + imageName + randomPath
				+ ".jpg";

		System.out.println(path);

		String relativePath = System.getProperty("file.separator") + imageName + randomPath + ".jpg";
		
		try {
			OutputStream os = new FileOutputStream(new File(path));
			int cursor;
			while ((cursor = file.read()) != -1) {
				os.write(cursor);
			}
			os.flush();
			os.close();
			
			
			return relativePath;
		} catch (Exception e) {
			System.out.println(e);
			return "Error: " + e;
		}
	}

}
