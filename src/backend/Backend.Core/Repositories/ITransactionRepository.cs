using Backend.Core.Entities;

namespace Backend.Core.Repositories;

public interface ITransactionRepository
{
    Task Create(Transaction model);
    Task<IEnumerable<Transaction>> GetAll(bool trackChanges = false);
}