using Npgsql;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("ConnectionStrings:DefaultConnection is required.");
builder.Services.AddSingleton(_ => NpgsqlDataSource.Create(connectionString));
builder.Services.AddHealthChecks().AddCheck<DatabaseHealthCheck>("postgres");

var app = builder.Build();

app.MapGet("/api", () => Results.Ok(new { name = "Relay API" }));
app.MapHealthChecks("/api/health", new()
{
    ResponseWriter = async (context, report) =>
        await context.Response.WriteAsJsonAsync(new { status = report.Status.ToString() })
});

app.Run();
