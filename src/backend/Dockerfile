# Use the official .NET 8 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and restore dependencies
COPY backend.sln .
COPY Backend.Api/Backend.Api.csproj ./Backend.Api/
COPY Backend.Contracts/Backend.Contracts.csproj ./Backend.Contracts/
COPY Backend.Core/Backend.Core.csproj ./Backend.Core/
COPY Backend.Infrastructure/Backend.Infrastructure.csproj ./Backend.Infrastructure/
COPY Backend.Tests/Backend.Tests.csproj ./Backend.Tests/

# Restore the dependencies for all projects
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
WORKDIR /src/Backend.Api
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET 8 runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build artifacts from the build stage
COPY --from=build /app/publish .

# Copy the SQLite database file (if it exists)
COPY Backend.Api/database.db ./database.db

# Copy the entrypoint script from the root directory
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose the port your API will run on
EXPOSE 80

# Set the entry point for the application
ENTRYPOINT ["./entrypoint.sh"]