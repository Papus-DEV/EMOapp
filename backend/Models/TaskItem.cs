namespace backend.Models;

public sealed class TaskItem
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public bool IsComplete { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
