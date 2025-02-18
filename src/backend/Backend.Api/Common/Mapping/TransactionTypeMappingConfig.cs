using Backend.Contracts;
using Backend.Core.Entities;
using Mapster;

namespace Backend.Api.Common.Mapping;

public class TransactionTypeMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<TransactionType, TransactionTypeResponse>();
    }
}