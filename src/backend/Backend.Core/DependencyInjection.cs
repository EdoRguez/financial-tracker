using Backend.Core.UseCases;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        services.AddScoped<GetAllTransactionHandler>();
        services.AddScoped<CreateTransactionHandler>();

        return services;
    }
}