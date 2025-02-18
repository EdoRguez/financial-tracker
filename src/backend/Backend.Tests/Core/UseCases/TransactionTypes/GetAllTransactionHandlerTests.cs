using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Core.UseCases.TransactionTypes;
using Moq;
using Xunit;

namespace Backend.Tests.Core.UseCases.TransactionTypes;

public class GetAllTransactionTypeHandlerTests
{
    private readonly Mock<ITransactionTypeRepository> repositoryStub = new();

    [Fact]
    public async Task Handle_ShouldReturnAllTransactionTypes()
    {
        // Arrange
        var expectedTransactionTypes = new List<TransactionType>
        {
            new TransactionType(1, "Test"),
            new TransactionType(2, "Test"),
        };

        repositoryStub.Setup(repo => repo.GetAll(false)).ReturnsAsync(expectedTransactionTypes);

        var handler = new GetAllTransactionTypeHandler(repositoryStub.Object);

        // Act
        var actualTransactions = await handler.Handle();

        // Assert
        Assert.Equal(expectedTransactionTypes, actualTransactions);
    }
}