using backend.Models;

namespace backend.Features.Auth;

public sealed record RegisterRequest(string Email, string Password, string CompanyName);

public sealed record LoginRequest(string Email, string Password);

public sealed record AuthResponse(string AccessToken, UserResponse User);

public sealed record UserResponse(Guid Id, string Email, UserRole Role, Guid CompanyId, string CompanyName);
