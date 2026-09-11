import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Globe,
  Layers,
  TrendingUp,
  Save,
  X,
  ArrowLeft,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Upload,
  Download,
  AlertTriangle,
  Image as ImageIcon,
  Share2,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { CaseStudy } from '../../types/caseStudy';
import { BlogPost } from '../../types/blog';
import {
  getStoredCaseStudies,
  saveCaseStudy,
  deleteCaseStudy,
  togglePublishStatus,
  clearAllCaseStudies,
  MAX_CASE_STUDIES
} from '../../services/caseStudyStorage';
import {
  getStoredBlogs,
  saveBlog,
  deleteBlog,
  toggleBlogPublishStatus,
  clearAllBlogs,
  MAX_BLOGS
} from '../../services/blogStorage';
import { GmailRichEditor } from '../../components/admin/GmailRichEditor';

const ADMIN_SESSION_KEY = 'se_admin_logged_in';

const CATEGORIES = [
  'Performance Marketing',
  'Search Engine Optimization',
  'Digital Marketing',
  'E-Commerce',
  'Content Creation',
  'Brand Identity',
  'IT Solutions',
  'Influencer Marketing',
  'Marketing Consultation',
];

const BLOG_CATEGORIES = [
  'Performance Marketing',
  'SEO & AEO',
  'Digital Strategy',
  'E-Commerce Growth',
  'AI & Automation',
  'Content & Creative',
  'Leadership',
];

