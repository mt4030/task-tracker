import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";  
import {  LayoutDashboard, CheckSquare } from "lucide-react";  
import { useTodo } from "@/context/TodoContext";  

export function CommandMenu() {
  const { state } = useTodo();  
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");  //  filtering
  const navigate = useNavigate();

  // Flatten data for search
  const searchableItems = state.flatMap((board) => [
    {
      type: "board" as const,
      id: board.id,
      title: board.title,
      boardTitle: null,  
    },
    ...board.tasks.map((task) => ({
      type: "task" as const,
      id: task.id,
      title: task.title,
      boardId: board.id,  // To navigate to correct board
      boardTitle: board.title,  // For display
      status: task.status,  // Optional: Show in suggestion
    })),
  ]);

  // Filter based on search query
  const filteredBoards = searchableItems.filter(
    (item) => item.type === "board" && item.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTasks = searchableItems.filter(
    (item) => item.type === "task" && item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Cmd+K shortcut a
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: typeof searchableItems[0]) => {
    if (item.type === "board") {
      navigate(`/board/${item.id}`);
    } else {
      // Navigate to task: Adjust based on your routes (e.g., open in board or modal)
      navigate(`/board/${item.boardId}?task=${item.id}`);  // Or use dispatch to open dialog
    }
    setOpen(false);
    setSearch("");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search boards & tasks..."
        value={search}
        onValueChange={setSearch}
      
    
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {filteredBoards.length > 0 && (
          <CommandGroup heading="Boards">
            {filteredBoards.map((board) => (
              <CommandItem
                key={board.id}
                value={board.title}  // For keyboard search
                onSelect={() => handleSelect(board)}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>{board.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">Board</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredBoards.length > 0 && filteredTasks.length > 0 && <CommandSeparator />}

        {filteredTasks.length > 0 && (
          <CommandGroup heading="Tasks">
            {filteredTasks.map((task) => (
              <CommandItem
                key={task.id}
                value={task.title}
                onSelect={() => handleSelect(task)}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>{task.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {task.type === "task" ? (
  <div>
    Task in {task.boardTitle} · {task.status}
  </div>
) : (
  <div>
    Board: {task.title}
  </div>
)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}