using Backend.Contracts;
using Backend.Core.Entities;
using Backend.Core.UseCases;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Endpoints;

public static class TransactionEndpoints
{
    public static RouteGroupBuilder MapTransactionEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/transactions");

        group.MapGet("/", async ([FromServices] GetAllTransactionHandler handler, [FromServices] IMapper mapper) =>
        {
            var res = await handler.Handle();

            var transactionResponse = mapper.Map<IEnumerable<TransactionResponse>>(res);

            return Results.Ok(transactionResponse);
        });

        group.MapPost("/", async ([FromServices] CreateTransactionHandler handler, [FromServices] IMapper mapper, [FromBody] CreateTransactionRequest request) =>
        {
            var transaction = mapper.Map<Transaction>(request);

            await handler.Handle(transaction);

            return Results.NoContent();
        });

        return group;
    }
}