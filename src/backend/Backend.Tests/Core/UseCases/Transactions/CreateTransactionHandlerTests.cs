using Backend.Core;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Core.UseCases.Transactions;
using FluentValidation;
using FluentValidation.Results;
using Moq;
using Xunit;

namespace Backend.Tests.Core.UseCases;

public class CreateTransactionHandlerTests
{
    private readonly Mock<ITransactionRepository> _repoMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IValidator<Transaction>> _validatorMock;
    private readonly CreateTransactionHandler _handler;

    public CreateTransactionHandlerTests()
    {
        _repoMock = new Mock<ITransactionRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _validatorMock = new Mock<IValidator<Transaction>>();
        _handler = new CreateTransactionHandler(_repoMock.Object, _unitOfWorkMock.Object, _validatorMock.Object);
    }

    [Fact]
    public async Task Handle_ValidationFails_ReturnsValidationResult()
    {
        // Arrange
        var transaction = new Transaction(1, 100, DateTime.Now, "Test", 1);
        var validationResult = new ValidationResult(new List<ValidationFailure> { new ValidationFailure("Property", "Error") });
        _validatorMock.Setup(v => v.ValidateAsync(transaction, default)).ReturnsAsync(validationResult);

        // Act
        var result = await _handler.Handle(transaction);

        // Assert
        Assert.False(result.IsValid);
        _repoMock.Verify(r => r.Create(It.IsAny<Transaction>()), Times.Never);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(default), Times.Never);
    }

    [Fact]
    public async Task Handle_ValidationSucceeds_CreatesTransaction()
    {
        // Arrange
        var transaction = new Transaction(1, 100, DateTime.Now, "Test", 1);
        var validationResult = new ValidationResult();
        _validatorMock.Setup(v => v.ValidateAsync(transaction, default)).ReturnsAsync(validationResult);

        // Act
        var result = await _handler.Handle(transaction);

        // Assert
        Assert.True(result.IsValid);
        _repoMock.Verify(r => r.Create(transaction), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(default), Times.Once);
    }
}