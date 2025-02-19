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

        string? redisConnection = Environment.GetEnvironmentVariable("RedisConnection");
        services.AddStackExchangeRedisCache(redisOptions =>
        {
            redisOptions.Configuration = redisConnection;
        });

        services.AddMappings();

        services.ConfigureCors();

        return services;
    }

    public static IServiceCollection ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        return services;
    }
}