const PRESET_COVERS = [
  { label: 'Analytics Growth', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Clinic & Aesthetics', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Corporate Meeting', url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop' },
  { label: 'FinTech App', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Luxury E-Commerce', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Studio Production', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop' },
];

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Top Section Switcher: 'cases' or 'blogs'
  const [activeSection, setActiveSection] = useState<'cases' | 'blogs'>('blogs');

  // Case Studies States
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditingCase, setIsEditingCase] = useState(false);
  const [caseActiveTab, setCaseActiveTab] = useState<'editor' | 'preview'>('editor');

  // Case Study Form States
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [caseTitle, setCaseTitle] = useState('');
  const [caseSlug, setCaseSlug] = useState('');
  const [caseClient, setCaseClient] = useState('');
  const [caseCategory, setCaseCategory] = useState(CATEGORIES[0]);
  const [caseIndustry, setCaseIndustry] = useState('');
  const [caseSummary, setCaseSummary] = useState('');
  const [caseCoverImage, setCaseCoverImage] = useState(PRESET_COVERS[0].url);
  const [caseIsPublished, setCaseIsPublished] = useState(true);
  const [caseContentHtml, setCaseContentHtml] = useState('');
  const [caseMetrics, setCaseMetrics] = useState<{ label: string; value: string }[]>([
    { label: 'ROAS', value: '+340%' },
    { label: 'Revenue Growth', value: '4.8X' },
  ]);

  // Blogs States
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  // Blog Card Form States (Clean card elements + LinkedIn URL)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState(BLOG_CATEGORIES[0]);
  const [blogSummary, setBlogSummary] = useState('');
  const [blogCoverImage, setBlogCoverImage] = useState('https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1200&auto=format&fit=crop');
  const [blogLinkedinUrl, setBlogLinkedinUrl] = useState('https://www.linkedin.com/company/social-entities');
  const [blogReadTime, setBlogReadTime] = useState('3 min read');
  const [blogIsPublished, setBlogIsPublished] = useState(true);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  const [notification, setNotification] = useState<string>('');

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const loadAllData = () => {
    setCaseStudies(getStoredCaseStudies());
    setBlogs(getStoredBlogs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setLoginError('');
      loadAllData();
      showToast('Welcome back, Admin!');
    } else {
      setLoginError('Invalid username or password. Please use admin / admin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsEditingCase(false);
    setIsEditingBlog(false);
  };

  // ==========================================
  // BLOGS CRM HANDLERS (Card Elements + LinkedIn)
  // ==========================================
  const handleStartCreateBlog = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogCategory(BLOG_CATEGORIES[0]);
    setBlogSummary('');
    setBlogCoverImage('https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1200&auto=format&fit=crop');
    setBlogLinkedinUrl('https://www.linkedin.com/posts/');
    setBlogReadTime('3 min read');
    setBlogIsPublished(true);
    setIsEditingBlog(true);
  };

  const handleStartEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogTitle(b.title);
    setBlogCategory(b.category || BLOG_CATEGORIES[0]);
    setBlogSummary(b.summary || '');
    setBlogCoverImage(b.coverImage || '');
    setBlogLinkedinUrl(b.linkedinUrl || 'https://www.linkedin.com/');
    setBlogReadTime(b.readTime || '3 min read');
    setBlogIsPublished(b.isPublished);
    setIsEditingBlog(true);
  };

  const handleBlogCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setBlogCoverImage(result);
          showToast('Blog image uploaded from device!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      alert('Please enter a blog title.');
      return;
    }
    if (!blogLinkedinUrl.trim()) {
      alert('Please provide the LinkedIn redirection URL.');
      return;
    }

    const newOrUpdatedBlog: BlogPost = {
      id: editingBlogId || `blog-${Date.now()}`,
      title: blogTitle.trim(),
      category: blogCategory,
      summary: blogSummary.trim() || blogTitle,
      coverImage: blogCoverImage.trim() || 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1200&auto=format&fit=crop',
      linkedinUrl: blogLinkedinUrl.trim(),
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: blogReadTime.trim() || '3 min read',
      author: 'Social Entities Team',
      isPublished: blogIsPublished,
    };

    const res = saveBlog(newOrUpdatedBlog);
    if (!res.success) {
      alert(res.message);
      return;
    }

    setBlogs(getStoredBlogs());
    setIsEditingBlog(false);
    showToast(editingBlogId ? 'Blog card updated!' : 'New LinkedIn blog card published!');
  };

  const handleDeleteBlog = (id: string, titleStr: string) => {
    if (window.confirm(`Permanently delete blog "${titleStr}"? This will remove it completely and it will not stay in your code base.`)) {
      deleteBlog(id);
      setBlogs(getStoredBlogs());
      if (isEditingBlog && editingBlogId === id) {
        setIsEditingBlog(false);
      }
      showToast('Blog card permanently deleted.');
    }
  };

  const handleToggleBlogPublish = (id: string) => {
    toggleBlogPublishStatus(id);
    setBlogs(getStoredBlogs());
    showToast('Blog status updated.');
  };

  const handleClearAllBlogs = () => {
    if (window.confirm('Permanently clear all blogs and reset to scratch (0 blogs)? Nothing will stay in your code base.')) {
      clearAllBlogs();
      setBlogs([]);
      if (isEditingBlog) {
        setIsEditingBlog(false);
      }
      showToast('All blogs permanently cleared.');
    }
  };

  const handleDownloadZipFile = async () => {
    try {
      setIsDownloadingZip(true);
      showToast('Preparing full project ZIP archive...');
      const response = await fetch('/socialentities-website.zip', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const blob = await response.blob();
      if (blob.size < 5000) {
        throw new Error('Downloaded archive was incomplete. Re-attempting direct stream...');
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'socialentities-website.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      showToast(`ZIP successfully downloaded (${(blob.size / (1024 * 1024)).toFixed(1)} MB)!`);
    } catch (err) {
      console.error('Download error:', err);
      window.location.href = '/socialentities-website.zip';
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // ==========================================
  // CASE STUDY HANDLERS
  // ==========================================
  const handleStartCreateCase = () => {
    if (caseStudies.length >= MAX_CASE_STUDIES) {
      alert(`Maximum limit of ${MAX_CASE_STUDIES} case studies reached.`);
      return;
    }
    setEditingCaseId(null);
    setCaseTitle('');
    setCaseSlug('');
    setCaseClient('');
    setCaseCategory(CATEGORIES[0]);
    setCaseIndustry('');
    setCaseSummary('');
    setCaseCoverImage(PRESET_COVERS[0].url);
    setCaseIsPublished(true);
    setCaseContentHtml(`
      <h2 style="color: #0F1A34; font-size: 24px; font-weight: 800; margin-bottom: 12px;">Executive Overview</h2>
      <p style="font-size: 16px; line-height: 1.7; color: #44403C; margin-bottom: 20px;">
        Write your client growth story, objectives, strategy, and verified outcomes here.
      </p>
    `);
    setCaseMetrics([
      { label: 'ROAS', value: '+350%' },
      { label: 'Revenue Growth', value: '4.8X' },
    ]);
    setCaseActiveTab('editor');
    setIsEditingCase(true);
  };

  const handleStartEditCase = (study: CaseStudy) => {
    setEditingCaseId(study.id);
    setCaseTitle(study.title);
    setCaseSlug(study.slug);
    setCaseClient(study.client);
    setCaseCategory(study.category || CATEGORIES[0]);
    setCaseIndustry(study.industry || '');
    setCaseSummary(study.summary || '');
    setCaseCoverImage(study.coverImage || PRESET_COVERS[0].url);
    setCaseIsPublished(study.isPublished);
    setCaseContentHtml(study.contentHtml || '');
    setCaseMetrics(study.metrics && study.metrics.length > 0 ? study.metrics : [{ label: 'Metric', value: 'Result' }]);
    setCaseActiveTab('editor');
    setIsEditingCase(true);
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTitle.trim()) {
      alert('Please enter a title.');
      return;
    }

    const cleanSlug = caseSlug.trim() || caseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newOrUpdatedStudy: CaseStudy = {
      id: editingCaseId || `cs-${Date.now()}`,
      title: caseTitle.trim(),
      slug: cleanSlug,
      client: caseClient.trim() || 'Client',
      category: caseCategory,
      industry: caseIndustry.trim() || 'Global Enterprise',
      summary: caseSummary.trim() || caseTitle,
      coverImage: caseCoverImage.trim() || PRESET_COVERS[0].url,
      metrics: caseMetrics.filter((m) => m.label && m.value),
      contentHtml: caseContentHtml,
      isPublished: caseIsPublished,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      author: 'Social Entities Team',
    };

    const res = saveCaseStudy(newOrUpdatedStudy);
    if (!res.success) {
      alert(res.message);
      return;
    }

    setCaseStudies(getStoredCaseStudies());
    setIsEditingCase(false);
    showToast(editingCaseId ? 'Case study updated!' : 'Case study published!');
  };

  const handleDeleteCaseStudy = (id: string, titleStr: string) => {
    if (window.confirm(`Permanently delete case study "${titleStr}"? This cannot be undone.`)) {
      deleteCaseStudy(id);
      setCaseStudies(getStoredCaseStudies());
      if (isEditingCase && editingCaseId === id) {
        setIsEditingCase(false);
      }
      showToast('Case study permanently deleted.');
    }
  };

  const handleClearAllCaseStudies = () => {
    if (window.confirm('Permanently delete all case studies and reset to 0 from scratch?')) {
      clearAllCaseStudies();
      setCaseStudies([]);
      if (isEditingCase) {
        setIsEditingCase(false);
      }
      showToast('All case studies permanently cleared.');
    }
  };

  // 1. Render Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center bg-stone-100/80 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/90">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#5B6A50]/10 rounded-2xl flex items-center justify-center text-[#5B6A50] shadow-2xs">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 justify-center w-full mb-2 text-xs font-bold uppercase tracking-wider text-[#5B6A50]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Management</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#0F1A34] mb-2 tracking-tight">
            Agency CRM & Content Portal
          </h1>
          <p className="text-center text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed">
            Manage your website Case Studies and LinkedIn Blog cards.
          </p>

          {loginError && (
            <div className="bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl mb-5 border border-red-200 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B6A50]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B6A50]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5B6A50] hover:bg-[#4d5c43] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm active:scale-98 mt-2 cursor-pointer"
            >
              Sign In to CRM Portal
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span>Access: <strong className="text-stone-600">admin</strong> / <strong className="text-stone-600">admin</strong></span>
            <Link to="/" className="hover:text-[#5B6A50] font-semibold transition-colors">
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Render Main Admin Dashboard
  return (
    <main className="min-h-screen bg-stone-50 font-sans pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#0F1A34] text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#5B6A50]" />
          <span className="text-xs sm:text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#5B6A50] rounded-xl flex items-center justify-center text-white font-black text-base shadow-xs">
              SE
            </div>
            <div>
              <h2 className="text-base font-black text-[#0F1A34] leading-tight">
                Social Entities CRM Studio
              </h2>
              <span className="text-[11px] font-semibold text-stone-500">
                Content Management Panel
              </span>
            </div>
          </div>

          {/* Switcher Tabs: Blogs vs Case Studies */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              type="button"
              onClick={() => {
                setActiveSection('blogs');
                setIsEditingBlog(false);
                setIsEditingCase(false);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'blogs'
                  ? 'bg-[#536245] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Blogs & Articles ({blogs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSection('cases');
                setIsEditingBlog(false);
                setIsEditingCase(false);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'cases'
                  ? 'bg-[#536245] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Case Studies ({caseStudies.length}/{MAX_CASE_STUDIES})</span>
            </button>
          </div>

          {/* Quick Links & Export & Sign Out */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadZipFile}
              disabled={isDownloadingZip}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#536245] bg-[#536245]/10 hover:bg-[#536245]/20 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-[#536245]/25 disabled:opacity-50"
              title="Download full project code and assets as a ZIP archive"
            >
              <Download className={`w-3.5 h-3.5 text-[#536245] ${isDownloadingZip ? 'animate-bounce' : ''}`} />
              <span>{isDownloadingZip ? 'Downloading...' : 'Download ZIP (10.5 MB)'}</span>
            </button>

            <Link
              to="/blogs"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#536245] bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Blogs</span>
            </Link>
            <Link
              to="/case-studies"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#536245] bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Cases</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8">
        {/* Project Export / Download Banner */}
        <div className="mb-8 bg-gradient-to-r from-[#536245]/15 via-white to-stone-50 border border-[#536245]/25 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#536245] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F1A34]">
                Export & Deploy Codebase
              </h3>
              <p className="text-xs text-stone-600">
                Download the complete codebase package (includes all code, React components, images, CRM storage, and configs).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleDownloadZipFile}
              disabled={isDownloadingZip}
              className="w-full md:w-auto bg-[#536245] hover:bg-[#435037] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${isDownloadingZip ? 'animate-spin' : ''}`} />
              <span>{isDownloadingZip ? 'Downloading...' : 'Download Full Codebase (.ZIP)'}</span>
            </button>
          </div>
        </div>
        {/* ========================================================= */}
        {/* SECTION 1: BLOGS CRM (Card Elements + Redirection) */}
        {/* ========================================================= */}
        {activeSection === 'blogs' && (
          <div>
            {isEditingBlog ? (
              /* Blog Card Form */
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200 max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingBlog(false)}
                      className="p-2 hover:bg-stone-100 rounded-full text-stone-500 hover:text-[#0F1A34]"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0F1A34]">
                        {editingBlogId ? 'Edit Blog Card' : 'Add New Blog Card'}
                      </h2>
                      <p className="text-xs text-stone-500">
                        Configure the card elements. Clicking on this card on your website will redirect readers to your LinkedIn post or article.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#536245]/10 text-[#536245] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>LinkedIn Redirect</span>
                  </div>
                </div>

                <form onSubmit={handleSaveBlog} className="space-y-6">
                  {/* Blog Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. 5 Ad Creative Frameworks That Scaled D2C Revenue by 340%"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#536245] font-semibold text-[#0F1A34]"
                    />
                  </div>

                  {/* LinkedIn Redirection URL */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#536245] mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.66 1.63 1.64 1.64 0 0 0 1.66 1.63 1.63 1.63 0 0 0 1.64-1.63c0-.9-.74-1.63-1.64-1.63Z" />
                      </svg>
                      <span>LinkedIn Redirection URL * (Destination when clicked)</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={blogLinkedinUrl}
                      onChange={(e) => setBlogLinkedinUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/posts/..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#536245] bg-white font-medium"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Paste the full URL to your LinkedIn post, carousel, or article.
                    </span>
                  </div>

                  {/* Category & Read Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Category / Topic *
                      </label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#536245] bg-white font-medium"
                      >
                        {BLOG_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Read Time Badge
                      </label>
                      <input
                        type="text"
                        value={blogReadTime}
                        onChange={(e) => setBlogReadTime(e.target.value)}
                        placeholder="e.g. 4 min read"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#536245]"
                      />
                    </div>
                  </div>

                  {/* Card Excerpt / Summary */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Card Summary / Excerpt *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      placeholder="A short punchy preview of what the LinkedIn article covers..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#536245] leading-relaxed"
                    />
                  </div>

                  {/* Card Cover Image */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#536245]" />
                      <span>Card Thumbnail Image (Device Upload or Image Link)</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-3 rounded-xl border border-stone-200">
                        <span className="text-xs font-bold text-stone-700 block mb-1">1. Upload from Computer:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBlogCoverUpload}
                          className="block w-full text-xs text-stone-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#536245]/10 file:text-[#536245] hover:file:bg-[#536245]/20 cursor-pointer"
                        />
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-stone-200">
                        <span className="text-xs font-bold text-stone-700 block mb-1">2. Or Paste Image URL:</span>
                        <input
                          type="url"
                          value={blogCoverImage.startsWith('data:') ? '' : blogCoverImage}
                          onChange={(e) => setBlogCoverImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#536245]"
                        />
                      </div>
                    </div>

                    {blogCoverImage && (
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-stone-400">Card Preview:</span>
                        <img
                          src={blogCoverImage}
                          alt="Preview"
                          className="w-16 h-10 rounded-lg object-cover border border-stone-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Publishing Status & Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-stone-200 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={blogIsPublished}
                          onChange={(e) => setBlogIsPublished(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#536245]"></div>
                      </label>
                      <span className="text-xs font-bold text-stone-700">
                        {blogIsPublished ? 'Published (Live on Website)' : 'Draft (Hidden)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {editingBlogId && (
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(editingBlogId, blogTitle)}
                          className="px-4 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5 transition-colors cursor-pointer mr-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Blog</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsEditingBlog(false)}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#536245] hover:bg-[#445138] text-white px-7 py-3 rounded-xl font-bold text-xs tracking-wider inline-flex items-center gap-2 shadow-sm uppercase cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingBlogId ? 'Save Blog Card' : 'Publish Blog Card'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Blogs List / Dashboard */
              <div className="space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Blog Cards</span>
                      <Share2 className="w-4 h-4 text-[#536245]" />
                    </div>
                    <span className="text-3xl font-black text-[#0F1A34]">{blogs.length}</span>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Live on /blogs</span>
                      <CheckCircle2 className="w-4 h-4 text-[#536245]" />
                    </div>
                    <span className="text-3xl font-black text-[#536245]">
                      {blogs.filter((b) => b.isPublished).length}
                    </span>
                  </div>

                  <div className="bg-[#536245] text-white p-6 rounded-2xl shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">LinkedIn Redirection</span>
                      <span className="text-sm font-bold">Fast Card Builder</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartCreateBlog}
                      className="bg-white text-[#536245] hover:bg-stone-100 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Blog</span>
                    </button>
                  </div>
                </div>

                {/* Search & Actions */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 flex items-center justify-between flex-wrap gap-4 shadow-2xs">
                  <div className="relative flex-1 min-w-[260px]">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={blogSearchQuery}
                      onChange={(e) => setBlogSearchQuery(e.target.value)}
                      placeholder="Search blogs by title or summary..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#536245]"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleClearAllBlogs}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-stone-200"
                    >
                      Clear All (Scratch)
                    </button>
                    <button
                      type="button"
                      onClick={handleStartCreateBlog}
                      className="bg-[#536245] hover:bg-[#445138] text-white px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Blog Card</span>
                    </button>
                  </div>
                </div>

                {/* Blogs Cards Table */}
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-stone-50 text-stone-600 text-xs uppercase font-bold tracking-wider border-b border-stone-200">
                        <tr>
                          <th className="py-4 px-6">Blog Card</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">LinkedIn Destination URL</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {blogs.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-14 text-center text-stone-500 text-sm">
                              <div className="max-w-sm mx-auto">
                                <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                                <p className="font-bold text-[#0F1A34] text-base mb-1">No LinkedIn Blogs Added Yet</p>
                                <p className="text-xs text-stone-400 mb-4">
                                  Click "Add Blog Card" to upload a title, cover, excerpt, and your LinkedIn post URL.
                                </p>
                                <button
                                  type="button"
                                  onClick={handleStartCreateBlog}
                                  className="bg-[#536245] hover:bg-[#445138] text-white px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-xs cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add First Blog Card</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          blogs
                            .filter((b) =>
                              b.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                              b.summary.toLowerCase().includes(blogSearchQuery.toLowerCase())
                            )
                            .map((b) => (
                              <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3.5">
                                    <img
                                      src={b.coverImage}
                                      alt={b.title}
                                      className="w-14 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                                    />
                                    <div>
                                      <h4 className="font-bold text-[#0F1A34] text-sm hover:text-[#536245]">
                                        {b.title}
                                      </h4>
                                      <span className="text-xs text-stone-400 line-clamp-1">{b.summary}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="inline-block bg-[#536245]/10 text-[#536245] text-xs font-bold px-2.5 py-1 rounded-full">
                                    {b.category}
                                  </span>
                                </td>
                                <td className="py-4 px-6">
                                  <a
                                    href={b.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#536245] hover:underline font-mono inline-flex items-center gap-1 max-w-[200px] truncate"
                                    title={b.linkedinUrl}
                                  >
                                    <span className="truncate">{b.linkedinUrl}</span>
                                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                                  </a>
                                </td>
                                <td className="py-4 px-6">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleBlogPublish(b.id)}
                                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                                      b.isPublished
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                                    }`}
                                  >
                                    {b.isPublished ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                    <span>{b.isPublished ? 'Published' : 'Draft'}</span>
                                  </button>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <a
                                      href={b.linkedinUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Test LinkedIn Link"
                                      className="p-2 hover:bg-stone-100 rounded-lg text-stone-600 hover:text-[#536245]"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditBlog(b)}
                                      title="Edit Card"
                                      className="p-2 hover:bg-[#536245]/10 rounded-lg text-[#536245] cursor-pointer"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteBlog(b.id, b.title)}
                                      title="Delete Card"
                                      className="p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-700 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: CASE STUDIES CRM */}
        {/* ========================================================= */}
        {activeSection === 'cases' && (
          <div>
            {isEditingCase ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingCase(false)}
                      className="p-2 hover:bg-stone-100 rounded-full text-stone-500 hover:text-[#0F1A34]"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0F1A34]">
                        {editingCaseId ? 'Edit Case Study' : `Create Case Study (${caseStudies.length + 1}/${MAX_CASE_STUDIES})`}
                      </h2>
                      <p className="text-xs text-stone-500">
                        Author long-form case studies with the Gmail rich editor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCaseActiveTab('editor')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                        caseActiveTab === 'editor' ? 'bg-white text-[#0F1A34] shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseActiveTab('preview')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                        caseActiveTab === 'preview' ? 'bg-white text-[#0F1A34] shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {caseActiveTab === 'editor' ? (
                  <form onSubmit={handleSaveCase} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={caseTitle}
                          onChange={(e) => setCaseTitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B6A50]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={caseClient}
                          onChange={(e) => setCaseClient(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B6A50]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Story (Gmail Rich Editor)
                      </label>
                      <GmailRichEditor
                        value={caseContentHtml}
                        onChange={(html) => setCaseContentHtml(html)}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-stone-200 flex-wrap gap-4">
                      {editingCaseId ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteCaseStudy(editingCaseId, caseTitle)}
                          className="px-4 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5 transition-colors cursor-pointer mr-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Case Study</span>
                        </button>
                      ) : <div />}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingCase(false)}
                          className="px-5 py-3 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#5B6A50] hover:bg-[#4d5c43] text-white px-7 py-3 rounded-xl font-bold text-xs tracking-wider inline-flex items-center gap-2 uppercase shadow-sm cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Case Study</span>
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div
                    className="prose prose-stone max-w-none text-stone-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: caseContentHtml }}
                  />
                )}
              </div>
            ) : (
              /* Case Studies Dashboard */
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Case Studies Quota
                    </span>
                    <span className="text-3xl font-black text-[#0F1A34]">
                      {caseStudies.length} / {MAX_CASE_STUDIES}
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Published
                    </span>
                    <span className="text-3xl font-black text-[#5B6A50]">
                      {caseStudies.filter((c) => c.isPublished).length}
                    </span>
                  </div>
                  <div className="bg-[#5B6A50] text-white p-6 rounded-2xl shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">Upload Slot</span>
                      <span className="text-sm font-bold">
                        {caseStudies.length >= MAX_CASE_STUDIES ? 'Quota Full (6/6)' : `${MAX_CASE_STUDIES - caseStudies.length} Left`}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={caseStudies.length >= MAX_CASE_STUDIES}
                      onClick={handleStartCreateCase}
                      className="bg-white text-[#5B6A50] hover:bg-stone-100 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Case</span>
                    </button>
                  </div>
                </div>

                {/* Table of cases */}
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs p-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h3 className="font-bold text-[#0F1A34] text-base">All Case Studies ({caseStudies.length})</h3>
                    <div className="flex items-center gap-2">
                      {caseStudies.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAllCaseStudies}
                          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All Cases</span>
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={caseStudies.length >= MAX_CASE_STUDIES}
                        onClick={handleStartCreateCase}
                        className="bg-[#5B6A50] hover:bg-[#4d5c43] text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Case Study</span>
                      </button>
                    </div>
                  </div>

                  {caseStudies.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 text-xs">
                      No case studies yet. Started clean from scratch!
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {caseStudies.map((c) => (
                        <div key={c.id} className="py-3 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-[#0F1A34]">{c.title}</h4>
                            <span className="text-xs text-stone-400">{c.client} • {c.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEditCase(c)}
                              className="p-1.5 hover:bg-stone-100 rounded text-[#5B6A50] cursor-pointer"
                              title="Edit Case Study"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCaseStudy(c.id, c.title)}
                              className="p-1.5 hover:bg-red-50 rounded text-red-500 hover:text-red-700 cursor-pointer"
                              title="Delete Case Study"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
