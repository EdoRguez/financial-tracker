using Backend.Core.Caching;
using Backend.Core.Common.Contants;
using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.Core.UseCases.Transactions;

public class GetAllTransactionHandler
{
    private readonly ITransactionRepository _repo;
    private readonly ICacheService _cacheService;

    public GetAllTransactionHandler(ITransactionRepository repo, ICacheService cacheService)
    {
        _repo = repo;
        _cacheService = cacheService;
    }

    public async Task<IEnumerable<Transaction>> Handle()
    {
        var res = await _repo.GetAll();
        await _cacheService.SetAsync(CacheConstants.Transactions, res, default);
        return res;
    }
}