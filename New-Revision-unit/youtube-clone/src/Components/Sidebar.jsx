import React from 'react';
import { NavLink } from 'react-router-dom';

// Placeholder Icons (use actual icons library for production)
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const ShortsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" /></svg>);
const SubscriptionsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const YourVideosIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>);

const navItems = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { name: 'Shorts', icon: <ShortsIcon />, path: '/shorts' },
    { name: 'Subscriptions', icon: <SubscriptionsIcon />, path: '/subscriptions' },
];

const secondaryItems = [
    { name: 'Library', icon: <YourVideosIcon />, path: '/library' },
    { name: 'History', icon: <HistoryIcon />, path: '/history' },
];

const SidebarItem = ({ icon, name, path }) => {
    return (
        <NavLink 
            to={path} 
            className={({ isActive }) => 
                `flex items-center py-2 px-6 rounded-lg text-white transition-colors duration-150 ${
                    isActive ? 'bg-[#3f3f3f] font-semibold' : 'hover:bg-[#272727]'
                }`
            }
            end // Ensures exact match for the path
        >
            <span className="w-6 mr-6 flex-shrink-0">{icon}</span>
            <span className="text-sm">{name}</span>
        </NavLink>
    );
};

export default function Sidebar() {
    // Note: The sidebar is fixed width for simplicity, mimicking the YouTube desktop style.
    // For a toggle function (mini-sidebar), you'd need a global state (Context) to manage its width.
    return (
        <aside 
            className="hidden md:block w-56 fixed top-14 bottom-0 left-0 bg-[#202020] overflow-y-auto z-10 p-2"
        >
            <div className="space-y-2 pb-4 border-b border-gray-700">
                {navItems.map(item => (
                    <SidebarItem key={item.name} {...item} />
                ))}
            </div>

            <div className="space-y-2 pt-4">
                <h3 className="text-gray-400 text-xs uppercase px-6">You</h3>
                {secondaryItems.map(item => (
                    <SidebarItem key={item.name} {...item} />
                ))}
            </div>

            {/* Placeholder for Subscription/More from YouTube section */}
            <div className="space-y-2 pt-6 border-t border-gray-700 mt-6 text-gray-400 text-xs px-6">
                <p>Browse Channels</p>
                <p>More from YouTube</p>
            </div>
        </aside>
    );
}