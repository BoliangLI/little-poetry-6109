
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Palette,
  ChevronDown,
  ChevronUp,
  User,
  Moon,
  Sun,
  Folder,
} from "lucide-react";
import { useTheme } from "next-themes";

const recentConversations = [
  "阿里云 ESA 官网",
  "Hello World 页面",
  "生成一个 hello beijing",
  "帮我生成一个阿里云官网",
  "帮我生成一个 hello workd",
  "帮我生成一个 hello world",
  "帮我生成一个 hello world",
  "Hello World 页面",
  "极简风格欢迎页面",
  "极简风欢迎页面",
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [recentsOpen, setRecentsOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-0 overflow-hidden" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2C12 2 10 6 10 9C10 11.5 11 13 12 13C13 13 14 11.5 14 9C14 6 12 2 12 2Z" />
              <path d="M12 13C12 13 10 17 10 20C10 21.5 11 22 12 22C13 22 14 21.5 14 20C14 17 12 13 12 13Z" />
            </svg>
          </div>
          <span className="font-semibold text-sidebar-foreground">Vesa</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggle}
        >
          <Folder className="h-4 w-4 text-sidebar-foreground" />
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80"
        >
          <Plus className="h-4 w-4" />
          <span>新建对话</span>
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索"
            className="pl-9 bg-transparent border-0 text-sm"
          />
        </div>
      </div>

      {/* Design System */}
      <div className="px-3 pb-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sm h-9"
        >
          <Palette className="h-4 w-4" />
          <span>设计系统</span>
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3">
        {/* Favorites */}
        <div className="py-2">
          <button
            onClick={() => setFavoritesOpen(!favoritesOpen)}
            className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            <span>收藏</span>
            {favoritesOpen ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          {favoritesOpen && (
            <div className="mt-2 text-xs text-muted-foreground italic text-center py-4">
              收藏的对话会显示在这里
            </div>
          )}
        </div>

        {/* Recent Conversations */}
        <div className="py-2">
          <button
            onClick={() => setRecentsOpen(!recentsOpen)}
            className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            <span>最近对话</span>
            {recentsOpen ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          {recentsOpen && (
            <div className="mt-2 space-y-1">
              {recentConversations.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left text-xs text-sidebar-foreground hover:bg-sidebar-accent px-2 py-1.5 rounded transition-colors truncate"
                >
                  {item}
                </button>
              ))}
              <button className="w-full text-center text-xs text-muted-foreground hover:text-sidebar-foreground py-2 transition-colors">
                展示更多
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border flex items-center justify-between">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <User className="h-4 w-4 text-sidebar-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          )}
        </Button>
      </div>
    </aside>
  );
}
