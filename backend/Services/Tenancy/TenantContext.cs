namespace backend.Services.Tenancy;

public sealed class TenantContext : ITenantContext
{
    public Guid? CompanyId { get; private set; }

    public bool HasTenant => CompanyId.HasValue;

    public void SetCompanyId(Guid companyId)
    {
        CompanyId = companyId;
    }
}
