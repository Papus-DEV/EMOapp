using backend.Models;

namespace backend.Services.Auth;

public interface IJwtTokenService
{
    string CreateToken(User user);
}
