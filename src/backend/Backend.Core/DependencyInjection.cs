using Backend.Core.Entities;
using Backend.Core.UseCases;
using Backend.Core.Validations;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        services.AddScoped<GetAllTransactionHandler>();
        services.AddScoped<CreateTransactionHandler>();

        services.AddScoped<IValidator<Transaction>, CreateTransactionValidator>();

        return services;
    }
}