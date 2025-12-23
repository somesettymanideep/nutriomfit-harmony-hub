import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAboutContent, AboutContentType } from "@/contexts/AboutContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Save, RotateCcw, Home, Eye } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isAdmin, logout } = useAdminAuth();
  const { content, updateContent, resetContent } = useAboutContent();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AboutContentType>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  // Redirect if not admin
  if (!isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleSave = () => {
    updateContent(formData);
    toast.success("Content updated successfully!");
  };

  const handleReset = () => {
    resetContent();
    toast.success("Content reset to default");
  };

  const updateFeature = (index: number, field: "title" | "description", value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Edit Homepage About Section</CardTitle>
            <CardDescription>
              Modify the content displayed in the About Preview section on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Badge */}
            <div className="space-y-2">
              <Label htmlFor="badge">Section Badge</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g., About NUTRIOMFIT"
              />
            </div>

            {/* Heading */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading Text</Label>
                <Input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g., A Holistic Approach to"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headingHighlight">Highlighted Word</Label>
                <Input
                  id="headingHighlight"
                  value={formData.headingHighlight}
                  onChange={(e) => setFormData({ ...formData, headingHighlight: e.target.value })}
                  placeholder="e.g., Wellness"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter the main description text..."
                rows={4}
              />
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Feature Cards</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.features.map((feature, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`feature-title-${index}`}>Title</Label>
                        <Input
                          id={`feature-title-${index}`}
                          value={feature.title}
                          onChange={(e) => updateFeature(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                        <Textarea
                          id={`feature-desc-${index}`}
                          value={feature.description}
                          onChange={(e) => updateFeature(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
