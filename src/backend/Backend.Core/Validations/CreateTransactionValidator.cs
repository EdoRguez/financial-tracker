using Backend.Core.Entities;
using FluentValidation;

namespace Backend.Core.Validations;

public class CreateTransactionValidator : AbstractValidator<Transaction>
{
    public CreateTransactionValidator()
    {
        RuleFor(x => x.Description).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Amount).GreaterThan(0);
        RuleFor(x => x.Date).NotNull();
        RuleFor(x => x.Type).NotEmpty().MaximumLength(50);
    }
}