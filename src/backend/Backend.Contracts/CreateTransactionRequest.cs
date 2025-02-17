namespace Backend.Contracts;

public record CreateTransactionRequest(
    string Description,
    decimal Amount,
    DateTime Date,
    string Type
);