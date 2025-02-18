namespace Backend.Contracts;

public record TransactionResponse(
    int Id,
    string Description,
    decimal Amount,
    DateTime Date,
    int transactionTypeId
);