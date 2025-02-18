using Backend.Core.Entities;
using Backend.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class TransactionTypeRepository : ITransactionTypeRepository
{
    private readonly AppDbContext _context;
    public TransactionTypeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TransactionType?> Get(int id, bool trackChanges = false)
    {
        if (trackChanges)
            return await _context.TransactionTypes.SingleOrDefaultAsync(x => x.Id == id);

        return await _context.TransactionTypes.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<TransactionType>> GetAll(bool trackChanges = false)
    {
        if (trackChanges)
            return await _context.TransactionTypes.ToListAsync();

        return await _context.TransactionTypes.AsNoTracking().ToListAsync();
    }
}