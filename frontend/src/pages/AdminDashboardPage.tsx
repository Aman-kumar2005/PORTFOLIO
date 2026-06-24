import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiPlus, FiLogOut, FiMail } from 'react-icons/fi';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Project, ContactMessage } from '../types/index.ts';

const emptyProject = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  githubLink: '',
  liveLink: '',
  featured: false,
};

const AdminDashboardPage = () => {
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState<'projects' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);

  const loadProjects = () => {
    api.get('/projects').then((res) => setProjects(res.data.data));
  };

  const loadMessages = () => {
    api.get('/contact').then((res) => setMessages(res.data.data));
  };

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', {
        ...form,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      });
      toast.success('Project added');
      setForm(emptyProject);
      loadProjects();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    toast.success('Project deleted');
    loadProjects();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    toast.success('Message deleted');
    loadMessages();
  };

  const handleMarkRead = async (id: string) => {
    await api.patch(`/contact/${id}/read`);
    loadMessages();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Logged in as {admin?.email}</p>
        </div>
        <button onClick={logout} className="btn-secondary">
          <FiLogOut /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab('projects')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === 'projects' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab('messages')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === 'messages' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Messages ({messages.filter((m) => !m.isRead).length} unread)
          </button>
        </div>

        {tab === 'projects' && (
          <div className="space-y-8">
            <form onSubmit={handleAddProject} className="card p-6 grid sm:grid-cols-2 gap-4">
              <input
                name="title"
                required
                placeholder="Project title"
                value={form.title}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <input
                name="image"
                required
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <textarea
                name="description"
                required
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="sm:col-span-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <input
                name="technologies"
                required
                placeholder="Technologies (comma separated)"
                value={form.technologies}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <input
                name="githubLink"
                required
                placeholder="GitHub link"
                value={form.githubLink}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <input
                name="liveLink"
                placeholder="Live demo link (optional)"
                value={form.liveLink}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                Featured project
              </label>
              <button type="submit" disabled={loading} className="btn-primary sm:col-span-2 justify-center">
                <FiPlus /> Add Project
              </button>
            </form>

            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p._id} className="card p-4 flex gap-4">
                  <img src={p.image} alt={p.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                  </div>
                  <button onClick={() => handleDeleteProject(p._id)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
            {messages.map((m) => (
              <div
                key={m._id}
                className={`card p-5 flex justify-between gap-4 ${!m.isRead ? 'border-primary-400' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiMail className="text-primary-500" />
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-sm text-gray-500">{m.email}</span>
                    {!m.isRead && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{m.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!m.isRead && (
                    <button onClick={() => handleMarkRead(m._id)} className="text-xs btn-secondary py-1.5">
                      Mark read
                    </button>
                  )}
                  <button onClick={() => handleDeleteMessage(m._id)} className="text-red-500 hover:text-red-700 self-end">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
