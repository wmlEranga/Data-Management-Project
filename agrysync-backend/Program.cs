using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using agrysync_backend.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

// Add services to the container.
builder.Services.AddControllers();

// Configure DbContext for PostgreSQL
builder.Services.AddDbContext<AgrysyncDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("AgrysyncDbConnection")); // Updated connection string name
});

// Enable CORS with a policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allow your frontend URL
               .AllowAnyMethod()
               .AllowAnyHeader()
               .WithExposedHeaders("Set-Cookie")
               .AllowCredentials(); // Allows cookies
    });
});

// Add JWT Authentication
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:SecretKey"]); // Get secret key from configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Set to true in production
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, // You can validate the issuer based on your needs
        ValidateAudience = false, // You can validate the audience based on your needs
        ClockSkew = TimeSpan.Zero // Optional: remove delay when token expires
    };
});

// Add in-memory caching
builder.Services.AddDistributedMemoryCache(); // Add this line for in-memory caching

// Enable session handling for cookies
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true; // Ensure the cookie is HTTP-only for security
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Use Secure cookies in production (HTTPS)
    options.Cookie.SameSite = SameSiteMode.Strict; // CSRF protection
    options.IdleTimeout = TimeSpan.FromHours(1); // Set session timeout
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy
app.UseCors("AllowSpecificOrigins");

// Enable Authentication and Authorization
app.UseAuthentication(); // Add this line before UseAuthorization
app.UseAuthorization();

// Enable session handling
app.UseSession();

app.MapControllers();

app.Run();
