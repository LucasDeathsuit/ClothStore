package api.Authentication;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
@Secured
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter{
	
	private static final String REALM = "example";
    private static final String AUTHENTICATION_SCHEME = "Bearer";
    
    private final SecretKey KEY = 
            Keys.hmacShaKeyFor("7f-j&CKk=coNzZc0y7_4obMP?#TfcYq%fcD0mDpenW2nc!lfGoZ|d?f&RNbDHUX6"
                                .getBytes(StandardCharsets.UTF_8));
    
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
    	String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
    	
    	try {
			String token = authorizationHeader.substring(AUTHENTICATION_SCHEME.length()).trim();
			
			Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token);
		} catch (Exception e) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
		}
    }

}
