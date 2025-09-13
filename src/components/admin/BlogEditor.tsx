import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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

interface BlogEditorProps {
  blog: Blog | null;
  onClose: () => void;
}

const BlogEditor = ({ blog, onClose }: BlogEditorProps) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    tags: "",
    status: "draft" as 'draft' | 'published',
    read_time: 5,
  });
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        featured_image: blog.featured_image || "",
        tags: blog.tags.join(", "),
        status: blog.status,
        read_time: blog.read_time,
      });
    }
  }, [blog]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value,
    }));
  };

  const handleStatusChange = (value: 'draft' | 'published') => {
    setFormData(prev => ({
      ...prev,
      status: value,
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const readTime = calculateReadTime(formData.content);

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: formData.featured_image || null,
        tags,
        status: formData.status,
        read_time: readTime,
        author_id: profile?.id,
        ...(formData.status === 'published' && !blog?.published_at ? {
          published_at: new Date().toISOString()
        } : {})
      };

      if (blog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", blog.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([blogData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold">
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Eye className="h-4 w-4 mr-2" />
            {formData.status === 'published' ? 'Update & Publish' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here..."
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  name="featured_image"
                  value={formData.featured_image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Separate tags with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogEditor;