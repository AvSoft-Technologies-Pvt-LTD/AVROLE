import React, { useState, useEffect } from "react";
import { Search, Bell, User, LogOut, Settings, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const HeaderWithNotifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('https://67e631656530dbd3110f0322.mockapi.io/notify');
      const sorted = res.data
        .map(n => ({
          ...n,
          unread: n.unread ?? true
        }))
        .sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setNotifications(sorted);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    console.log("Searching:", e.target.value);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log("Logging out");
  };

  const handleNotificationRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const handleViewAll = () => {
    setShowNotifications(false);
    navigate('/dashboard/notifications');
  };

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const time = new Date(createdAt);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const displayNotifications = notifications.slice(0, 2);

  return (
    <nav className="sticky w-full top-0 mt-2 z-50 bg-gray-50 py-2 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16 items-center">
          <div className="flex items-center space-x-4 text-[#021630]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#021630]" />
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="pl-10 pr-3 py-2 w-64 rounded-lg bg-white text-[#021630] placeholder-[#021630] border border-[#021630] focus:outline-none focus:border-[#021630]"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="relative group"
              >
                <Bell className="h-6 w-6 text-[#021630] group-hover:text-[#F4C430] cursor-pointer transition" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-[24rem] bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto z-50">
                  <div className="sticky top-0 bg-[#0E1630] px-5 py-4 border-b flex justify-between items-center rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                    {notifications.length > 2 && (
                      <Link
                        to="/dashboard/notifications"
                        className="text-sm font-medium text-[#F4C430] hover:underline"
                        onClick={handleViewAll}
                      >
                        View All
                      </Link>
                    )}
                  </div>

                  {displayNotifications.length === 0 ? (
                    <div className="px-5 py-6 text-center text-gray-500 text-sm">
                      You're all caught up 🎉
                    </div>
                  ) : (
                    displayNotifications.map(notification => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationRead(notification.id)}
                        className={`group px-5 py-4 transition cursor-pointer border-b ${
                          notification.unread ? 'bg-[#F4C430]/20' : 'bg-white'
                        } hover:bg-[#F4C430]/10`}
                      >
                        <div className="flex justify-between gap-3 items-start">
                          <div className="flex-1">
                            <p className="text-sm text-[#0E1630] leading-snug">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {getTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 mt-1 bg-[#F4C430] rounded-full shrink-0 group-hover:opacity-80 transition-opacity" />
                          )}
                        </div>

                        {notification.showPayButton && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Pay now clicked for notification:', notification.id);
                            }}
                            className="mt-3 inline-block bg-[#F4C430] hover:bg-[#e0b320] text-[#0E1630] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm transition-colors"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="h-10 w-10 rounded-full bg-white border border-[#021630] flex items-center justify-center cursor-pointer hover:bg-[#F4C430] transition"
              >
                <User className="h-5 w-5 text-[#021630]" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <UserCircle className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderWithNotifications;