using backend.Data;
using backend.Models;

namespace backend.Repositories;

public sealed class CompanyRepository(AppDbContext db) : ICompanyRepository
{
    public Task AddAsync(Company company, CancellationToken cancellationToken) =>
        db.Companies.AddAsync(company, cancellationToken).AsTask();
}
