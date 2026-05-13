import React, { useState, useEffect, useCallback } from 'react';
import { 
  Mail, Download, ExternalLink, Code2, Menu, X, 
  Terminal, Search, Smartphone, Cloud, Briefcase, Rocket, Brain, 
  ShoppingBag, Sparkles, ChevronRight, Zap, Star, Phone
} from 'lucide-react';

// Custom SVG for GitHub since Lucide removed brand icons
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

// Custom SVG for LinkedIn
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const emailAddress = "faizan.230101052@iiitbh.ac.in";
  const phoneNumber = "9792565855";
  const resumeLink = "https://drive.google.com/file/d/1HdZsd8ebIDszYpPOYZlF4RUb4NV3YzSg/view?usp=sharing";

  // 1. Handle scroll for navbar blur effect (Optimized)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    // passive: true makes scrolling much smoother by telling the browser it won't be interrupted
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Track active section for navigation highlight (Optimized with IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by how much of the section is visible and grab the most prominent one
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    }, { threshold: [0.2, 0.5, 0.8] }); // Check at 20%, 50%, and 80% visibility

    const sections = document.querySelectorAll('section[id], footer[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // 3. Global Scroll Reveal Animation Hook (Optimized to unobserve after reveal)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          // Free up browser CPU by completely unobserving the element once it has animated in
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projectFilter]); 

  // Global Cmd+K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isCmdKOpen) setIsCmdKOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCmdKOpen]);

  // Lock body scroll when mobile menu or Cmd+K is open
  useEffect(() => {
    if (mobileMenuOpen || isCmdKOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen, isCmdKOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setIsCmdKOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(emailAddress);
      showToast('✓ Email copied to clipboard');
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = emailAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast('✓ Email copied to clipboard');
    }
  };

  const navLinks = [
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Engine Room', id: 'engine-room' },
    { name: 'Contact', id: 'contact' },
  ];

  const projectsData = [
    {
      id: 'prodloo',
      title: 'Prodloo',
      category: 'Mobile Architecture',
      tags: ['Flutter', 'Firebase', 'Analytics'],
      icon: <Rocket className="w-6 h-6 text-fuchsia-400" />,
      description: 'Built and launched a production productivity app on Google Play. Designed a premium dark theme UI focused on long-term usability, custom daily reset architectures, and integrated real-time activity graphs for grounding feedback.',
      link: 'https://play.google.com/store/apps/details?id=com.prodloo.app'
    },
    {
      id: 'ai-platform',
      title: 'AI Training & Placement Platform',
      category: 'Applied AI',
      tags: ['Next.js', 'Gemini API', 'Tailwind'],
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      description: 'Hackathon project building a comprehensive campus platform. Integrated generative AI for intelligent opportunity discovery and automated mock interview workflows.',
      link: 'https://github.com/Faizan-Khan0007/aii-mock-interview'
    },
    {
      id: 'amazin-app',
      title: 'Amazin App',
      category: 'Cloud Backends',
      tags: ['Node.js', 'Express', 'MongoDB', 'Flutter'],
      icon: <ShoppingBag className="w-6 h-6 text-indigo-400" />,
      description: 'Full-stack e-commerce architecture featuring secure RESTful APIs, JWT authentication, separate admin workflows, and optimized cloud image delivery.',
      link: 'https://github.com/Faizan-Khan0007/Amazin_App'
    }
  ];

  const filterTabs = ['All', 'Mobile Architecture', 'Cloud Backends', 'Applied AI'];
  const filteredProjects = projectFilter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === projectFilter);

  return (
    <div className="min-h-screen bg-[#07050f] text-slate-50 font-sans selection:bg-purple-500/30 selection:text-purple-100 scroll-smooth relative overflow-x-hidden">
      
      {/* Premium Deep Space Background Grid & Glows */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8a2be208_1px,transparent_1px),linear-gradient(to_bottom,#8a2be208_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-purple-500/10 border border-purple-500/30 backdrop-blur-md text-purple-50 px-5 py-3 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center space-x-2 text-sm font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>{toastMessage}</span>
        </div>
      </div>

      {/* Cmd+K Modal */}
      {isCmdKOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <div 
            className="absolute inset-0 bg-[#07050f]/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCmdKOpen(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-[#0e0a1a] border border-purple-500/20 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center px-4 py-4 border-b border-purple-500/10 text-slate-400">
              <Search className="w-5 h-5 mr-3 text-purple-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Type a command or search..." 
                className="w-full bg-transparent border-none outline-none text-slate-100 placeholder-slate-500"
                readOnly
              />
              <div className="flex items-center text-xs bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded text-purple-300 ml-3">
                ESC
              </div>
            </div>
            <div className="p-2 overflow-y-auto max-h-[60vh] space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-purple-400/70 uppercase tracking-wider">Quick Actions</div>
              <button onClick={() => { setIsCmdKOpen(false); window.open(resumeLink, '_blank'); }} className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-purple-500/10 text-left transition-colors group">
                <Download className="w-4 h-4 mr-3 text-slate-400 group-hover:text-purple-400" />
                <span className="text-slate-300 group-hover:text-purple-100">Download Resume</span>
              </button>
              <button onClick={() => { setIsCmdKOpen(false); handleCopyEmail(); }} className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-purple-500/10 text-left transition-colors group">
                <Mail className="w-4 h-4 mr-3 text-slate-400 group-hover:text-purple-400" />
                <span className="text-slate-300 group-hover:text-purple-100">Copy Email Address</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#07050f]/70 backdrop-blur-xl border-purple-500/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 hover:opacity-80 transition-opacity relative z-50 flex items-center gap-2"
          >
            <Zap className="w-5 h-5 text-purple-500" />
            Faizan Khan
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id 
                    ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.4)]' 
                    : 'text-slate-400 hover:text-purple-300'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {/* Cmd+K Trigger */}
            <button 
              onClick={() => setIsCmdKOpen(true)}
              className="flex items-center space-x-2 text-xs font-medium text-purple-300/70 bg-purple-500/5 border border-purple-500/20 px-3 py-1.5 rounded-md hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-300"
            >
              <span>Search...</span>
              <kbd className="hidden sm:inline-block font-sans bg-purple-500/20 px-1.5 py-0.5 rounded text-[10px] text-purple-300 border border-purple-500/20">
                <span className="mr-0.5">⌘</span>K
              </kbd>
            </button>

            <a 
              href={resumeLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Toggles */}
          <div className="flex md:hidden items-center space-x-4 relative z-50">
            <button 
              onClick={() => setIsCmdKOpen(true)}
              className="p-2 text-purple-400 hover:text-purple-200 bg-purple-500/10 rounded-lg border border-purple-500/20"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-purple-400 hover:text-purple-200 bg-purple-500/10 rounded-lg border border-purple-500/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-Screen Frosted Mobile Menu */}
        <div className={`fixed inset-0 bg-[#07050f]/95 backdrop-blur-2xl z-40 transition-all duration-300 md:hidden flex flex-col justify-center items-center space-y-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`text-2xl font-semibold transition-colors tracking-tight ${
                activeSection === link.id ? 'text-fuchsia-400' : 'text-slate-300 hover:text-purple-400'
              }`}
            >
              {link.name}
            </button>
          ))}
          <a 
            href={resumeLink}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 text-base font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 mt-8"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-24 space-y-24 md:space-y-32">
        
        {/* Hero Section */}
        <section className="pt-6 md:pt-10 pb-8 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-10 min-h-[80vh] md:min-h-[70vh] relative reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
          
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

          {/* Left Text Content */}
          <div className="space-y-6 max-w-2xl relative z-10 flex-1 w-full text-center md:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
              Faizan Khan <span className="text-purple-500/50 hidden md:inline">—</span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 animate-gradient-x mt-2 inline-block pb-2">
                Mobile & Full-Stack Engineer
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto md:mx-0">
              Specializing in Flutter, cloud-native backends, and building clean, user-centric software architectures.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-slate-100 text-[#07050f] px-6 py-3 rounded-xl font-semibold hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center gap-2"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border border-purple-500/30 bg-purple-500/5 text-purple-100 px-6 py-3 rounded-xl font-medium hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Me
              </button>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-5 pt-4 text-slate-400">
              {[
                { icon: GithubIcon, label: "GitHub", link: "https://github.com/Faizan-Khan0007" },
                { icon: LinkedinIcon, label: "LinkedIn", link: "https://www.linkedin.com/in/faizanxp/" },
                { icon: Code2, label: "LeetCode", link: "https://leetcode.com/u/Fkwarrior/" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 p-3 hover:bg-purple-500/10 rounded-xl border border-transparent hover:border-purple-500/20" 
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Premium Image Container */}
          <div className="relative z-10 w-full max-w-[260px] sm:max-w-[300px] md:max-w-[380px] flex-1 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 to-fuchsia-600/40 border border-purple-500/30 rounded-3xl rotate-3 group-hover:rotate-6 transition-all duration-500 ease-out blur-[2px] group-hover:blur-[8px]"></div>
            <div className="absolute inset-0 bg-[#0c0a1a]/80 border border-purple-500/40 rounded-3xl -rotate-2 group-hover:-rotate-4 transition-all duration-500 ease-out scale-[0.98]"></div>
            
            {/* Main Image Card */}
            <div className="relative bg-[#07050f] border border-purple-500/50 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl group-hover:border-purple-400 transition-colors duration-500">
              {/* Uses the transparent PNG from the public folder */}
              <img 
                src="/2.JPG" 
                alt="Faizan Khan" 
                className="w-full h-full object-cover object-top hover:mix-blend-normal transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(7,5,15,0.9)] pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
            </div>
          </div>
        </section>

        {/* Featured Projects with Filters */}
        <section id="projects" className="scroll-mt-32 space-y-10 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-fuchsia-400" /> Featured Projects
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 mt-4 rounded-full"></div>
            </div>
            
            {/* Dynamic Tab Filters */}
            <div className="flex overflow-x-auto hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0">
              <div className="flex items-center space-x-2 bg-[#0e0a1a] p-1.5 rounded-xl border border-purple-500/20 backdrop-blur-md">
                {filterTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setProjectFilter(tab)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      projectFilter === tab 
                        ? 'bg-purple-500/20 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/30' 
                        : 'text-slate-400 hover:text-purple-200 hover:bg-purple-500/10 border border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 relative min-h-[400px]">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="group relative bg-[#0e0a1a]/60 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-8 hover:border-purple-500/40 hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)] hover:-translate-y-1 hover:bg-[#120d23]/80 transition-all duration-500 reveal opacity-0 translate-y-8"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-5 max-w-3xl">
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                        {project.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Link to ${project.title}`}>
                          <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-fuchsia-400 transition-colors cursor-pointer" />
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-purple-500/10 border border-purple-500/20 text-purple-200 px-3 py-1 rounded-md text-xs font-semibold tracking-wide shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-400 leading-relaxed text-base pt-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-32 space-y-12 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-purple-400" /> Experience
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 mt-4 rounded-full"></div>
          </div>

          <div className="relative pl-6 md:pl-8 border-l border-purple-500/30 space-y-12 ml-4">
            <div className="relative group">
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-4 h-4 bg-purple-500 rounded-full border-4 border-[#07050f] group-hover:bg-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(232,121,249,0.8)] transition-all duration-300"></div>
              
              <div className="space-y-4 bg-[#0e0a1a]/50 p-6 md:p-8 rounded-2xl border border-purple-500/10 group-hover:border-purple-500/30 transition-colors duration-300 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <h3 className="text-lg md:text-xl font-bold text-slate-100">Flutter Developer Intern <span className="text-purple-400">@ Thyright Innovations</span></h3>
                  <span className="text-sm font-semibold text-fuchsia-300 bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-500/20 w-fit shadow-inner">Aug 2025 – Nov 2025</span>
                </div>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-4xl">
                  Contributed to Thyverse, a production healthcare app. Optimized key features to improve workflow efficiency by <strong className="text-purple-300 font-semibold">15%</strong> and implemented secure REST API integrations connecting the Flutter frontend with AWS backend services within an agile team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Engine Room (Skills) */}
        <section id="engine-room" className="scroll-mt-32 space-y-12 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
              <Terminal className="w-6 h-6 text-indigo-400" /> The Engine Room
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0e0a1a]/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 space-y-10 hover:border-purple-500/50 hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['C++', 'Dart', 'JavaScript', 'SQL'].map(skill => (
                    <span key={skill} className="bg-[#07050f] border border-purple-500/30 text-slate-200 px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-500/20 hover:border-purple-400 transition-colors cursor-default shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <Cloud className="w-4 h-4" /> Frameworks & Cloud
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Flutter', 'Node.js', 'Express.js', 'AWS', 'MongoDB', 'Firebase'].map(skill => (
                    <span key={skill} className="bg-[#07050f] border border-fuchsia-500/30 text-slate-200 px-5 py-2 rounded-xl text-sm font-medium hover:bg-fuchsia-500/20 hover:border-fuchsia-400 transition-colors cursor-default shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0e0a1a] to-[#160f2e] border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden group hover:border-fuchsia-500/50 hover:shadow-[0_0_50px_rgba(232,121,249,0.15)] transition-all duration-500">
              <div className="absolute -bottom-10 -right-10 text-purple-500/5 group-hover:text-purple-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                <Star className="w-64 h-64 fill-current" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-3">
                  <Brain className="w-7 h-7 text-fuchsia-400" /> Algorithmic Strength
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Solved <span className="text-white font-bold bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">500+ DSA problems</span> across platforms, including <span className="text-white font-bold bg-fuchsia-500/20 px-2 py-0.5 rounded border border-fuchsia-500/30">250+ LeetCode Medium/Hard</span>. 
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center gap-3 bg-[#07050f]/80 px-4 py-3 rounded-xl border border-indigo-500/30">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm md:text-base text-slate-200 font-medium">CodeChef Peak Global Rank: <strong className="text-indigo-400 text-lg ml-1">528</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Contact */}
      <footer id="contact" className="border-t border-purple-500/20 bg-[#07050f] pt-24 pb-12 mt-20 relative overflow-hidden reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-purple-600/10 rounded-[100%] blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight pb-2">Let's Build Together</h2>
          <p className="text-purple-200/70 text-base md:text-lg font-medium max-w-xl mx-auto">
            Currently available for 6-month and 1-year internship roles starting June or January.
          </p>
          
          <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 text-base md:text-lg w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
              Send Email
            </a>
            <a 
              href={`tel:+91${phoneNumber}`}
              className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 text-purple-100 px-8 py-4 rounded-xl font-bold hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 text-base md:text-lg w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              +91 {phoneNumber}
            </a>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Faizan Khan. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="https://github.com/Faizan-Khan0007" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors font-medium">GitHub</a>
              <a href="https://www.linkedin.com/in/faizanxp/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors font-medium">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;