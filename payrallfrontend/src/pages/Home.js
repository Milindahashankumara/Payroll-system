import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiUsers,
  HiCurrencyDollar,
  HiOfficeBuilding,
  HiCalendar,
  HiDocument,
  HiDatabase,
  HiFire,
  HiCash,
  HiGlobe,
  HiFlag,
  HiDuplicate,
  HiPlus,
  HiCalculator,
} from "react-icons/hi";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    leaves: 0,
    loans: 0,
    payrolls: 0,
    categories: 0,
    otSettings: 0,
    otUsage: 0,
    holidays: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      setLoading(true);
      try {
        // Adjust endpoints as needed for your backend
        const [
          empRes,
          deptRes,
          leaveRes,
          loanRes,
          catRes,
          otRes,
          otUsageRes,
          holidayRes,
          payrollRes,
        ] = await Promise.all([
          axios.get(`${baseUrl}/api/employees`),
          axios.get(`${baseUrl}/api/departments`),
          axios.get(`${baseUrl}/api/leaves`),
          axios.get(`${baseUrl}/api/loan`),
          axios.get(`${baseUrl}/api/empcategories`),
          axios.get(`${baseUrl}/api/ot`),
          axios.get(`${baseUrl}/api/EmpOvertime`),
          axios.get(`${baseUrl}/api/specialHolidays`),
          axios.get(`${baseUrl}/api/calculations`),
        ]);
        if (!mounted) return;
        setStats({
          employees: empRes.data?.length || 0,
          departments: deptRes.data?.length || 0,
          leaves: leaveRes.data?.length || 0,
          loans: loanRes.data?.length || 0,
          categories: catRes.data?.length || 0,
          otSettings: otRes.data?.length || 0,
          otUsage: otUsageRes.data?.length || 0,
          holidays: holidayRes.data?.length || 0,
          payrolls: payrollRes.data?.length || 0,
        });
        setRecentEmployees(empRes.data?.slice(0, 5) || []);
      } catch (err) {
        // fallback to zeroes
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  // Card data for quick navigation
  const quickLinks = [
    {
      to: "/employees",
      label: "Employees",
      icon: <HiUsers className="w-6 h-6" />,
      stat: stats.employees,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      to: "/departments",
      label: "Departments",
      icon: <HiOfficeBuilding className="w-6 h-6" />,
      stat: stats.departments,
      color: "bg-green-50 text-green-600",
    },
    {
      to: "/leaves",
      label: "Leaves",
      icon: <HiCalendar className="w-6 h-6" />,
      stat: stats.leaves,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      to: "/loan",
      label: "Loans",
      icon: <HiCash className="w-6 h-6" />,
      stat: stats.loans,
      color: "bg-red-50 text-red-600",
    },
    {
      to: "/salaryreports",
      label: "Salary Reports",
      icon: <HiDocument className="w-6 h-6" />,
      stat: stats.payrolls,
      color: "bg-blue-50 text-blue-600",
    },
    {
      to: "/generatesalary",
      label: "Generate Salary",
      icon: <HiDatabase className="w-6 h-6" />,
      stat: null,
      color: "bg-purple-50 text-purple-600",
    },
    {
      to: "/OTusage",
      label: "OT Usage",
      icon: <HiCalculator className="w-6 h-6" />,
      stat: stats.otUsage,
      color: "bg-pink-50 text-pink-600",
    },
    {
      to: "/specialHolidays",
      label: "Special Holidays",
      icon: <HiCalendar className="w-6 h-6" />,
      stat: stats.holidays,
      color: "bg-orange-50 text-orange-600",
    },
    {
      to: "/empcategories",
      label: "Employee Categories",
      icon: <HiDuplicate className="w-6 h-6" />,
      stat: stats.categories,
      color: "bg-teal-50 text-teal-600",
    },
    {
      to: "/OT",
      label: "OT Settings",
      icon: <HiFlag className="w-6 h-6" />,
      stat: stats.otSettings,
      color: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Payroll Dashboard</h1>
            <p className="text-gray-500">All your payroll and HR essentials at a glance.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/employees"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow text-sm font-medium hover:bg-gray-100 transition no-underline"
              style={{ textDecoration: "none" }}
            >
              <HiPlus className="w-5 h-5" />
              Add Employee
            </Link>
            <Link
              to="/generatesalary"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow text-sm font-medium hover:bg-gray-100 transition no-underline"
              style={{ textDecoration: "none" }}
            >
              <HiDatabase className="w-5 h-5" />
              Generate Salary
            </Link>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-sm bg-white hover:bg-indigo-50 transition group border border-gray-100 no-underline`}
              style={{ textDecoration: "none" }}
            >
              <span className={`rounded-full p-2 ${link.color} mb-1 group-hover:scale-110 transition`}>
                {link.icon}
              </span>
              <span className="font-semibold text-gray-800 group-hover:text-indigo-700 text-sm">{link.label}</span>
              {/* Only show stat if not loading and stat is not 0 and not null */}
              {link.stat !== null && !loading && link.stat > 0 && (
                <span className="text-xs text-gray-500">{link.stat}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}