namespace Backend.Core.Entities;

public class Transaction
{
    public Transaction(int id, decimal amount, DateTime date, string description, int transactionTypeId)
    {
        Id = id;
        Amount = amount;
        Date = date;
        Description = description;
        TransactionTypeId = transactionTypeId;
    }

    public int Id { get; private set; }
    public decimal Amount { get; private set; }
    public DateTime Date { get; private set; }
    public string Description { get; private set; }
    public int TransactionTypeId { get; private set; }
    public TransactionType TransactionType { get; private set; } = null!;
}