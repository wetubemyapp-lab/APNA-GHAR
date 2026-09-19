import React from 'react';
import { Project } from '../types';
import { useApp } from '../context/AppContext';
import { CheckCircle, Building2, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = ''
}) => {
  const { setSelectedProject, setIsProjectModalOpen } = useApp();

  return (
    <div
      onClick={() => {
        setSelectedProject(project);
        setIsProjectModalOpen(true);
      }}
      className={`group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col ${className}`}
    >
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        {/* Top left builder name */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
            {project.builder}
          </span>
        </div>

        {/* Bottom indicators */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white">
          <span className="text-base font-extrabold drop-shadow-md">{project.priceRange}</span>
          <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            RERA Approved
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{project.locality}, {project.city}</p>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5">{project.highlight}</p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{project.configurations.slice(0, 3).join(', ')}</span>
          </div>
          <span className="text-[11px] font-extrabold text-indigo-600 flex items-center gap-0.5">
            <span>Brochure</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
