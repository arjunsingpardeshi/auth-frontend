import React from 'react'

// src/page/HomePage.jsx
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser, logout } = useAuthStore();
  console.log("authuser in homepage = ", authUser);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  
  return (
    <>
   
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Welcome 👋</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <CardTitle>Hello, {authUser?.data.username || "User"}!</CardTitle>
            <p className="text-gray-600 mt-2">
              You have successfully logged in. Explore the dashboard or start a new task.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <CardTitle>📊 Stats</CardTitle>
              <p className="text-gray-600 mt-2">Track your progress and activity here.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle>📝 New Task</CardTitle>
              <p className="text-gray-600 mt-2">Start working on a new project or task.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};


export default HomePage