using Backend.Core.Entities;
using Backend.Core.Repositories;
using FluentValidation;

namespace Backend.Core.Validations;

public class CreateTransactionValidator : AbstractValidator<Transaction>
{
    private readonly ITransactionTypeRepository _transactionTypeRepo;
    public CreateTransactionValidator(ITransactionTypeRepository transactionTypeRepository)
    {
        _transactionTypeRepo = transactionTypeRepository;

        RuleFor(x => x.Description).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Amount).GreaterThan(0);
        RuleFor(x => x.Date).NotNull();
        RuleFor(x => x.TransactionTypeId).NotNull();

        RuleFor(x => x.TransactionTypeId)
            .MustAsync(TransactionTypeIdExists)
            .WithMessage("Transaction type doesn't exist");
    }

    private async Task<bool> TransactionTypeIdExists(int id, CancellationToken token)
    {
        await Task.CompletedTask;
        var transactionType = await _transactionTypeRepo.Get(id);
        return transactionType != null;
    }
}