import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useAppStore } from '@/core/stores';
import { Button } from '@/components';
import { APP_NAME } from '@/core/config';

export function Header() {
  const { theme, toggleTheme, toggleSidebar } = useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <FiMoon className="h-5 w-5" />
            ) : (
              <FiSun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
