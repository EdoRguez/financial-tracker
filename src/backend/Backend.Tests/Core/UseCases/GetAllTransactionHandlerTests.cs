using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Core.UseCases;
using Moq;
using Xunit;

namespace Backend.Tests.Core.UseCases;

public class GetAllTransactionHandlerTests
{
    private readonly Mock<ITransactionRepository> repositoryStub = new();

    [Fact]
        public async Task Handle_ShouldReturnAllTransactions()
        {
            // Arrange
            var expectedTransactions = new List<Transaction>
            {
                new Transaction(1, 100, DateTime.Now, "Received", "Test"),
                new Transaction(2, 200, DateTime.Now, "Send", "Test"),
            };

            repositoryStub.Setup(repo => repo.GetAll(false)).ReturnsAsync(expectedTransactions);

            var handler = new GetAllTransactionHandler(repositoryStub.Object);

            // Act
            var actualTransactions = await handler.Handle();

            // Assert
            Assert.Equal(expectedTransactions, actualTransactions);
        }
}