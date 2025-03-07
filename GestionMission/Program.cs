using GestionMission.Data;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("MyConnection")
    ));
builder.Services.AddScoped<IAffectationService, AffectationService>();
builder.Services.AddScoped<IFonctionService, FonctionService>();
builder.Services.AddScoped<IEmployerService, EmployerService>();
builder.Services.AddScoped<IStatutService, StatutService>();
builder.Services.AddScoped<IVehiculeService, VehiculeService>();
builder.Services.AddScoped<ICongeService, CongeService>();
builder.Services.AddScoped<IMissionService, MissionService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<IPaimentService, PaimentService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
