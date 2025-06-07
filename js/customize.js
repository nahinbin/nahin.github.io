// Default theme colors
const defaultTheme = {
    'primary-color': '#00ff9d',
    'secondary-color': '#00cc7d',
    'accent-color': '#00ff9d',
    'text-primary': '#ffffff',
    'text-secondary': '#a0a0a0',
    'bg-primary': '#0a0a0a',
    'bg-secondary': '#121212',
    'link-color': '#00ff9d',
    'hover-color': '#00cc7d',
    'border-color': '#2a2a2a'
};

// Initialize color pickers with current theme values
function initializeColorPickers() {
    const colorPickers = document.querySelectorAll('.color-picker');
    const currentTheme = ThemeManager.getCurrentTheme();
    
    colorPickers.forEach(picker => {
        const colorVar = picker.id;
        picker.value = currentTheme[colorVar] || ThemeManager.defaultTheme[colorVar];
        
        // Add event listener for color changes
        picker.addEventListener('input', (e) => {
            const newTheme = ThemeManager.getCurrentTheme();
            newTheme[e.target.id] = e.target.value;
            ThemeManager.saveTheme(newTheme);
            updatePreview(e.target.id, e.target.value);
        });
    });
}

// Update preview elements with new colors
function updatePreview(colorVar, value) {
    document.documentElement.style.setProperty(`--${colorVar}`, value);
}

// Save theme
function saveTheme() {
    const theme = {};
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        theme[picker.id] = picker.value;
    });
    ThemeManager.saveTheme(theme);
    showNotification('Theme saved successfully! Changes applied to all pages.');
}

// Restore default theme
function restoreDefaultTheme() {
    ThemeManager.restoreDefaultTheme();
    
    // Reset all color pickers to default values
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        const colorVar = picker.id;
        picker.value = ThemeManager.defaultTheme[colorVar];
    });
    
    showNotification('Default theme restored! Changes applied to all pages.');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '6px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize theme customization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize color pickers
    initializeColorPickers();
    
    // Add event listeners for buttons
    document.getElementById('save-theme').addEventListener('click', saveTheme);
    document.getElementById('restore-default').addEventListener('click', restoreDefaultTheme);
    
    // Preview button functionality
    document.getElementById('preview-theme').addEventListener('click', () => {
        const colorPickers = document.querySelectorAll('.color-picker');
        colorPickers.forEach(picker => {
            updatePreview(picker.id, picker.value);
        });
        showNotification('Preview updated!');
    });
}); 