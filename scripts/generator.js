// GitHub Profile README Generator - Enhanced Edition
class ProfileGenerator {
    constructor() {
        try {
            this.currentTheme = 'classic';
            this.isDarkMode = false;
            this.profileImage = null;
            this.deferredPrompt = null;
            this.eventListeners = new Map(); // Track event listeners for cleanup
            
            this.initializeElements();
            this.bindEvents();
            this.loadUserPreferences();
            this.loadDefaultData();
            this.initializeIcons();
            this.setupThemeToggle();
            this.initializeGitHubStats();
            
            console.log('ProfileGenerator initialized successfully');
        } catch (error) {
            console.error('Failed to initialize ProfileGenerator:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    initializeElements() {
        try {
            this.form = document.getElementById('generatorForm');
            this.preview = document.getElementById('preview');
            this.copyBtn = document.getElementById('copyBtn');
            this.downloadBtn = document.getElementById('downloadBtn');
            this.themeSelect = document.getElementById('theme');
            this.darkModeToggle = document.getElementById('darkModeToggle');
            this.githubStatsToggle = document.getElementById('githubStatsToggle');
            this.advancedOptionsToggle = document.getElementById('advancedOptionsToggle');
            this.advancedOptions = document.getElementById('advancedOptions');
            
            // Validate critical elements exist
            if (!this.form || !this.preview) {
                throw new Error('Critical form elements not found');
            }
        } catch (error) {
            console.error('Failed to initialize elements:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    bindEvents() {
        try {
            if (!this.form) return;
            
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.form.addEventListener('input', () => this.debounce(this.updatePreview.bind(this), 300));
            
            if (this.themeSelect) {
                this.themeSelect.addEventListener('change', () => this.updatePreview());
            }
            
            if (this.copyBtn) {
                this.copyBtn.addEventListener('click', () => this.copyToClipboard());
            }
            
            if (this.downloadBtn) {
                this.downloadBtn.addEventListener('click', () => this.downloadREADME());
            }
            
            // Add form validation
            this.addFormValidation();
            
            // Add keyboard shortcuts
            this.addKeyboardShortcuts();
        } catch (error) {
            console.error('Failed to bind events:', error);
            this.showErrorMessage('Failed to setup event handlers.');
        }
    }

    addFormValidation() {
        try {
            const requiredFields = ['name', 'username'];
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.addEventListener('blur', () => this.validateField(field));
                    field.addEventListener('input', () => this.clearFieldError(field));
                }
            });
        } catch (error) {
            console.warn('Failed to add form validation:', error);
        }
    }

    validateField(field) {
        try {
            if (!field || !field.id) {
                console.warn('Invalid field for validation');
                return false;
            }
            
            const value = field.value?.trim() || '';
            const fieldId = field.id;
            
            if (fieldId === 'username' && value) {
                if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                    this.showFieldError(field, 'Username can only contain letters, numbers, and hyphens');
                    return false;
                }
            }
            
            if (fieldId === 'name' && !value) {
                this.showFieldError(field, 'Name is required');
                return false;
            }
            
            this.clearFieldError(field);
            return true;
        } catch (error) {
            console.error('Field validation failed:', error);
            return false;
        }
    }

    showFieldError(field, message) {
        try {
            if (!field || !field.parentNode) {
                console.warn('Invalid field for error display');
                return;
            }
            
            this.clearFieldError(field);
            field.classList.add('border-red-500');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            errorDiv.id = `${field.id}-error`;
            
            field.parentNode.appendChild(errorDiv);
        } catch (error) {
            console.error('Failed to show field error:', error);
        }
    }

    clearFieldError(field) {
        try {
            if (!field || !field.parentNode) {
                return;
            }
            
            field.classList.remove('border-red-500');
            const errorDiv = field.parentNode.querySelector(`#${field.id}-error`);
            if (errorDiv) {
                errorDiv.remove();
            }
        } catch (error) {
            console.warn('Failed to clear field error:', error);
        }
    }

