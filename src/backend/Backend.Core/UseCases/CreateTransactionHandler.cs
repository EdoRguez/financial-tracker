using Backend.Contracts;
using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.Core.UseCases;

public class CreateTransactionHandler
{
    private readonly ITransactionRepository _repo;
    private readonly IUnitOfWork _unitOfWork;

    public CreateTransactionHandler(ITransactionRepository repo, IUnitOfWork unitOfWork)
    {
        _repo = repo;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(Transaction model)
    {
        await _repo.Create(model);
        await _unitOfWork.SaveChangesAsync();
    }
}