using Backend.Contracts;
using Backend.Core.UseCases.TransactionTypes;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Endpoints;

public static class TransactionTypeEndpoints
{
    public static RouteGroupBuilder MapTransactionTypeEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/transactionTypes");

        group.MapGet("/", async ([FromServices] GetAllTransactionTypeHandler handler, [FromServices] IMapper mapper) =>
        {
            var res = await handler.Handle();

            var transactionTypesResponse = mapper.Map<IEnumerable<TransactionTypeResponse>>(res);

            return Results.Ok(transactionTypesResponse);
        });

        return group;
    }
}