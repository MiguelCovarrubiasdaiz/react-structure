import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiCheckSquare } from 'react-icons/fi';
import { useAppStore } from '@/shared/stores';
import { cn } from '@/shared/utils';
import { ROUTES } from '@/shared/config';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', to: ROUTES.HOME, icon: <FiHome className="h-5 w-5" /> },
  { label: 'Users', to: ROUTES.USERS, icon: <FiUsers className="h-5 w-5" /> },
  {
    label: 'Todos',
    to: ROUTES.TODOS,
    icon: <FiCheckSquare className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
