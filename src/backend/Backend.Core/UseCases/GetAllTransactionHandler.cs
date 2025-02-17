using Backend.Core.Repositories;

namespace Backend.Core.UseCases;

public class GetAllTransactionHandler
{
    private readonly ITransactionRepository _repo;

    public GetAllTransactionHandler(ITransactionRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Transaction>> Handle()
    {
        var res = await _repo.GetAll();
        return res;
    }
}