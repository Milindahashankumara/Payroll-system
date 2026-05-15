using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using payrallproject.Data;
using payrallproject.Mappings;
using payrallproject.Models.Domains;
using payrallproject.Models.Helpter;
using payrallproject.Services.AuthService;
using payrallproject.Services.DepartmentService;
using payrallproject.Services.JobRoleService;
using payrallproject.Services.EmailServices;
using payrallproject.Services.EmployeeCategoriesService;
using payrallproject.Services.EmployeeService;
using payrallproject.Services.EmpOvertimeService;
using payrallproject.Services.HolidayService;
using payrallproject.Services.Leaves2Service;
using payrallproject.Services.LeavesService;
using payrallproject.Services.LoanRepaymentService;
using payrallproject.Services.LoanService;
using payrallproject.Services.NoPayDayService;
using payrallproject.Services.OTService;
using payrallproject.Services.RolesService;
using payrallproject.Services.SalaryReportService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AuthDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("dbstring"));
    options.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
});

builder.Services.AddAutoMapper(typeof(MapperProfiles).Assembly);

builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IRolesService, RolesService>();
builder.Services.AddScoped<IOTService, OTService>();
builder.Services.AddScoped<IEmployeeCategoriesService, EmployeeCategoriesService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IJobRoleService, JobRoleService>();
builder.Services.AddScoped<ILoanService, LoanService>();
builder.Services.AddScoped<ISalaryReportService, SalaryReportService>();
builder.Services.AddScoped<ILoanRepaymentService, LoanRepaymentService>();
builder.Services.AddScoped<ILeavesService, LeavesService>();
builder.Services.AddScoped<INoPayDayService, NoPayDayService>();
builder.Services.AddScoped<IEmpOvertimeService, EmpOvertimeService>();
builder.Services.AddScoped<IHolidayService, HolidayService>();
builder.Services.AddScoped<ILeaves2Service, Leaves2Service>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        AuthenticationType = "Jwt",
        ValidateIssuer = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
        );
});

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
    dbContext.Database.Migrate();

    var adminRole = await dbContext.Roles.FirstOrDefaultAsync(role => role.Name == "Admin");
    if (adminRole == null)
    {
        adminRole = new Roles
        {
            Name = "Admin",
            NormalizedName = "ADMIN",
            ConcurrencyStamp = Guid.NewGuid().ToString()
        };
        dbContext.Roles.Add(adminRole);
        await dbContext.SaveChangesAsync();
    }

    var adminEmail = "admin@arithmos.com";
    var adminUser = await dbContext.User.FirstOrDefaultAsync(user => user.Email == adminEmail);
    if (adminUser == null)
    {
        adminUser = new User
        {
            Email = adminEmail,
            FirstName = "Admin",
            LastName = "User",
            UserName = adminEmail,
            NormalizedUserName = adminEmail.ToUpperInvariant(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@12345"),
            SecurityStamp = Guid.NewGuid().ToString(),
            ConcurrencyStamp = Guid.NewGuid().ToString()
        };

        dbContext.User.Add(adminUser);
        await dbContext.SaveChangesAsync();

        dbContext.UserRoles.Add(new UserRoles
        {
            UserId = adminUser.Id,
            RolesId = adminRole.Id
        });
        await dbContext.SaveChangesAsync();
    }

    var employeeCategoriesSeed = new[]
    {
        new EmployeeCategories
        {
            CategoryName = "Staff",
            Description = "Monthly salaried employees",
            DaySalarybased = false,
            IsActive = true
        },
        new EmployeeCategories
        {
            CategoryName = "Casual",
            Description = "Day salary based employees",
            DaySalarybased = true,
            IsActive = true
        }
    };

    foreach (var category in employeeCategoriesSeed)
    {
        var existingCategory = await dbContext.EmployeeCategories.FirstOrDefaultAsync(item => item.CategoryName == category.CategoryName);
        if (existingCategory == null)
        {
            dbContext.EmployeeCategories.Add(category);
        }
    }

    await dbContext.SaveChangesAsync();

    var jobRolesSchemaSql = @"
IF OBJECT_ID(N'[JobRoles]', N'U') IS NULL
BEGIN
    CREATE TABLE [JobRoles] (
        [Id] int NOT NULL IDENTITY,
        [RoleName] nvarchar(255) NOT NULL,
        [DepartmentId] int NULL,
        [EmployeeCategoriesId] int NULL,
        [IsActive] bit NULL CONSTRAINT [DF_JobRoles_IsActive] DEFAULT 1,
        CONSTRAINT [PK_JobRoles] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_JobRoles_Departments] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([Id]),
        CONSTRAINT [FK_JobRoles_EmployeeCategories] FOREIGN KEY ([EmployeeCategoriesId]) REFERENCES [EmployeeCategories] ([Id])
    );
END;

IF COL_LENGTH('Employe', 'JobRoleId') IS NULL
BEGIN
    ALTER TABLE [Employe] ADD [JobRoleId] int NULL;
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE name = 'FK_Employe_JobRoles'
)
BEGIN
    ALTER TABLE [Employe]
    ADD CONSTRAINT [FK_Employe_JobRoles] FOREIGN KEY ([JobRoleId]) REFERENCES [JobRoles] ([Id]);
END;
";

    await dbContext.Database.ExecuteSqlRawAsync(jobRolesSchemaSql);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
