#!/bin/sh
echo "Applying database migrations..."
dotnet ef database update --project ./Backend.Infrastructure --startup-project ./Backend.Api --configuration Release
echo "Starting the application..."
dotnet Backend.Api.dll