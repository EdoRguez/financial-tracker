using Backend.Core.Caching;
using Backend.Core.Common.Contants;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using FluentValidation;
using FluentValidation.Results;

namespace Backend.Core.UseCases.Transactions;

public class CreateTransactionHandler
{
    private readonly ITransactionRepository _repo;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private IValidator<Transaction> _validator;

    public CreateTransactionHandler(ITransactionRepository repo, IUnitOfWork unitOfWork, ICacheService cacheService, IValidator<Transaction> validator)
    {
        _repo = repo;
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
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
        await _cacheService.RemoveAsync(CacheConstants.Transactions);

        return result;
    }
}