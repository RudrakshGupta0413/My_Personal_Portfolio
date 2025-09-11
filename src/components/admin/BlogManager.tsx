import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BlogEditor from "./BlogEditor";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  tags: string[];
  status: 'draft' | 'published';
  read_time: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch blogs",
          variant: "destructive",
        });
      } else {
        setBlogs(data as Blog[] || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleStatusToggle = async (blog: Blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    const updates: any = { status: newStatus };
    
    if (newStatus === 'published' && !blog.published_at) {
      updates.published_at = new Date().toISOString();
    }

    try {
      const { error } = await supabase
        .from("blogs")
        .update(updates)
        .eq("id", blog.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update blog status",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
        });
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleCreateNew = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  if (showEditor) {
    return (
      <BlogEditor
        blog={editingBlog}
        onClose={handleEditorClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Edit className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No blog posts yet</h3>
                <p className="text-muted-foreground">Create your first blog post to get started</p>
              </div>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-effect border-white/20 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{blog.excerpt}</CardDescription>
                    </div>
                    <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                      {blog.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(blog)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;