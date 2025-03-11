import { Service } from '@/types'

export const services = {
  ilaclama: {
    title: "İlaçlama Hizmetleri",
    description: "Profesyonel ilaçlama çözümleri ile yaşam alanlarınızı zararlılardan koruyoruz.",
    items: [
      {
        id: "hamam-bocegi",
        title: "Hamam Böceği İlaçlama",
        description: "Mutfak ve nemli alanlarda sıkça görülen hamam böceklerine karşı kalıcı çözüm",
        image: "/images/services/hamam-bocegi.jpg"
      },
      {
        id: "fare",
        title: "Fare İlaçlama",
        description: "Fare ve kemirgen kontrolü için profesyonel mücadele yöntemleri",
        image: "/images/services/fare.jpg"
      },
      {
        id: "tahta-kurusu",
        title: "Tahta Kurusu İlaçlama",
        description: "Yatak, koltuk ve mobilyalardaki tahta kurularına karşı etkili ilaçlama",
        image: "/images/services/tahta-kurusu.jpg"
      },
      {
        id: "karinca",
        title: "Karınca İlaçlama",
        description: "Her türlü karınca türüne karşı güvenli ve etkili çözümler",
        image: "/images/services/karinca.jpg"
      },
      {
        id: "pire",
        title: "Pire İlaçlama",
        description: "Ev ve iş yerlerindeki pire sorununa karşı garantili ilaçlama",
        image: "/images/services/pire.jpg"
      }
    ]
  },
  peyzaj: {
    title: "Peyzaj Hizmetleri",
    description: "Yaşam alanlarınızı yeşillendiriyor, doğayla uyumlu tasarımlar sunuyoruz.",
    items: [
      {
        id: "bahce-duzenleme",
        title: "Bahçe Düzenleme",
        description: "Modern ve fonksiyonel bahçe tasarımı ve uygulama hizmetleri",
        image: "/images/services/bahce-duzenleme.jpg"
      },
      {
        id: "cim-serimi",
        title: "Çim Serimi",
        description: "Hazır rulo çim ve tohum ile çim alan oluşturma",
        image: "/images/services/cim.jpg"
      },
      {
        id: "sulama-sistemleri",
        title: "Otomatik Sulama Sistemleri",
        description: "Akıllı ve otomatik sulama sistemi kurulumu",
        image: "/images/services/sulama.jpg"
      },
      {
        id: "agac-budama",
        title: "Ağaç Budama",
        description: "Profesyonel ağaç budama ve bakım hizmetleri",
        image: "/images/services/budama.jpg"
      },
      {
        id: "bitkilendirme",
        title: "Bitkilendirme",
        description: "Mevsimlik çiçek ve süs bitkileri uygulamaları",
        image: "/images/services/bitkilendirme.jpg"
      }
    ]
  }
} 