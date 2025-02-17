using Backend.Api.Common.Mapping;
using Backend.Api.Middlewares;

namespace Backend.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddTransient<GlobalExceptionHandlingMiddleware>();

        services.AddMappings();

        return services;
    }
}