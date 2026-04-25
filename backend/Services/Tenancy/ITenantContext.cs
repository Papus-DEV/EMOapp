namespace backend.Services.Tenancy;

public interface ITenantContext
{
    Guid? CompanyId { get; }

    bool HasTenant { get; }
}
