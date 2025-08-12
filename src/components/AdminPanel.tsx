import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import {
  useGetAboutQuery,
  useGetSkillsQuery,
  useGetProjectsQuery,
  useHealthCheckQuery,
} from '../services/portfolioApi';

export const AdminPanel = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, isLoading, signOut, renderSignInButton } = useGoogleAuth();
  const signInButtonRef = useRef<HTMLDivElement>(null);
  
  // API Health Check
  const { data: healthData, error: healthError } = useHealthCheckQuery();
  
  // Data queries (only when authenticated)
  const { data: aboutData, error: aboutError } = useGetAboutQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: skillsData, error: skillsError } = useGetSkillsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: projectsData, error: projectsError } = useGetProjectsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated && signInButtonRef.current) {
      renderSignInButton(signInButtonRef.current);
    }
  }, [isAuthenticated, renderSignInButton]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to manage your portfolio content
              </p>
            </div>

            <div className="space-y-6">
              {/* API Health Status */}
              <div className="text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">API Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    healthData ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                               : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {healthData ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                {healthError && (
                  <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    Error: Unable to connect to API backend
                  </div>
                )}
              </div>

              {/* Google Sign In Button */}
              <div className="flex justify-center">
                <div ref={signInButtonRef}></div>
              </div>

              <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
                💡 <strong>Note:</strong> Google OAuth is configured but requires valid GOOGLE_CLIENT_ID in environment variables
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('admin.dashboard')}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.name}
                </span>
              </div>
              
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container-responsive py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">API Status</h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-2 ${healthData ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <div className={`w-3 h-3 rounded-full ${healthData ? 'bg-green-500' : 'bg-red-500'}`}></div>
                Backend API: {healthData ? 'Connected' : 'Disconnected'}
              </div>
              {healthData && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last check: {new Date(healthData.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* About Data Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">About Data</h3>
            {aboutError ? (
              <div className="text-red-600 dark:text-red-400 text-sm">
                Error loading about data
              </div>
            ) : aboutData ? (
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {aboutData.name}</div>
                <div><strong>Profession:</strong> {aboutData.profession}</div>
                <div><strong>Email:</strong> {aboutData.email}</div>
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                No about data available
              </div>
            )}
          </div>

          {/* Skills Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            {skillsError ? (
              <div className="text-red-600 dark:text-red-400 text-sm">
                Error loading skills
              </div>
            ) : skillsData ? (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {skillsData.length} skills loaded
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                No skills data available
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Projects ({projectsData?.length || 0})</h3>
            
            {projectsError ? (
              <div className="text-red-600 dark:text-red-400 text-sm">
                Error loading projects
              </div>
            ) : projectsData && projectsData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectsData.map((project) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-500">+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" 
                           className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                          GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                           className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                No projects data available
              </div>
            )}
          </div>
        </div>

        {/* API Integration Notice */}
        <div className="mt-8">
          <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            💡 <strong>Integration Status:</strong> This admin panel is connected to RTK Query and ready to integrate with your backend API at {process.env.VITE_API_BASE_URL || 'API_BASE_URL not configured'}. All CRUD operations are implemented and waiting for API endpoints.
          </div>
        </div>
      </main>
    </div>
  );
};