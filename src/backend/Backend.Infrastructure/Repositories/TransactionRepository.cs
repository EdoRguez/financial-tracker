using Backend.Core.Entities;
using Backend.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;
    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task Create(Transaction model)
    {
        await _context.Transactions.AddAsync(model);
        await Task.CompletedTask;
    }

    public async Task<IEnumerable<Transaction>> GetAll(bool trackChanges = false)
    {
        if (trackChanges)
            return await _context.Transactions.ToListAsync();

        return await _context.Transactions.AsNoTracking().ToListAsync();
    }
}