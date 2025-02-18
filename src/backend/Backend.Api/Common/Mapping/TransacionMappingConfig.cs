using Backend.Contracts;
using Backend.Core.Entities;
using Mapster;

namespace Backend.Api.Common.Mapping;

public class TransactionMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Transaction, TransactionResponse>();
        config.NewConfig<CreateTransactionRequest, Transaction>()
              .ConstructUsing(req => new Transaction(0, req.Amount, req.Date, req.Description, req.transactionTypeId));
    }
}