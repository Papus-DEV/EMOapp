using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Tasks;

public static class TaskEndpoints
{
    public static RouteGroupBuilder MapTaskEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/tasks").WithTags("Tasks");

        group.MapGet("/", async (AppDbContext db) =>
            await db.Tasks
                .OrderByDescending(task => task.CreatedAtUtc)
                .ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Tasks.FindAsync(id) is { } task
                ? Results.Ok(task)
                : Results.NotFound());

        group.MapPost("/", async (CreateTaskRequest request, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return Results.BadRequest(new { error = "Title is required." });
            }

            var task = new TaskItem
            {
                Title = request.Title.Trim()
            };

            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            return Results.Created($"/api/tasks/{task.Id}", task);
        });

        group.MapPut("/{id:int}", async (int id, UpdateTaskRequest request, AppDbContext db) =>
        {
            var task = await db.Tasks.FindAsync(id);
            if (task is null)
            {
                return Results.NotFound();
            }

            if (!string.IsNullOrWhiteSpace(request.Title))
            {
                task.Title = request.Title.Trim();
            }

            if (request.IsComplete.HasValue)
            {
                task.IsComplete = request.IsComplete.Value;
            }

            await db.SaveChangesAsync();
            return Results.Ok(task);
        });

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var task = await db.Tasks.FindAsync(id);
            if (task is null)
            {
                return Results.NotFound();
            }

            db.Tasks.Remove(task);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        return group;
    }
}

public sealed record CreateTaskRequest(string Title);

public sealed record UpdateTaskRequest(string? Title, bool? IsComplete);
