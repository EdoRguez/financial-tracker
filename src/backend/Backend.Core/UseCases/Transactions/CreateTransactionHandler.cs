using Backend.Core.Entities;
using Backend.Core.Repositories;
using FluentValidation;
using FluentValidation.Results;

namespace Backend.Core.UseCases.Transactions;

public class CreateTransactionHandler
{
    private readonly ITransactionRepository _repo;
    private readonly IUnitOfWork _unitOfWork;
    private IValidator<Transaction> _validator;

    public CreateTransactionHandler(ITransactionRepository repo, IUnitOfWork unitOfWork, IValidator<Transaction> validator)
    {
        _repo = repo;
        _unitOfWork = unitOfWork;
        _validator = validator;
    }

    public async Task<ValidationResult> Handle(Transaction model)
    {
        var result = await _validator.ValidateAsync(model);

        if(!result.IsValid)
        {
            return result;
        }

        await _repo.Create(model);
        await _unitOfWork.SaveChangesAsync();

        return result;
    }
}