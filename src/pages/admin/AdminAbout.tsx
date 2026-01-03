import AdminLayout from "@/components/admin/AdminLayout";
import { useAboutContent } from "@/contexts/AboutContentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const AdminAbout = () => {
  const { content, updateContent, resetContent } = useAboutContent();
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSave = () => {
    updateContent(formData);
    toast.success("About content updated successfully");
  };

  const handleReset = () => {
    resetContent();
    toast.success("Content reset to default");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              About Section Content
            </h1>
            <p className="text-muted-foreground mt-1">
              Edit the homepage about section content.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw size={18} />
              Reset
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save size={18} />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={formData.heading}
                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.features.map((feature, index) => (
              <div key={index} className="p-4 bg-accent/50 rounded-lg space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
