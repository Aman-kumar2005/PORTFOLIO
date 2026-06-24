import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillSection';
import ProjectsSection from '../components/sections/ProjectSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ContactSection from '../components/sections/ContactSection';
import api from '../api/client';
import type { Profile, Project } from '../types/index';

const HomePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    api
      .get('/profile')
      .then((res) => setProfile(res.data.data))
      .catch(() => setProfile(null));

    api
      .get('/projects')
      .then((res) => setProjects(res.data.data))
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection />
        <ProjectsSection projects={projects} loading={loadingProjects} />
        <ExperienceSection profile={profile} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
