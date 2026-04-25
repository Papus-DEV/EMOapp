namespace backend.Services.Auth;

public sealed class AuthException(string message) : Exception(message);
