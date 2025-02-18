using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Configurations;

public class TransactionTypeConfiguration : IEntityTypeConfiguration<TransactionType>
{
    public void Configure(EntityTypeBuilder<TransactionType> builder)
    {
        ConfigureTransactionType(builder);
        ConfigureData(builder);
    }

    private void ConfigureTransactionType(EntityTypeBuilder<TransactionType> builder)
    {
        builder.ToTable("TransactionTypes");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Name).IsRequired().HasMaxLength(50);

        builder.HasMany(x => x.Transactions)
               .WithOne(x => x.TransactionType);
    }

    private void ConfigureData(EntityTypeBuilder<TransactionType> builder)
    {
        builder.HasData(
            new TransactionType(1, "Send"),
            new TransactionType(2, "Receive")
        );
    }
}