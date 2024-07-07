const Dashboard = () => {
    return (
      <div className="flex justify-center h-screen bg-gray-100 pt-[5%]">
        <div className="bg-white shadow-md rounded-lg p-6 w-[90%]">
          <h1 className="text-3xl font-semibold mb-6 text-center">Dashboard</h1>
  
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
              <p className="text-2xl font-bold text-gray-800">256</p>
            </div>
  
            {/* Card 2 */}
            <div className="bg-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Appointments Today</h2>
              <p className="text-2xl font-bold text-gray-800">42</p>
            </div>
  
            {/* Card 3 */}
            <div className="bg-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Revenue This Month</h2>
              <p className="text-2xl font-bold text-gray-800">$15,620</p>
            </div>
          </div>
  
          {/* Recent Appointments */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">John Doe</span>
                  <span className="text-gray-500">Dentist - 10:00 AM</span>
                </div>
                <span className="px-4 py-2 bg-blue-500 text-white rounded-md">Confirmed</span>
              </li>
              <li className="py-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Jane Smith</span>
                  <span className="text-gray-500">Optometrist - 2:00 PM</span>
                </div>
                <span className="px-4 py-2 bg-yellow-500 text-white rounded-md">Pending</span>
              </li>
              <li className="py-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Michael Johnson</span>
                  <span className="text-gray-500">Physiotherapy - 4:30 PM</span>
                </div>
                <span className="px-4 py-2 bg-green-500 text-white rounded-md">Completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  