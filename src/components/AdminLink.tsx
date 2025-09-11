import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const AdminLink = () => {
  const { profile } = useAuth();

  if (!profile?.is_admin) {
    return null;
  }

  return (
    <Link to="/admin">
      <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50">
        <Settings className="h-4 w-4 mr-2" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminLink;