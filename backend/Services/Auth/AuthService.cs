using backend.Features.Auth;
using backend.Models;
using backend.Repositories;

namespace backend.Services.Auth;

public sealed class AuthService(
    IUserRepository users,
    ICompanyRepository companies,
    IUnitOfWork unitOfWork,
    IPasswordHasher passwordHasher,
    IJwtTokenService jwtTokenService) : IAuthService
{
    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
    {
        var email = NormalizeEmail(request.Email);
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new AuthException("Email is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 8)
        {
            throw new AuthException("Password must be at least 8 characters.");
        }

        if (string.IsNullOrWhiteSpace(request.CompanyName))
        {
            throw new AuthException("Company name is required.");
        }

        if (await users.EmailExistsAsync(email, cancellationToken))
        {
            throw new AuthException("Email is already registered.");
        }

        var company = new Company
        {
            Name = request.CompanyName.Trim()
        };

        var user = new User
        {
            Email = email,
            PasswordHash = passwordHasher.Hash(request.Password),
            Role = UserRole.User,
            Company = company,
            CompanyId = company.Id
        };

        await companies.AddAsync(company, cancellationToken);
        await users.AddAsync(user, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(user);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var email = NormalizeEmail(request.Email);
        var user = await users.GetByEmailAsync(email, cancellationToken);

        if (user is null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new AuthException("Invalid email or password.");
        }

        return CreateAuthResponse(user);
    }

    public async Task<UserResponse?> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await users.GetByIdAsync(userId, cancellationToken);

        return user is null ? null : ToUserResponse(user);
    }

    private AuthResponse CreateAuthResponse(User user) =>
        new(jwtTokenService.CreateToken(user), ToUserResponse(user));

    private static UserResponse ToUserResponse(User user) =>
        new(user.Id, user.Email, user.Role, user.CompanyId, user.Company?.Name ?? string.Empty);

    private static string NormalizeEmail(string email) =>
        email.Trim().ToLowerInvariant();
}
