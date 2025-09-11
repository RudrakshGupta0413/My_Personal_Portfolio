import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import BlogManager from "@/components/admin/BlogManager";
import FreelanceUpdatesManager from "@/components/admin/FreelanceUpdatesManager";
import AdminHeader from "@/components/admin/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  // if (!user || !profile?.is_admin) {
  //   return <Navigate to="/auth" replace />;
  // }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blog posts and freelance updates
            </p>
          </div>

          <Tabs defaultValue="blogs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
              <TabsTrigger value="updates">Freelance Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blogs" className="space-y-6">
              <BlogManager />
            </TabsContent>
            
            <TabsContent value="updates" className="space-y-6">
              <FreelanceUpdatesManager />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;