    addKeyboardShortcuts() {
        try {
            document.addEventListener('keydown', (e) => {
                try {
                    // Ctrl/Cmd + Enter to generate
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        if (this.form) {
                            this.form.dispatchEvent(new Event('submit'));
                        }
                    }
                    
                    // Ctrl/Cmd + S to save
                    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                        e.preventDefault();
                        this.saveUserPreferences();
                    }
                    
                    // Ctrl/Cmd + D to toggle dark mode
                    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                        e.preventDefault();
                        this.toggleDarkMode();
                    }
                } catch (error) {
                    console.warn('Keyboard shortcut failed:', error);
                }
            });
        } catch (error) {
            console.warn('Failed to add keyboard shortcuts:', error);
        }
    }

    initializeIcons() {
        try {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            } else {
                console.log('Lucide icons not available');
            }
        } catch (error) {
            console.warn('Failed to initialize icons:', error);
        }
    }

    setupThemeToggle() {
        try {
            if (this.darkModeToggle) {
                this.darkModeToggle.addEventListener('change', () => {
                    try {
                        this.toggleDarkMode();
                    } catch (error) {
                        console.warn('Dark mode toggle failed:', error);
                    }
                });
            }
            
            // Setup advanced options toggle
            if (this.advancedOptionsToggle) {
                this.advancedOptionsToggle.addEventListener('click', () => {
                    try {
                        this.toggleAdvancedOptions();
                    } catch (error) {
                        console.warn('Advanced options toggle failed:', error);
                    }
                });
            }
            
            // Setup theme preview buttons
            this.setupThemePreviewButtons();
            
            // Setup mobile support
            this.setupMobileSupport();
            
            // Setup image upload
            this.setupImageUpload();
        } catch (error) {
            console.error('Failed to setup theme toggle:', error);
        }
    }
    
    setupThemePreviewButtons() {
        try {
            const themePreviewBtns = document.querySelectorAll('.theme-preview-btn');
            if (themePreviewBtns.length === 0) {
                console.warn('No theme preview buttons found');
                return;
            }
            
            themePreviewBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    try {
                        const theme = btn.dataset.theme;
                        if (theme && this.themeSelect) {
                            this.themeSelect.value = theme;
                            this.updatePreview();
                            
                            // Highlight active theme button
                            themePreviewBtns.forEach(b => b.classList.remove('bg-blue-100', 'dark:bg-blue-900/40', 'border-blue-300'));
                            btn.classList.add('bg-blue-100', 'dark:bg-blue-900/40', 'border-blue-300');
                        }
                    } catch (error) {
                        console.warn('Theme preview button click failed:', error);
                    }
                });
            });
            
            // Highlight initial theme
            if (this.themeSelect) {
                const initialTheme = this.themeSelect.value;
                const initialBtn = document.querySelector(`[data-theme="${initialTheme}"]`);
                if (initialBtn) {
                    initialBtn.classList.add('bg-blue-100', 'dark:bg-blue-900/40', 'border-blue-300');
                }
            }
        } catch (error) {
            console.warn('Failed to setup theme preview buttons:', error);
        }
    }
    
    toggleAdvancedOptions() {
        try {
            const advancedOptions = this.advancedOptions;
            const toggleIcon = this.advancedOptionsToggle?.querySelector('i');
            
            if (advancedOptions && toggleIcon) {
                if (advancedOptions.classList.contains('hidden')) {
                    advancedOptions.classList.remove('hidden');
                    toggleIcon.style.transform = 'rotate(180deg)';
                } else {
                    advancedOptions.classList.add('hidden');
                    toggleIcon.style.transform = 'rotate(0deg)';
                }
            }
        } catch (error) {
            console.warn('Failed to toggle advanced options:', error);
        }
    }

    toggleDarkMode() {
        try {
            this.isDarkMode = !this.isDarkMode;
            document.documentElement.classList.toggle('dark', this.isDarkMode);
            this.saveUserPreferences();
            
            if (this.darkModeToggle) {
                this.darkModeToggle.checked = this.isDarkMode;
            }
            
            // Update dark mode toggle visual state
            const toggleDot = this.darkModeToggle?.parentNode?.querySelector('.dot');
            if (toggleDot) {
                if (this.isDarkMode) {
                    toggleDot.style.transform = 'translateX(24px)';
                } else {
                    toggleDot.style.transform = 'translateX(0)';
                }
            }
        } catch (error) {
            console.error('Failed to toggle dark mode:', error);
            this.showMessage('❌ Failed to toggle dark mode', 'error');
        }
    }

    loadUserPreferences() {
        try {
            if (typeof localStorage === 'undefined') {
                console.warn('localStorage not available');
                return;
            }
            
            const saved = localStorage.getItem('github-readme-generator-preferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                this.isDarkMode = preferences.darkMode || false;
                this.currentTheme = preferences.theme || 'classic';
                
                if (this.isDarkMode) {
                    document.documentElement.classList.add('dark');
                }
                
                if (this.themeSelect) {
                    this.themeSelect.value = this.currentTheme;
                }
            }
        } catch (error) {
            console.warn('Failed to load user preferences:', error);
            // Reset to defaults on error
            this.isDarkMode = false;
            this.currentTheme = 'classic';
        }
    }

    saveUserPreferences() {
        try {
            const preferences = {
                darkMode: this.isDarkMode || false,
                theme: this.currentTheme || 'classic',
                timestamp: Date.now()
            };
            
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('github-readme-generator-preferences', JSON.stringify(preferences));
                this.showMessage('💾 Preferences saved!', 'success');
            } else {
                console.warn('localStorage not available');
            }
        } catch (error) {
            console.warn('Failed to save user preferences:', error);
            this.showMessage('⚠️ Failed to save preferences', 'error');
        }
    }

    loadDefaultData() {
        try {
            // Pre-fill with Colin's information
            const defaultData = {
                name: 'Colin',
                username: 'Colin869',
                tagline: 'Gamer/Developer | Japan/Canada',
                about: 'Passionate developer who loves gaming and creating useful tools. Based in Japan/Canada, always exploring new technologies and building cool projects.',
                skills: 'JavaScript, Python, Lua, HTML, CSS, Roblox Development, Wii U Reverse Engineering',
                projects: 'mh-frontier-wiiu-server - Monster Hunter Frontier G Server reverse engineering project\nColinTVii - Custom IPTV player\nVibe-tower-roblox - First Roblox game\nUmaTools - Web development tools',
                youtube: 'https://youtube.com/@ColinGamez',
                twitter: 'https://twitter.com/colinsanX',
                website: 'https://guns.lol/colin.jpn',
                location: 'Japan/Canada',
                company: 'Freelancer',
                blog: 'https://guns.lol/colin.jpn',
                githubStats: true,
                contributionGraph: true,
                languageStats: true,
                profileViews: true
            };

            Object.entries(defaultData).forEach(([key, value]) => {
                try {
                    const element = document.getElementById(key);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = value;
                        } else {
                            element.value = value;
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to set default value for ${key}:`, error);
                }
            });
            
            this.updatePreview();
        } catch (error) {
            console.error('Failed to load default data:', error);
        }
    }

    handleSubmit(e) {
        try {
            e.preventDefault();
            
            if (!this.form) {
                this.showMessage('❌ Form not available', 'error');
                return;
            }
            
            // Validate required fields
            const requiredFields = ['name', 'username'];
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                try {
                    const field = document.getElementById(fieldId);
                    if (field && !this.validateField(field)) {
                        isValid = false;
                    }
                } catch (error) {
                    console.warn(`Validation failed for ${fieldId}:`, error);
                    isValid = false;
                }
            });
            
            if (!isValid) {
                this.showMessage('❌ Please fix the errors above', 'error');
                return;
            }
            
            this.updatePreview();
            this.showSuccessMessage();
            this.saveUserPreferences();
        } catch (error) {
            console.error('Form submission failed:', error);
            this.showMessage('❌ Form submission failed', 'error');
        }
    }

    updatePreview() {
        try {
            if (!this.preview || !this.themeSelect) {
                console.warn('Preview elements not available');
                return;
            }
            
            const formData = this.getFormData();
            const theme = this.themeSelect.value;
            this.currentTheme = theme;
            
            const readmeContent = this.generateREADME(formData, theme);
            this.preview.innerHTML = this.formatPreview(readmeContent);
            this.updateAchievementProgress();
            
            // Update character count
            this.updateCharacterCount(readmeContent);
            
        } catch (error) {
            console.error('Error updating preview:', error);
            this.showMessage('❌ Error generating preview', 'error');
        }
    }

    getFormData() {
        try {
            const formData = {};
            const fields = [
                'name', 'username', 'tagline', 'about', 'skills', 'projects',
                'youtube', 'twitter', 'website', 'location', 'company', 'blog',
                'githubStats', 'contributionGraph', 'languageStats', 'profileViews'
            ];
            
            fields.forEach(field => {
                try {
                    const element = document.getElementById(field);
                    if (element) {
                        if (element.type === 'checkbox') {
                            formData[field] = element.checked;
                        } else {
                            formData[field] = element.value || '';
                        }
                    } else {
                        formData[field] = '';
                    }
                } catch (error) {
                    console.warn(`Failed to get form data for ${field}:`, error);
                    formData[field] = '';
                }
            });
            
            return formData;
        } catch (error) {
            console.error('Failed to get form data:', error);
            return {};
        }
    }

    generateREADME(data, theme) {
        try {
            if (!data || !theme) {
                console.warn('Missing data or theme for README generation');
                return '# Error: Missing data\n\nPlease fill in the required fields.';
            }
            
            const themes = {
                classic: this.generateClassicTheme.bind(this),
                dark: this.generateDarkTheme.bind(this),
                colorful: this.generateColorfulTheme.bind(this),
                minimal: this.generateMinimalTheme.bind(this),
                developer: this.generateDeveloperTheme.bind(this),
                professional: this.generateProfessionalTheme.bind(this),
                creative: this.generateCreativeTheme.bind(this),
                tech: this.generateTechTheme.bind(this)
            };

            const themeFunction = themes[theme];
            if (themeFunction) {
                return themeFunction(data);
            } else {
                console.warn(`Unknown theme: ${theme}, falling back to classic`);
                return themes.classic(data);
            }
        } catch (error) {
            console.error('README generation failed:', error);
            return '# Error: Failed to generate README\n\nPlease try again or refresh the page.';
        }
    }

    generateClassicTheme(data) {
        return `# 👋 Hi there, I'm ${data.name}!

${data.tagline ? `> ${data.tagline}` : ''}

${data.about ? `## About Me\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## 🛠️ Skills

${this.formatSkills(data.skills)}

## 🚀 Featured Projects

${this.formatProjects(data.projects)}

## 📍 Location & Work

${this.formatLocationAndWork(data)}

## 📱 Connect with Me

${this.formatSocialLinks(data)}

---

⭐ **Star this repository if you found it helpful!** ⭐`;
    }

    generateDarkTheme(data) {
        return `# 🌙 ${data.name}

${data.tagline ? `> ${data.tagline}` : ''}

${data.about ? `## About\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## 🛠️ Tech Stack

${this.formatSkills(data.skills)}

## 🚀 Projects

${this.formatProjects(data.projects)}

## 🔗 Links

${this.formatSocialLinks(data)}

---

*Dark theme by [${data.username}](https://github.com/${data.username})*`;
    }

    generateColorfulTheme(data) {
        return `# 🎨 ${data.name}

${data.tagline ? `> ${data.tagline}` : ''}

${data.about ? `## ✨ About\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## 🎯 Skills & Technologies

${this.formatSkills(data.skills)}

## 🌟 Featured Work

${this.formatProjects(data.projects)}

## 🌐 Social & Links

${this.formatSocialLinks(data)}

---

🎉 **Thanks for visiting!** 🎉`;
    }

    generateMinimalTheme(data) {
        return `# ${data.name}

${data.tagline ? `${data.tagline}\n` : ''}

${data.about ? `${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## Skills

${this.formatSkills(data.skills)}

## Projects

${this.formatProjects(data.projects)}

## Contact

${this.formatSocialLinks(data)}`;
    }

    generateDeveloperTheme(data) {
        return `# ${data.name}

\`\`\`
${data.tagline ? data.tagline : 'Developer'}
\`\`\`

${data.about ? `## About\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## Stack

\`\`\`
${this.formatSkillsForCode(data.skills)}
\`\`\`

## Projects

${this.formatProjects(data.projects)}

## Links

${this.formatSocialLinks(data)}

---

\`\`\`typescript
// Made with ❤️ by ${data.username}
\`\`\``;
    }

    generateProfessionalTheme(data) {
        return `# ${data.name}

${data.tagline ? `> ${data.tagline}` : ''}

${data.about ? `## Professional Summary\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## 🎯 Core Competencies

${this.formatSkills(data.skills)}

## 🚀 Key Projects

${this.formatProjects(data.projects)}

## 💼 Professional Experience

${this.formatLocationAndWork(data)}

## 🌐 Professional Network

${this.formatSocialLinks(data)}

---

*Professional profile maintained by [${data.username}](https://github.com/${data.username})*`;
    }

    generateTechTheme(data) {
        return `# 💻 ${data.name}

${data.tagline ? `> ${data.tagline}` : ''}

${data.about ? `## About\n\n${data.about}\n` : ''}

${this.generateGitHubStats(data)}

## 🛠️ Technology Stack

${this.formatSkills(data.skills)}

## 🔧 Technical Projects

${this.formatProjects(data.projects)}

## 🔗 Technical Resources

${this.formatSocialLinks(data)}

---

💻 **Building the future, one commit at a time** 💻`;
    }

    generateGitHubStats(data) {
        try {
            if (!data || !data.githubStats) return '';
            
            let stats = '\n## 📊 GitHub Statistics\n\n';
            
            if (data.contributionGraph && data.username) {
                const username = data.username.trim();
                if (username) {
                    stats += `![${username}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${encodeURIComponent(username)}&show_icons=true&theme=${this.isDarkMode ? 'dark' : 'default'})\n\n`;
                }
            }
            
            if (data.languageStats && data.username) {
                const username = data.username.trim();
                if (username) {
                    stats += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(username)}&layout=compact&theme=${this.isDarkMode ? 'dark' : 'default'})\n\n`;
                }
            }
            
            if (data.profileViews && data.username) {
                const username = data.username.trim();
                if (username) {
                    stats += `![Profile Views](https://komarev.com/ghpvc/?username=${encodeURIComponent(username)}&color=brightgreen)\n\n`;
                }
            }
            
            return stats;
        } catch (error) {
            console.warn('Failed to generate GitHub stats:', error);
            return '';
        }
    }

    formatSkills(skills) {
        try {
            if (!skills || typeof skills !== 'string') return '';
            const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
            return skillArray.map(skill => `- ${skill}`).join('\n');
        } catch (error) {
            console.warn('Failed to format skills:', error);
            return '';
        }
    }

    formatSkillsForCode(skills) {
        try {
            if (!skills || typeof skills !== 'string') return '';
            const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
            return skillArray.join(' | ');
        } catch (error) {
            console.warn('Failed to format skills for code:', error);
            return '';
        }
    }

    formatProjects(projects) {
        try {
            if (!projects || typeof projects !== 'string') return '';
            const projectArray = projects.split('\n').filter(p => p.trim());
            return projectArray.map(project => {
                try {
                    const [name, description] = project.split(' - ');
                    if (description) {
                        return `- **${name}** - ${description}`;
                    }
                    return `- ${name}`;
                } catch (error) {
                    console.warn('Failed to format project:', project, error);
                    return `- ${project}`;
                }
            }).join('\n');
        } catch (error) {
            console.warn('Failed to format projects:', error);
            return '';
        }
    }

    formatLocationAndWork(data) {
        try {
            if (!data || typeof data !== 'object') return '';
            
            const parts = [];
            if (data.location && typeof data.location === 'string') {
                parts.push(`📍 **Location:** ${data.location}`);
            }
            if (data.company && typeof data.company === 'string') {
                parts.push(`🏢 **Company:** ${data.company}`);
            }
            if (data.blog && typeof data.blog === 'string') {
                parts.push(`📝 **Blog:** [${data.blog}](${data.blog})`);
            }
            
            return parts.length > 0 ? parts.join(' | ') : '';
        } catch (error) {
            console.warn('Failed to format location and work:', error);
            return '';
        }
    }

    formatSocialLinks(data) {
        try {
            if (!data || typeof data !== 'object') {
                return `[GitHub](https://github.com/)`;
            }
            
            const links = [];
            if (data.youtube && typeof data.youtube === 'string') {
                links.push(`[YouTube](${data.youtube})`);
            }
            if (data.twitter && typeof data.twitter === 'string') {
                links.push(`[Twitter/X](${data.twitter})`);
            }
            if (data.website && typeof data.website === 'string') {
                links.push(`[Website](${data.website})`);
            }
            if (data.blog && typeof data.blog === 'string' && data.blog !== data.website) {
                links.push(`[Blog](${data.blog})`);
            }
            
            if (links.length > 0) {
                links.push(`[GitHub](https://github.com/${data.username || ''})`);
                return links.join(' | ');
            }
            return `[GitHub](https://github.com/${data.username || ''})`;
        } catch (error) {
            console.warn('Failed to format social links:', error);
            return `[GitHub](https://github.com/)`;
        }
    }

    formatPreview(content) {
        try {
            if (!content || typeof content !== 'string') {
                return '<p class="text-gray-500">No content to preview</p>';
            }
            
            // Enhanced markdown to HTML conversion
            return content
                .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">$1</h1>')
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
                .replace(/```(.*?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
                .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">$1</blockquote>')
                .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
                .replace(/\n/g, '<br>')
                .replace(/<li class="ml-4">/g, '<ul class="list-disc ml-6 my-2"><li class="ml-4">')
                .replace(/<\/li><br>/g, '</li></ul>');
        } catch (error) {
            console.error('Failed to format preview:', error);
            return '<p class="text-red-500">Error formatting preview</p>';
        }
    }

    copyToClipboard() {
        try {
            const formData = this.getFormData();
            const theme = this.themeSelect?.value || 'classic';
            const readmeContent = this.generateREADME(formData, theme);
            
            if (!readmeContent) {
                this.showMessage('❌ No content to copy', 'error');
                return;
            }
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(readmeContent).then(() => {
                    this.showMessage('📋 README copied to clipboard!', 'success');
                }).catch((error) => {
                    console.warn('Clipboard API failed, using fallback:', error);
                    this.fallbackCopyToClipboard(readmeContent);
                });
            } else {
                this.fallbackCopyToClipboard(readmeContent);
            }
        } catch (error) {
            console.error('Copy to clipboard failed:', error);
            this.showMessage('❌ Failed to copy to clipboard', 'error');
        }
    }
    
    fallbackCopyToClipboard(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                this.showMessage('📋 README copied to clipboard!', 'success');
            } else {
                this.showMessage('❌ Copy failed. Please select and copy manually.', 'error');
            }
        } catch (error) {
            console.error('Fallback copy failed:', error);
            this.showMessage('❌ Copy failed. Please select and copy manually.', 'error');
        }
    }

    downloadREADME() {
        try {
            const formData = this.getFormData();
            const theme = this.themeSelect?.value || 'classic';
            const readmeContent = this.generateREADME(formData, theme);
            
            if (!readmeContent) {
                this.showMessage('❌ No content to download', 'error');
                return;
            }
            
            if (!formData.username) {
                this.showMessage('❌ Username is required for download', 'error');
                return;
            }
            
            // Show export options
            this.showExportOptions(readmeContent, formData.username, theme);
        } catch (error) {
            console.error('Download failed:', error);
            this.showMessage('❌ Download failed', 'error');
        }
    }
    
    showExportOptions(content, username, theme) {
        try {
            if (!content || !username || !theme) {
                this.showMessage('❌ Missing data for export', 'error');
                return;
            }
            
            const exportModal = document.createElement('div');
            exportModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            exportModal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Export README</h3>
                    <div class="space-y-3">
                        <button class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors" onclick="this.closest('.fixed').remove(); window.profileGenerator.exportAsMarkdown('${content.replace(/'/g, "\\'")}', '${username}', '${theme}')">
                            📄 Markdown (.md)
                        </button>
                        <button class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors" onclick="this.closest('.fixed').remove(); window.profileGenerator.exportAsHTML('${content.replace(/'/g, "\\'")}', '${username}', '${theme}')">
                            🌐 HTML (.html)
                        </button>
                        <button class="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors" onclick="this.closest('.fixed').remove(); window.profileGenerator.exportAsPDF('${content.replace(/'/g, "\\'")}', '${username}', '${theme}')">
                            📊 PDF (.pdf)
                        </button>
                        <button class="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors" onclick="this.closest('.fixed').remove();">
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            `;
            
            if (document.body) {
                document.body.appendChild(exportModal);
                
                // Close modal on outside click
                exportModal.addEventListener('click', (e) => {
                    if (e.target === exportModal) {
                        exportModal.remove();
                    }
                });
                
                // Close modal on Escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        exportModal.remove();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            }
        } catch (error) {
            console.error('Failed to show export options:', error);
            this.showMessage('❌ Failed to show export options', 'error');
        }
    }
    
    exportAsMarkdown(content, username, theme) {
        try {
            if (!content || !username || !theme) {
                this.showMessage('📄 Missing data for export', 'error');
                return;
            }
            
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `README-${username}-${theme}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('📄 README exported as Markdown!', 'success');
        } catch (error) {
            console.error('Markdown export failed:', error);
            this.showMessage('📄 Export failed', 'error');
        }
    }
    
    exportAsHTML(content, username, theme) {
        try {
            if (!content || !username || !theme) {
                this.showMessage('🌐 Missing data for export', 'error');
                return;
            }
            
            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${username}'s GitHub Profile</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { border-bottom: 2px solid #e1e4e8; padding-bottom: 10px; }
        h2 { border-bottom: 1px solid #e1e4e8; padding-bottom: 5px; }
        code { background-color: #f6f8fa; padding: 2px 4px; border-radius: 3px; }
        pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
        blockquote { border-left: 4px solid #dfe2e5; margin: 0; padding-left: 16px; color: #6a737d; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    ${this.formatPreview(content)}
</body>
</html>`;
            
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `README-${username}-${theme}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('🌐 README exported as HTML!', 'success');
        } catch (error) {
            console.error('HTML export failed:', error);
            this.showMessage('🌐 Export failed', 'error');
        }
    }
    
    exportAsPDF(content, username, theme) {
        try {
            if (!content || !username || !theme) {
                this.showMessage('📊 Missing data for export', 'error');
                return;
            }
            
            // For PDF export, we'll use a simple approach by opening in new window for printing
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                this.showMessage('📊 Popup blocked. Please allow popups and try again.', 'error');
                return;
            }
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${username}'s GitHub Profile</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
                            h1 { border-bottom: 2px solid #ccc; padding-bottom: 10px; }
                            h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; }
                            @media print { body { margin: 0; } }
                        </style>
                    </head>
                    <body>
                        ${this.formatPreview(content)}
                    </body>
                </html>
            `);
            printWindow.document.close();
            
            setTimeout(() => {
                try {
                    printWindow.print();
                } catch (error) {
                    console.error('Print failed:', error);
                    this.showMessage('📊 Print failed. Please use browser print function.', 'error');
                }
            }, 500);
            
            this.showMessage('📊 README ready for PDF export!', 'success');
        } catch (error) {
            console.error('PDF export failed:', error);
            this.showMessage('📊 Export failed', 'error');
        }
    }

    updateCharacterCount(content) {
        try {
            const charCountElement = document.getElementById('charCount');
            if (charCountElement && content) {
                const count = content.length;
                charCountElement.textContent = `${count} characters`;
                
                // Color coding based on length
                if (count < 1000) {
                    charCountElement.className = 'text-green-600 text-sm';
                } else if (count < 2000) {
                    charCountElement.className = 'text-yellow-600 text-sm';
                } else {
                    charCountElement.className = 'text-red-600 text-sm';
                }
            }
        } catch (error) {
            console.warn('Failed to update character count:', error);
        }
    }

    showSuccessMessage() {
        try {
            this.showMessage('🚀 README generated successfully!', 'success');
        } catch (error) {
            console.warn('Failed to show success message:', error);
        }
    }

    showMessage(message, type = 'info') {
        try {
            // Remove existing messages
            const existingMessages = document.querySelectorAll('.message-toast');
            existingMessages.forEach(msg => msg.remove());
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message-toast fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transform transition-all duration-300 ${
                type === 'success' ? 'bg-green-600' : 
                type === 'error' ? 'bg-red-600' : 'bg-blue-600'
            }`;
            messageDiv.textContent = message;
            
            document.body.appendChild(messageDiv);
            
            // Animate in
            setTimeout(() => {
                messageDiv.classList.add('translate-x-0');
            }, 100);
            
            // Auto remove
            setTimeout(() => {
                messageDiv.classList.add('translate-x-full', 'opacity-0');
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }, 3000);
        } catch (error) {
            console.error('Failed to show message:', error);
            // Fallback to alert if message system fails
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    updateAchievementProgress() {
        try {
            // Update achievement progress based on user actions
            const achievements = {
                'Repository Creation': '✅ Complete',
                'Documentation': '✅ Complete',
                'Pull Requests': '🔄 In Progress',
                'Community Engagement': '📋 Next Goal',
                'Advanced Features': '🆕 New!'
            };
            
            // Update the UI
            Object.entries(achievements).forEach(([achievement, status]) => {
                const element = document.querySelector(`[data-achievement="${achievement}"]`);
                if (element) {
                    element.textContent = status;
                }
            });
            
            // Update progress bar
            this.updateProgressBar();
            
            // Add some fun achievement animations
            this.animateAchievements();
        } catch (error) {
            console.warn('Failed to update achievement progress:', error);
        }
    }
    
    updateProgressBar() {
        try {
            const progressBar = document.getElementById('achievementProgressBar');
            if (progressBar) {
                const achievementElements = document.querySelectorAll('[data-achievement]');
                const completedCount = Array.from(achievementElements)
                    .filter(el => el.textContent && el.textContent.includes('✅ Complete')).length;
                const totalCount = achievementElements.length || 5;
                const percentage = Math.min((completedCount / totalCount) * 100, 100);
                
                progressBar.style.width = percentage + '%';
                progressBar.style.backgroundColor = this.getProgressColor(percentage);
                
                // Update progress text
                const progressText = document.getElementById('progressText');
                if (progressText) {
                    progressText.textContent = `${completedCount}/${totalCount} achievements completed`;
                }
            }
        } catch (error) {
            console.warn('Failed to update progress bar:', error);
        }
    }
    
    getProgressColor(percentage) {
        try {
            const num = parseFloat(percentage);
            if (isNaN(num)) return '#ef4444'; // Default red
            
            if (num >= 80) return '#10b981'; // Green
            if (num >= 60) return '#f59e0b'; // Yellow
            if (num >= 40) return '#f97316'; // Orange
            return '#ef4444'; // Red
        } catch (error) {
            console.warn('Failed to get progress color:', error);
            return '#ef4444'; // Default red
        }
    }
    
    animateAchievements() {
        try {
            const achievementElements = document.querySelectorAll('[data-achievement]');
            if (achievementElements.length === 0) return;
            
            achievementElements.forEach((element, index) => {
                try {
                    setTimeout(() => {
                        try {
                            element.style.animation = 'bounce 0.6s ease-in-out';
                            setTimeout(() => {
                                try {
                                    element.style.animation = '';
                                } catch (error) {
                                    console.warn('Failed to reset achievement animation:', error);
                                }
                            }, 600);
                        } catch (error) {
                            console.warn('Failed to set achievement animation:', error);
                        }
                    }, index * 100);
                } catch (error) {
                    console.warn('Failed to schedule achievement animation:', error);
                }
            });
            
            // Trigger confetti for completed achievements
            const completedAchievements = Array.from(achievementElements).filter(el => 
                el.textContent && el.textContent.includes('✅ Complete')
            );
            
            if (completedAchievements.length >= 2) {
                this.triggerConfetti();
            }
        } catch (error) {
            console.warn('Failed to animate achievements:', error);
        }
    }
    
    triggerConfetti() {
        try {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const confettiCount = Math.min(50, window.innerWidth > 768 ? 50 : 25); // Reduce on mobile
            
            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    try {
                        this.createConfetti(colors[Math.floor(Math.random() * colors.length)]);
                    } catch (error) {
                        console.warn('Failed to create confetti piece:', error);
                    }
                }, i * 20);
            }
        } catch (error) {
            console.warn('Failed to trigger confetti:', error);
        }
    }
    
    createConfetti(color) {
        try {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confetti-fall 3s linear forwards';
            
            if (document.body) {
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    try {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    } catch (error) {
                        console.warn('Failed to remove confetti:', error);
                    }
                }, 3000);
            }
        } catch (error) {
            console.warn('Failed to create confetti:', error);
        }
    }

    initializeGitHubStats() {
        try {
            // Initialize GitHub statistics integration
            if (this.githubStatsToggle) {
                this.githubStatsToggle.addEventListener('change', () => {
                    try {
                        this.updatePreview();
                    } catch (error) {
                        console.warn('GitHub stats toggle failed:', error);
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to initialize GitHub stats:', error);
        }
    }

    debounce(func, wait) {
        if (typeof func !== 'function') {
            console.warn('Debounce: func must be a function');
            return func;
        }
        
        let timeout;
        return function executedFunction(...args) {
            try {
                const later = () => {
                    try {
                        clearTimeout(timeout);
                        func(...args);
                    } catch (error) {
                        console.warn('Debounced function execution failed:', error);
                    }
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            } catch (error) {
                console.warn('Debounce setup failed:', error);
                // Fallback: execute immediately
                try {
                    func(...args);
                } catch (fallbackError) {
                    console.error('Fallback execution failed:', fallbackError);
                }
            }
        };
    }

    setupMobileSupport() {
        try {
            // Add mobile-specific classes and optimizations
            this.addMobileClasses();
            this.addTouchSupport();
            this.optimizeForMobile();
            
            // PWA support
            this.setupPWA();
        } catch (error) {
            console.warn('Mobile support setup failed:', error);
        }
    }

    addMobileClasses() {
        try {
            const form = document.getElementById('generatorForm');
            if (form) {
                form.classList.add('mobile-optimized');
                
                // Add mobile classes to inputs
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    try {
                        input.classList.add('mobile-input');
                    } catch (error) {
                        console.warn('Failed to add mobile class to input:', error);
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to add mobile classes:', error);
        }
    }

    addTouchSupport() {
        try {
            // Touch-friendly theme switching
            const themeButtons = document.querySelectorAll('.theme-preview-btn');
            if (themeButtons.length === 0) return;
            
            themeButtons.forEach(btn => {
                try {
                    btn.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        btn.style.transform = 'scale(0.95)';
                    });
                    
                    btn.addEventListener('touchend', (e) => {
                        e.preventDefault();
                        btn.style.transform = 'scale(1)';
                        const theme = btn.dataset.theme;
                        if (theme) {
                            this.switchTheme(theme);
                        }
                    });
                } catch (error) {
                    console.warn('Failed to add touch support to button:', error);
                }
            });
        } catch (error) {
            console.warn('Failed to add touch support:', error);
        }
    }

    optimizeForMobile() {
        try {
            // Mobile-specific optimizations
            if (window.innerWidth <= 768) {
                document.body.classList.add('mobile-view');
                
                // Optimize advanced options for mobile
                const advancedOptions = document.getElementById('advancedOptions');
                if (advancedOptions) {
                    advancedOptions.classList.add('mobile-advanced');
                }
                
                // Add mobile-specific event listeners
                this.addMobileEventListeners();
            }
        } catch (error) {
            console.warn('Failed to optimize for mobile:', error);
        }
    }
    
    addMobileEventListeners() {
        try {
            // Add mobile-specific event listeners
            const form = document.getElementById('generatorForm');
            if (form) {
                // Prevent zoom on input focus (iOS)
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        input.style.fontSize = '16px';
                    });
                    
                    input.addEventListener('blur', () => {
                        input.style.fontSize = '';
                    });
                });
            }
        } catch (error) {
            console.warn('Failed to add mobile event listeners:', error);
        }
    }

    setupPWA() {
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('PWA Service Worker registered');
                    })
                    .catch(error => {
                        console.log('PWA Service Worker failed:', error);
                    });
            }
            
            // Add to home screen prompt
            this.addInstallPrompt();
        } catch (error) {
            console.warn('PWA setup failed:', error);
        }
    }

    addInstallPrompt() {
        try {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
                
                // Show install button
                this.showInstallButton();
            });
        } catch (error) {
            console.warn('Install prompt setup failed:', error);
        }
    }

    showInstallButton() {
        try {
            // Check if install button already exists
            if (document.getElementById('installButton')) {
                console.log('Install button already exists');
                return;
            }
            
            const installButton = document.createElement('button');
            installButton.id = 'installButton';
            installButton.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg z-50';
            installButton.textContent = '📱 Install App';
            installButton.onclick = () => this.installApp();
            
            if (document.body) {
                document.body.appendChild(installButton);
                
                // Auto-hide after 10 seconds
                setTimeout(() => {
                    try {
                        if (installButton.parentNode) {
                            installButton.remove();
                        }
                    } catch (error) {
                        console.warn('Failed to remove install button:', error);
                    }
                }, 10000);
            }
        } catch (error) {
            console.error('Failed to show install button:', error);
        }
    }

    installApp() {
        try {
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        this.showMessage('📱 App installed successfully!', 'success');
                    }
                    this.deferredPrompt = null;
                }).catch(error => {
                    console.error('Install prompt failed:', error);
                    this.showMessage('📱 App installation failed', 'error');
                });
            }
        } catch (error) {
            console.error('Install app failed:', error);
            this.showMessage('📱 App installation failed', 'error');
        }
    }

    setupImageUpload() {
        try {
            // Create image upload elements
            this.createImageUploadUI();
            
            // Handle image uploads
            this.setupImageHandlers();
        } catch (error) {
            console.warn('Image upload setup failed:', error);
        }
    }

    createImageUploadUI() {
        try {
            const form = document.getElementById('generatorForm');
            if (!form) {
                console.warn('Form not found for image upload UI');
                return;
            }

            // Check if image upload UI already exists
            if (document.getElementById('imageUploadBtn')) {
                console.log('Image upload UI already exists');
                return;
            }

            // Create image upload section
            const imageSection = document.createElement('div');
            imageSection.className = 'mb-4';
            imageSection.innerHTML = `
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📷 Profile Image (Optional)
                </label>
                <div class="flex items-center space-x-3">
                    <button type="button" id="imageUploadBtn" class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        📷 Upload Image
                    </button>
                    <input type="file" id="imageInput" accept="image/*" class="hidden">
                    <div id="imagePreview" class="hidden">
                        <img id="previewImg" class="w-16 h-16 rounded-full object-cover" alt="Profile Preview">
                        <button type="button" id="removeImageBtn" class="ml-2 text-red-600 hover:text-red-700">❌</button>
                    </div>
                </div>
            `;

            // Insert at the top of the form
            form.insertBefore(imageSection, form.firstChild);
        } catch (error) {
            console.error('Failed to create image upload UI:', error);
        }
    }

    setupImageHandlers() {
        try {
            const uploadBtn = document.getElementById('imageUploadBtn');
            const imageInput = document.getElementById('imageInput');
            const imagePreview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            const removeBtn = document.getElementById('removeImageBtn');

            if (uploadBtn && imageInput) {
                uploadBtn.addEventListener('click', () => {
                    try {
                        imageInput.click();
                    } catch (error) {
                        console.warn('Failed to trigger file input:', error);
                    }
                });
                
                imageInput.addEventListener('change', (e) => {
                    try {
                        const file = e.target.files[0];
                        if (file) {
                            this.handleImageUpload(file, previewImg, imagePreview);
                        }
                    } catch (error) {
                        console.error('Image input change failed:', error);
                        this.showMessage('📷 Failed to process image selection', 'error');
                    }
                });
            }

            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    try {
                        this.removeProfileImage(imagePreview, imageInput);
                    } catch (error) {
                        console.error('Remove image failed:', error);
                        this.showMessage('📷 Failed to remove image', 'error');
                    }
                });
            }
        } catch (error) {
            console.error('Failed to setup image handlers:', error);
        }
    }

    handleImageUpload(file, previewImg, imagePreview) {
        try {
            // Validate file
            if (!file || !file.type.startsWith('image/')) {
                this.showMessage('📷 Please select a valid image file', 'error');
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showMessage('📷 Image file too large. Please select an image under 5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imageData = e.target.result;
                    
                    // Store image data
                    this.profileImage = imageData;
                    
                    // Show preview
                    previewImg.src = imageData;
                    imagePreview.classList.remove('hidden');
                    
                    // Update README preview
                    this.updatePreview();
                    
                    this.showMessage('📷 Image uploaded successfully!', 'success');
                } catch (error) {
                    console.error('Failed to process image:', error);
                    this.showMessage('📷 Failed to process image', 'error');
                }
            };
            
            reader.onerror = () => {
                this.showMessage('📷 Failed to read image file', 'error');
            };
            
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Image upload failed:', error);
            this.showMessage('📷 Image upload failed', 'error');
        }
    }

    removeProfileImage(imagePreview, imageInput) {
        try {
            this.profileImage = null;
            
            if (imagePreview) {
                imagePreview.classList.add('hidden');
            }
            
            if (imageInput) {
                imageInput.value = '';
            }
            
            this.updatePreview();
            this.showMessage('📷 Image removed', 'info');
        } catch (error) {
            console.error('Failed to remove profile image:', error);
            this.showMessage('📷 Failed to remove image', 'error');
        }
    }

    switchTheme(theme) {
        try {
            if (!this.themeSelect || !theme) {
                console.warn('Theme switching failed: missing elements or theme');
                return;
            }
            
            this.themeSelect.value = theme;
            this.updatePreview();
            
            // Update theme button highlighting
            const themeButtons = document.querySelectorAll('.theme-preview-btn');
            themeButtons.forEach(btn => {
                btn.classList.remove('bg-blue-100', 'dark:bg-blue-900/40', 'border-blue-300');
            });
            
            const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
            if (activeBtn) {
                activeBtn.classList.add('bg-blue-100', 'dark:bg-blue-900/40', 'border-blue-300');
            }
            
            // Save theme preference
            this.currentTheme = theme;
            this.saveUserPreferences();
            
        } catch (error) {
            console.error('Theme switching failed:', error);
            this.showMessage('❌ Failed to switch theme', 'error');
        }
    }
    
    // Cleanup method to remove event listeners and clean up resources
    cleanup() {
        try {
            console.log('Cleaning up ProfileGenerator...');
            
            // Remove tracked event listeners
            this.eventListeners.forEach((listener, element) => {
                try {
                    if (element && typeof element.removeEventListener === 'function') {
                        element.removeEventListener('click', listener);
                        element.removeEventListener('change', listener);
                        element.removeEventListener('input', listener);
                        element.removeEventListener('blur', listener);
                        element.removeEventListener('submit', listener);
                    }
                } catch (error) {
                    console.warn('Failed to remove event listener:', error);
                }
            });
            this.eventListeners.clear();
            
            // Clean up any created elements
            const installButton = document.getElementById('installButton');
            if (installButton) {
                installButton.remove();
            }
            
            // Clear any timeouts
            if (this.cleanupTimeouts) {
                this.cleanupTimeouts.forEach(timeout => clearTimeout(timeout));
                this.cleanupTimeouts.clear();
            }
            
            console.log('ProfileGenerator cleanup completed');
        } catch (error) {
            console.error('Cleanup failed:', error);
        }
    }
    
    // Method to add tracked event listeners
    addTrackedEventListener(element, event, listener) {
        try {
            if (element && typeof element.addEventListener === 'function') {
                element.addEventListener(event, listener);
                this.eventListeners.set(element, listener);
            }
        } catch (error) {
            console.warn('Failed to add tracked event listener:', error);
        }
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.profileGenerator = new ProfileGenerator();
        
        // Add cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (window.profileGenerator && typeof window.profileGenerator.cleanup === 'function') {
                window.profileGenerator.cleanup();
            }
        });
        
        // Add cleanup on page hide (mobile)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                // Page is being hidden, could be cleanup opportunity
                console.log('Page hidden, cleanup opportunity');
            }
        });
        
    } catch (error) {
        console.error('Failed to initialize ProfileGenerator:', error);
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed inset-0 bg-red-600 text-white flex items-center justify-center z-50';
        errorDiv.innerHTML = `
            <div class="text-center p-8">
                <h1 class="text-2xl font-bold mb-4">⚠️ Application Error</h1>
                <p class="mb-4">Failed to initialize the application.</p>
                <button onclick="location.reload()" class="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100">
                    🔄 Refresh Page
                </button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }
});

// Enhanced Easter eggs
document.addEventListener('keydown', (e) => {
    try {
        // Ctrl/Cmd + G for rainbow mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            e.preventDefault();
            if (document.body) {
                document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
                document.body.style.backgroundSize = '400% 400%';
                document.body.style.animation = 'gradient 3s ease infinite';
                
                setTimeout(() => {
                    try {
                        if (document.body) {
                            document.body.style.background = '';
                            document.body.style.backgroundSize = '';
                            document.body.style.animation = '';
                        }
                    } catch (error) {
                        console.warn('Failed to reset rainbow mode:', error);
                    }
                }, 3000);
            }
        }
        
        // Ctrl/Cmd + Shift + A for achievement celebration
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            if (document.body) {
                document.body.style.animation = 'celebrate 2s ease-in-out';
                setTimeout(() => {
                    try {
                        if (document.body) {
                            document.body.style.animation = '';
                        }
                    } catch (error) {
                        console.warn('Failed to reset celebration animation:', error);
                    }
                }, 2000);
            }
        }
    } catch (error) {
        console.warn('Easter egg failed:', error);
    }
});

// Enhanced CSS animations
try {
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes celebrate {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.02); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.02); }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0,-8px,0); }
            70% { transform: translate3d(0,-4px,0); }
            90% { transform: translate3d(0,-2px,0); }
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .message-toast {
            transform: translateX(100%);
            opacity: 0;
        }
        
        .message-toast.translate-x-0 {
            transform: translateX(0);
            opacity: 1;
        }
        
        .dark {
            color-scheme: dark;
        }
        
        .dark body {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        
        .dark .bg-white {
            background-color: #2d2d2d;
        }
        
        .dark .text-gray-800 {
            color: #e5e5e5;
        }
        
        .dark .text-gray-600 {
            color: #a0a0a0;
        }
        
        .dark .border-gray-300 {
            border-color: #4a4a4a;
        }
        
        .dark .bg-gray-50 {
            background-color: #1a1a1a;
        }
        
        .dark .bg-gray-100 {
            background-color: #2d2d2d;
        }
        
        .dark .bg-gray-800 {
            background-color: #1a1a1a;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .mobile-optimized input,
            .mobile-optimized textarea,
            .mobile-optimized select {
                font-size: 16px; /* Prevents zoom on iOS */
                padding: 12px;
            }
            
            .mobile-advanced {
                margin-top: 1rem;
                padding: 1rem;
                border-radius: 0.5rem;
                background-color: rgba(0, 0, 0, 0.05);
            }
            
            .dark .mobile-advanced {
                background-color: rgba(255, 255, 255, 0.05);
            }
        }
        
        /* Touch-friendly improvements */
        .theme-preview-btn {
            min-width: 44px;
            min-height: 44px;
            touch-action: manipulation;
        }
        
        /* Loading states */
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        /* Error states */
        .error-state {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        /* Accessibility improvements */
        .theme-preview-btn:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .border-gray-300 {
                border-color: #000000 !important;
            }
            
            .dark .border-gray-300 {
                border-color: #ffffff !important;
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    
    if (document.head) {
        document.head.appendChild(enhancedStyles);
        console.log('Enhanced CSS injected successfully');
    } else {
        console.warn('Document head not available for CSS injection');
    }
} catch (error) {
    console.warn('Failed to inject enhanced CSS:', error);
}
