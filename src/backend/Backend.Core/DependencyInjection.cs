using Backend.Core.Entities;
using Backend.Core.UseCases.Transactions;
using Backend.Core.UseCases.TransactionTypes;
using Backend.Core.Validations;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        // Transactions
        services.AddScoped<GetAllTransactionHandler>();
        services.AddScoped<CreateTransactionHandler>();

        // Transaction Types
        services.AddScoped<GetAllTransactionTypeHandler>();

        services.AddScoped<IValidator<Transaction>, CreateTransactionValidator>();

        return services;
    }
}