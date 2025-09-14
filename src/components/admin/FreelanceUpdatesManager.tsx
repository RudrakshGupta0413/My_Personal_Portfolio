import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Briefcase, Award, Target, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface FreelanceUpdate {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'achievement' | 'milestone' | 'announcement';
  status: 'active' | 'inactive';
  priority: number;
  created_at: string;
  updated_at: string;
}

const typeIcons = {
  project: Briefcase,
  achievement: Award,
  milestone: Target,
  announcement: Megaphone,
};

const typeColors = {
  project: "bg-blue-500/20 text-blue-300",
  achievement: "bg-green-500/20 text-green-300",
  milestone: "bg-purple-500/20 text-purple-300",
  announcement: "bg-orange-500/20 text-orange-300",
};

const FreelanceUpdatesManager = () => {
  const [updates, setUpdates] = useState<FreelanceUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<FreelanceUpdate | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "project" as FreelanceUpdate['type'],
    status: "active" as FreelanceUpdate['status'],
    priority: 1,
  });
  const { profile } = useAuth();
  const { toast } = useToast();

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from("freelance_updates")
        .select("*")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch freelance updates",
          variant: "destructive",
        });
      } else {
        setUpdates(data as FreelanceUpdate[] || []);
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "project",
      status: "active",
      priority: 1,
    });
    setEditingUpdate(null);
  };

  const handleEdit = (update: FreelanceUpdate) => {
    setFormData({
      title: update.title,
      description: update.description,
      type: update.type,
      status: update.status,
      priority: update.priority,
    });
    setEditingUpdate(update);
    setShowDialog(true);
  };

  const handleCreate = () => {
    resetForm();
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        priority: formData.priority,
        author_id: profile?.id,
      };

      if (editingUpdate) {
        const { error } = await supabase
          .from("freelance_updates")
          .update(updateData)
          .eq("id", editingUpdate.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Update modified successfully",
        });
      } else {
        const { error } = await supabase
          .from("freelance_updates")
          .insert([updateData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Update created successfully",
        });
      }

      setShowDialog(false);
      resetForm();
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save update",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;

    try {
      const { error } = await supabase
        .from("freelance_updates")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Update deleted successfully",
      });
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete update",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (update: FreelanceUpdate) => {
    const newStatus = update.status === 'active' ? 'inactive' : 'active';

    try {
      const { error } = await supabase
        .from("freelance_updates")
        .update({ status: newStatus })
        .eq("id", update.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Update ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
      });
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tech Updates</h2>
          <p className="text-muted-foreground">Manage your freelance work updates and announcements</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              New Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUpdate ? "Edit Update" : "Create New Update"}
              </DialogTitle>
              <DialogDescription>
                Add information about your freelance work or achievements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Update title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your update"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: FreelanceUpdate['type']) => 
                      setFormData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: FreelanceUpdate['status']) => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingUpdate ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : updates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No updates yet</h3>
                <p className="text-muted-foreground">Create your first freelance update</p>
              </div>
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Update
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {updates.map((update) => {
            const Icon = typeIcons[update.type];
            return (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-effect border-white/20 h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${typeColors[update.type]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium">{update.title}</CardTitle>
                          <Badge variant={update.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {update.status}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        P{update.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">
                      {update.description}
                    </CardDescription>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(update)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusToggle(update)}
                      >
                        {update.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(update.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FreelanceUpdatesManager;