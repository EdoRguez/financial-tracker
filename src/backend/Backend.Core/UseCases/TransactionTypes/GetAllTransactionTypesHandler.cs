using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.Core.UseCases.TransactionTypes;

public class GetAllTransactionTypeHandler
{
    private readonly ITransactionTypeRepository _repo;

    public GetAllTransactionTypeHandler(ITransactionTypeRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<TransactionType>> Handle()
    {
        var res = await _repo.GetAll();
        return res;
    }
}