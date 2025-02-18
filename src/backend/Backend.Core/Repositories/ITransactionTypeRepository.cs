using Backend.Core.Entities;

namespace Backend.Core.Repositories;

public interface ITransactionTypeRepository
{
    Task<TransactionType?> Get(int id, bool trackChanges = false);
    Task<IEnumerable<TransactionType>> GetAll(bool trackChanges = false);
}