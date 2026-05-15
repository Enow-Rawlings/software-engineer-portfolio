'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: Code },
    { label: 'Skills', href: '/admin/skills', icon: Briefcase },
    { label: 'Experience', href: '/admin/experience', icon: FileText },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 lg:relative lg:translate-x-0 lg:animate-none overflow-y-auto flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
