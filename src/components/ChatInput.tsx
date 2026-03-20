
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [model, setModel] = useState("Qwen3.5-plus");

  const handleSubmit = () => {
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          className="w-full min-h-[80px] max-h-[200px] p-4 pr-14 bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground"
          rows={1}
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-xs text-muted-foreground"
                >
                  <Settings2 className="h-3 w-3" />
                  <span>{model}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setModel("Qwen3.5-plus")}>
                  Qwen3.5-plus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("Qwen3.5-turbo")}>
                  Qwen3.5-turbo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("GPT-4")}>
                  GPT-4
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className={cn(
              "h-8 w-8 rounded-lg transition-all",
              message.trim()
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
            size="icon"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
