'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface PortfolioSettings {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  cvUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<PortfolioSettings>({
    name: 'Akoh Rawlings Enow',
    email: 'akoh@example.com',
    bio: 'Full Stack Developer & Software Engineer',
    profileImage: '',
    cvUrl: '',
    socialLinks: {
      github: 'https://github.com/Enow-Rawlings',
      linkedin: 'https://linkedin.com/in/akoh-enow',
      twitter: 'https://twitter.com/akoh_enow',
      portfolio: 'https://akoh-portfolio.vercel.app',
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const loadSettings = async () => {
      const savedSettings = localStorage.getItem('portfolio_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      try {
        const settingsDoc = doc(db, 'settings', 'portfolio');
        const docSnap = await getDoc(settingsDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings((prev) => ({
            ...prev,
            ...data,
            socialLinks: {
              ...prev.socialLinks,
              ...(data.socialLinks || {}),
            },
          }));
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user, router]);

  const handleChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSettings({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        [platform]: value,
      },
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'cvUrl') {
      setSaving(true);
      try {
        const url = await uploadToCloudinary(file, 'documents');
        const updatedSettings = {
          ...settings,
          cvUrl: url,
        };
        setSettings(updatedSettings);
        await setDoc(
          doc(db, 'settings', 'portfolio'),
          {
            cvUrl: url,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        localStorage.setItem('portfolio_settings', JSON.stringify(updatedSettings));
        toast.success('CV uploaded successfully');
      } catch (error) {
        console.error('Failed to upload CV', error);
        toast.error('Failed to upload CV');
      } finally {
        setSaving(false);
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSettings({
        ...settings,
        [field]: reader.result as string,
      });
      toast.success(`${field === 'profileImage' ? 'Profile image' : 'CV'} uploaded`);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(
        doc(db, 'settings', 'portfolio'),
        {
          ...settings,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      localStorage.setItem('portfolio_settings', JSON.stringify(settings));
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading settings...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 lg:ml-0">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your portfolio settings
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <label className="block text-sm font-semibold text-foreground mb-4">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {settings.profileImage && (
                  <img
                    src={settings.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-smooth cursor-pointer">
                  <Upload size={18} />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profileImage')}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>

            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6 space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Social Links
              </h3>

              {Object.entries(settings.socialLinks).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-semibold text-foreground mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={url || ''}
                    onChange={(e) =>
                      handleSocialChange(platform, e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ))}
            </motion.div>

            {/* CV Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <label className="block text-sm font-semibold text-foreground mb-4">
                CV / Resume
              </label>
              <div className="flex items-center justify-between p-4 border-2 border-dashed border-border rounded-lg hover:bg-muted/50 transition-smooth">
                <div>
                  <p className="text-foreground font-medium">
                    {settings.cvUrl
                      ? 'CV uploaded'
                      : 'No CV uploaded'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOC, or DOCX
                  </p>
                </div>
                <label
                  htmlFor="cv-upload"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-smooth cursor-pointer"
                >
                  Upload
                </label>
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'cvUrl')}
                  className="hidden"
                />
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Settings'}
            </motion.button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}
