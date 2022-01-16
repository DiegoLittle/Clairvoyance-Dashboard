API Authentication Methods
- JWT


URL -> API Endpoint ->Data Model -> Database

User sends Login

1. User sends register req with user:pass over HTTPS
2. Password is hashed and user is stored to table
3. User sends login request with credentials 
4. Server verifies login with password hash
5. Server creates access token and refresh token with JWT
5. User receives access token and then saves to some short-term state (cookies or localstorage etc.)
6. User requests protected endpoints with access token