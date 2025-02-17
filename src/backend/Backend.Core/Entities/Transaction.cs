namespace Backend.Core.Entities;

public class Transaction
{
    public Transaction(int id, decimal amount, DateTime date, string type, string description)
    {
        Id = id;
        Amount = amount;
        Date = date;
        Type = type;
        Description = description;
    }

    public int Id { get; private set; }
    public decimal Amount { get; private set; }
    public DateTime Date { get; private set; }
    public string Type { get; private set; }
    public string Description { get; private set; }
}