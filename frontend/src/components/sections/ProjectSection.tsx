import type { Project } from '../../types/index';
import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
  loading: boolean;
}

const ProjectsSection = ({ projects, loading }: Props) => {
  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">A selection of things I have built recently</p>

      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects yet. Check back soon!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
