using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        ConfigureTransaction(builder);
    }

    private void ConfigureTransaction(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.Description).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Amount).IsRequired();
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.TransactionTypeId).IsRequired();

        builder.HasOne(x => x.TransactionType)
            .WithMany(x => x.Transactions);
    }
}