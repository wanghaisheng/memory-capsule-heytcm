// Internationalization
let translations = {};
let currentLanguage = 'zh';

async function loadTranslations(lang) {
  try {
    const response = await fetch(`locale/${lang}.json`);
    translations = await response.json();
    return true;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    return false;
  }
}

async function changeLanguage(lang) {
  const loadSuccess = await loadTranslations(lang);
  
  if (loadSuccess) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = getNestedTranslation(key, translations);
      
      if (translation) {
        element.textContent = translation;
      }
    });
    
    // Update language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      languageSelect.value = lang;
    }
    
    // Add lang parameter to URL
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  } else {
    console.error(`Failed to change language to ${lang}`);
  }
}

// Helper function to get nested translations
function getNestedTranslation(key, obj) {
  const parts = key.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return null;
    }
    current = current[part];
  }
  
  return current;
}

// Fallback translations in case JSON loading fails
translations = {
  "hero": {
    "title": "每个人都是带着摄像头的行走式计算机",
    "subtitle": "记录、分享和探索彼此的独特视角，从而更全面地理解世界",
    "description": "PerspectiView 让你能够实时记录自己的所见所闻，与他人分享独特体验，探索来自世界各地的不同视角。",
    "cta-primary": "免费下载",
    "cta-secondary": "查看演示",
    "stats": {
      "users": "活跃用户",
      "countries": "覆盖国家",
      "perspectives": "分享视角"
    }
  },
  "pain-points": {
    "title": "你是否曾经有过这些困扰？",
    "missed-moments": {
      "title": "错过重要时刻",
      "description": "当精彩瞬间发生时，来不及拿出相机或手机记录下来。"
    },
    "sharing-difficulty": {
      "title": "难以分享体验",
      "description": "想与朋友分享现场体验，但照片和视频无法完全传达你的感受。"
    },
    "limited-perspective": {
      "title": "视角受限",
      "description": "无法体验他人眼中的世界，了解不同地区、文化和背景的人们的日常生活。"
    },
    "memory-fading": {
      "title": "记忆模糊",
      "description": "随着时间流逝，珍贵的记忆变得模糊，细节逐渐被遗忘。"
    }
  },
  // More fallback translations can be added as needed
};

