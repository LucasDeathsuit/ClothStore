package fileManagement;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.Context;

public class UploadService {
	
	public String saveFile(InputStream file, int clothID, String imageName, HttpServletRequest servletRequest) {
		
		int randomPath = (int) Math.floor(Math.random() * (99999 - 10000 + 1) - 10000);

		// TODO Create Service method that returns filePath
		String path = servletRequest.getServletContext().getRealPath("") + "cloth-images/" + clothID + System.getProperty("file.separator");


		String relativePath = System.getProperty("file.separator") + clothID + System.getProperty("file.separator") + imageName + randomPath + ".jpg";
		
		System.out.println(path);
		
		try {
		    File directory = new File(path);
		    if(!directory.exists()) {
		        directory.mkdirs();
		    }
			OutputStream os = new FileOutputStream(new File(path + imageName + randomPath + ".jpg"));
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
	
	public void deleteFiles(int id, HttpServletRequest servletRequest) {
	    
	    String path = servletRequest.getServletContext().getRealPath("") + "cloth-images/" + id;
	    
	    try {
            File directory = new File(path);
            if(directory.exists()) {
                File[] contents = directory.listFiles();
                for(File f : contents) {
                    f.delete();
                }
                directory.delete();
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
	    
	}

}
