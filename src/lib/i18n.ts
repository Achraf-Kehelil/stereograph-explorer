import { create } from 'zustand';

type Language = 'fr' | 'ar';

interface I18nState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'app.title': 'StereoGraph Explorer',
    'app.subtitle': 'Ministère de la Justice - République Tunisienne',
    'menu.calls': 'Appels',
    'menu.boxes': 'Boxes',
    'menu.statistics': 'Statistiques',
    'menu.users': 'Utilisateurs',
    'menu.logs': 'Journaux',
    'menu.prisoners': 'Détenus',
    'menu.visitors': 'Visiteurs',
    'menu.calendar': 'Calendrier',
    'menu.documents': 'Documents',
    'auth.logout': 'Déconnexion',
    'roles.directeur': 'Directeur',
    'roles.superviseur': 'Superviseur',
    'roles.agent007': 'Agent',
    'auth.login.title': 'Connexion',
    'auth.login.subtitle': 'Système de gestion des communications pénitentiaires',
    'auth.login.username': "Nom d'utilisateur",
    'auth.login.password': 'Mot de passe',
    'auth.login.submit': 'Se connecter',
  },
  ar: {
    'app.title': 'ستيريوغراف إكسبلورر',
    'app.subtitle': 'وزارة العدل - الجمهورية التونسية',
    'menu.calls': 'المكالمات',
    'menu.boxes': 'الكبائن',
    'menu.statistics': 'الإحصائيات',
    'menu.users': 'المستخدمون',
    'menu.logs': 'السجلات',
    'menu.prisoners': 'السجناء',
    'menu.visitors': 'الزوار',
    'menu.calendar': 'التقويم',
    'menu.documents': 'الوثائق',
    'auth.logout': 'تسجيل الخروج',
    'roles.directeur': 'المدير',
    'roles.superviseur': 'المشرف',
    'roles.agent007': 'العون',
    'auth.login.title': 'تسجيل الدخول',
    'auth.login.subtitle': 'نظام إدارة الاتصالات في السجون',
    'auth.login.username': 'اسم المستخدم',
    'auth.login.password': 'كلمة المرور',
    'auth.login.submit': 'دخول',
  },
};

export const useI18n = create<I18nState>((set, get) => ({
  language: 'fr',
  setLanguage: (language) => set({ language }),
  t: (key, params) => {
    const translation = translations[get().language][key] ?? key;
    if (!params) return translation;
    
    return Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      translation
    );
  },
}));