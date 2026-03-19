// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import ProfileModal from './ProfileModal';
// import SettingsModal from './SettingsModal';

// // Simple user icon SVG inline for example
// const UserIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 16 16"
//     className={className}
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M13.468 12.37C12.758 11.226 11.39 10.5 8 10.5s-4.758.726-5.468 1.87A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
//     <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//     <path fillRule="evenodd" d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
//   </svg>
// );

// export default function Navbar({ onToggleSidebar } = {}) {
//   const email = localStorage.getItem('email') || 'Guest';
//   const initials = (email && email[0]) ? email[0].toUpperCase() : 'G';
//   const [userOpen, setUserOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     localStorage.removeItem('roles');
//     window.location.href = '/login';
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">
//           {/* Left: brand + mobile menu button */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => {
//                 if (onToggleSidebar) onToggleSidebar();
//                 else window.dispatchEvent(new Event('toggle-sidebar'));
//               }}
//               className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
//               aria-label="Open menu"
//             >
//               {/* hamburger */}
//               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             <Link to="/home" className="flex items-center gap-3">
//               <div className="w-9 h-9 rounded-md bg-indigo-600 text-white flex items-center justify-center font-semibold">
//                 A
//               </div>
//               <div className="hidden sm:block">
//                 <div className="text-sm font-semibold text-gray-800">Arithmos</div>
//                 <div className="text-xs text-gray-500">Payroll & HR</div>
//               </div>
//             </Link>
//           </div>

//           {/* Middle: optional search (hidden on small screens) */}
//           {/* <div className="hidden md:flex flex-1 px-6">
//             <div className="w-full max-w-xl">
//               <label htmlFor="nav-search" className="sr-only">Search</label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   id="nav-search"
//                   className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
//                   placeholder="Search employees, payroll..."
//                   type="search"
//                 />
//               </div>
//             </div>
//           </div> */}

//           {/* Right: user */}
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex flex-col text-right mr-2">
//               <span className="text-sm font-medium text-gray-800 truncate max-w-[160px]">{email}</span>
//               <span className="text-xs text-gray-500">Administrator</span>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setUserOpen((s) => !s)}
//                 className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 transition"
//                 aria-haspopup="true"
//                 aria-expanded={userOpen}
//               >
//                 <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
//                   {initials}
//                 </div>
//                 <div className="hidden sm:block text-sm text-gray-700">Account</div>
//                 <svg className={`w-4 h-4 text-gray-500 transition-transform ${userOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                 </svg>
//               </button>

//               {userOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
//                   <button
//                     onClick={() => {
//                       setProfileOpen(true);
//                       setUserOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSettingsOpen(true);
//                       setUserOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     Settings
//                   </button>
//                   <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
//                 </div>
//               )}
//             </div>

//             {/* mobile menu toggle */}
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
//               onClick={() => setMobileOpen((s) => !s)}
//               aria-label="Open mobile nav"
//             >
//               <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 {mobileOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile nav dropdown */}
//       {mobileOpen && (
//         <div className="md:hidden bg-white border-t shadow-sm">
//           <div className="px-4 py-3 space-y-1">
//             <Link to="/home" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">Home</Link>
//             <button
//                 onClick={() => {
//                   setProfileOpen(true);
//                   setUserOpen(false);
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//               >
//                 Profile
//               </button>
//             <button
//   onClick={() => {
//     setSettingsOpen(true);
//     setUserOpen(false);
//   }}
//   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
// >
//   Settings
// </button>
//             <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50">Sign out</button>
//           </div>
//         </div>
//       )}
//       <SettingsModal
//           email={email}
//           open={settingsOpen}
//           onClose={() => setSettingsOpen(false)}
//         />
//       <ProfileModal
//           email={email}
//           open={profileOpen}
//           onClose={() => setProfileOpen(false)}
//         />
//     </header>
//   );
// }









import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';

// Simple user icon SVG inline for example
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.468 12.37C12.758 11.226 11.39 10.5 8 10.5s-4.758.726-5.468 1.87A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path fillRule="evenodd" d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
  </svg>
);

export default function Navbar({ onToggleSidebar } = {}) {
  const email = localStorage.getItem('email') || 'Guest';
  const initials = (email && email[0]) ? email[0].toUpperCase() : 'G';
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: brand + mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onToggleSidebar) onToggleSidebar();
                else window.dispatchEvent(new Event('toggle-sidebar'));
              }}
              className="md:hidden p-2 rounded-md hover:bg-indigo-100 transition"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/home" className="flex items-center gap-3 group no-underline">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow group-hover:bg-indigo-700 transition">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition no-underline">Arithmos</div>
                {/* <div className="text-xs text-gray-500">Payroll & HR</div> */}
              </div>
            </Link>
          </div>

          {/* Right: user */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right mr-2">
              <span className="text-base font-semibold text-gray-800 truncate max-w-[180px]">{email}</span>
              <span className="text-xs text-indigo-600 font-medium">Administrator</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setUserOpen((s) => !s)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-indigo-50 transition border border-transparent hover:border-indigo-200"
                aria-haspopup="true"
                aria-expanded={userOpen}
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">
                  {initials}
                </div>
                <div className="hidden sm:block text-base text-gray-700 font-medium"></div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${userOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {userOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-indigo-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                  <button
                    onClick={() => {
                      setProfileOpen(true);
                      setUserOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2 text-base text-gray-700 hover:bg-indigo-50 rounded-lg transition"
                  >
                    <span className="font-medium">Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setSettingsOpen(true);
                      setUserOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2 text-base text-gray-700 hover:bg-indigo-50 rounded-lg transition"
                  >
                    <span className="font-medium">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-2 text-base text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              )}
            </div>

            {/* mobile menu toggle */}
            {/* <button
              className="md:hidden p-2 rounded-md hover:bg-indigo-100 transition"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Open mobile nav"
            >
              <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <Link to="/home" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 font-medium">Home</Link>
            <button
              onClick={() => {
                setProfileOpen(true);
                setUserOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 rounded-lg transition"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setSettingsOpen(true);
                setUserOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 rounded-lg transition"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
      <SettingsModal
        email={email}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <ProfileModal
        email={email}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.18s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </header>
  );
}