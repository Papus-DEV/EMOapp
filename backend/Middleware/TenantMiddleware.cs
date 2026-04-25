using backend.Services.Tenancy;

namespace backend.Middleware;

public sealed class TenantMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext httpContext, TenantContext tenantContext)
    {
        var companyIdClaim = httpContext.User.FindFirst("company_id")?.Value;

        if (Guid.TryParse(companyIdClaim, out var companyId))
        {
            tenantContext.SetCompanyId(companyId);
        }

        await next(httpContext);
    }
}
