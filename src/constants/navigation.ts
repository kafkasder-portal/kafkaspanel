import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  Building2,
  Coins,
  GraduationCap,
  HelpingHand,
  Shield,
  Database,
  LucideIcon
} from 'lucide-react'

export interface NavigationSubPage {
  title: string
  href: string
  description?: string
}

export interface NavigationItem {
  title: string
  icon: LucideIcon
  badge?: string | number
  subPages: NavigationSubPage[]
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    badge: undefined,
    subPages: [
      { title: "Genel Bakış", href: "/", description: "Ana sayfa ve özet bilgiler" },
      { title: "Performans", href: "/performance", description: "Sistem performans metrikleri" },
      { title: "Aktivite Akışı", href: "/activity", description: "Son kullanıcı aktiviteleri" }
    ]
  },
  {
    title: "Analitik",
    icon: BarChart3,
    badge: 3,
    subPages: [
      { title: "Mesaj Analitiği", href: "/messages/analytics", description: "Mesaj istatistikleri" },
      { title: "Bağış Raporları", href: "/donations/reports", description: "Bağış analiz raporları" },
      { title: "Kullanıcı Metrikleri", href: "/analytics/users", description: "Kullanıcı davranış analizi" }
    ]
  },
  {
    title: "Bağış Yönetimi",
    icon: Coins,
    badge: undefined,
    subPages: [
      { title: "Bağış Listesi", href: "/donations", description: "Tüm bağışlar" },
      { title: "Bağış Veznesi", href: "/donations/vault", description: "Bağış kasası yönetimi" },
      { title: "Kurumlar", href: "/donations/institutions", description: "Bağışçı kurumlar" },
      { title: "Nakit Bağışlar", href: "/donations/cash", description: "Nakit bağış işlemleri" },
      { title: "Banka Bağışları", href: "/donations/bank", description: "Banka transferi bağışları" },
      { title: "Online Bağışlar", href: "/donations/online", description: "Online bağış platformu" }
    ]
  },
  {
    title: "Toplantılar",
    icon: Calendar,
    badge: undefined,
    subPages: [
      { title: "Tüm Toplantılar", href: "/meetings", description: "Toplantı listesi" },
      { title: "Toplantı Planla", href: "/meetings/create", description: "Yeni toplantı oluştur" },
      { title: "Toplantı Takvimi", href: "/meetings/calendar", description: "Takvim görünümü" }
    ]
  },
  {
    title: "Yardım Yönetimi",
    icon: HelpingHand,
    badge: undefined,
    subPages: [
      { title: "İhtiyaç Sahipleri", href: "/aid/beneficiaries", description: "Yardım alan kişiler" },
      { title: "Yardım Başvuruları", href: "/aid/applications", description: "Başvuru yönetimi" },
      { title: "Nakdi Yardımlar", href: "/aid/cash-operations", description: "Nakdi yardım işlemleri" },
      { title: "Ayni Yardımlar", href: "/aid/in-kind-operations", description: "Ayni yardım dağıtımı" },
      { title: "Raporlar", href: "/aid/reports", description: "Yardım raporları" }
    ]
  },
  {
    title: "Mesajlaşma",
    icon: MessageSquare,
    badge: 12,
    subPages: [
      { title: "Mesaj Merkezi", href: "/messages", description: "Ana mesaj paneli" },
      { title: "Toplu Mesaj", href: "/messages/bulk-send", description: "Toplu mesaj gönderimi" },
      { title: "Mesaj Grupları", href: "/messages/groups", description: "Grup yönetimi" },
      { title: "SMS Gönderimleri", href: "/messages/sms-deliveries", description: "SMS kayıtları" },
      { title: "E-posta Gönderimleri", href: "/messages/email-deliveries", description: "E-posta kayıtları" }
    ]
  },
  {
    title: "Burs Yönetimi",
    icon: GraduationCap,
    badge: undefined,
    subPages: [
      { title: "Yetim & Öğrenciler", href: "/scholarship", description: "Burs alan öğrenciler" },
      { title: "Burs Kampanyaları", href: "/scholarship/campaigns", description: "Burs kampanya yönetimi" },
      { title: "Okullar", href: "/scholarship/schools", description: "Okul kayıtları" },
      { title: "Burs Raporları", href: "/scholarship/reports", description: "Burs analiz raporları" }
    ]
  }
]

export const supportItems: NavigationItem[] = [
  {
    title: "Sistem Yönetimi",
    icon: Shield,
    badge: undefined,
    subPages: [
      { title: "Kullanıcı Yönetimi", href: "/system/user-management", description: "Kullanıcı hesapları" },
      { title: "IP Engelleme", href: "/system/ip-blocking", description: "Güvenlik ayarları" },
      { title: "Sistem Ayarları", href: "/system/settings", description: "Genel sistem ayarları" }
    ]
  },
  {
    title: "Tanımlamalar",
    icon: Database,
    badge: undefined,
    subPages: [
      { title: "Genel Tanımlar", href: "/definitions", description: "Sistem tanımlamaları" },
      { title: "Kullanıcı Hesapları", href: "/definitions/user-accounts", description: "Hesap tanımları" },
      { title: "Yetki Grupları", href: "/definitions/permission-groups", description: "Yetkilendirme" },
      { title: "Genel Ayarlar", href: "/definitions/general-settings", description: "Genel ayarlar" }
    ]
  }
]

export const allNavigationItems = [...navigationItems, ...supportItems]

// Search için flatten edilmiş sayfa listesi
export const allPages = allNavigationItems.flatMap(item => 
  item.subPages.map(subPage => ({
    ...subPage,
    category: item.title,
    icon: item.icon
  }))
)
