namespace backend.Models;

public sealed class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    public UserRole Role { get; set; } = UserRole.User;

    public Guid CompanyId { get; set; }

    public Company? Company { get; set; }
}
