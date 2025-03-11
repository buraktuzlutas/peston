"use client"

import { useState } from 'react'

const TeklifAl = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    mekanTipi: '',
    alan: '',
    hasereTuru: '',
    sehir: '',
    ilce: '',
    katSayisi: '',
    daireSayisi: '',
    catiArasi: false,
    bahce: false,
    bahceAlan: '',
    depo: false,
    depoAlan: '',
    // Yeni alanlar
    periyodik: false,
    eskiMusteri: false,
    musteriTel: '',
    randevuTarihi: '',
    randevuSaati: '',
    indirimTipi: '', // şehit, gazi, memur vb.
  })

  // Şehir ve ilçe verileri
  const sehirler = ['İstanbul', 'Ankara', 'İzmir'] // Tüm şehirler eklenecek
  const ilceler = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar'], // Her şehir için ilçeler
    'Ankara': ['Çankaya', 'Keçiören', 'Mamak'],
    'İzmir': ['Konak', 'Karşıyaka', 'Bornova']
  }

  const indirimTipleri = [
    { id: 'sehit', title: 'Şehit Ailesi', oran: 100 },
    { id: 'gazi', title: 'Gazi', oran: 20 },
    { id: 'memur', title: 'Memur', oran: 10 },
    { id: 'saglik', title: 'Sağlık Çalışanı', oran: 10 },
    { id: 'ogrenci', title: 'Öğrenci', oran: 10 },
    { id: 'engelli', title: 'Engelli', oran: 15 }
  ]

  const mekanTipleri = [
    { id: 'konut', title: 'Konut', icon: '🏠' },
    { id: 'ofis', title: 'Ofis', icon: '🏢' },
    { id: 'apartman', title: 'Apartman', icon: '🏘️' },
    { id: 'site', title: 'Site', icon: '🏗️' },
    { id: 'bahce', title: 'Bahçe - Arazi', icon: '🌳' },
    { id: 'depo', title: 'Depo - Sığınak - Otopark', icon: '🏭' },
    { id: 'kafe', title: 'Kafe ve Restoran', icon: '☕' },
  ]

  const hasereTurleri = [
    'Hamam Böceği',
    'Fare',
    'Pire',
    'Tahta Kurusu',
    'Karınca',
    'Akrep',
    'Örümcek',
    'Sivrisinek',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: inputValue }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  // Konum Bilgileri (Step 2)
  const renderKonumBilgileri = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Şehir
        </label>
        <select
          name="sehir"
          value={formData.sehir}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Şehir Seçiniz</option>
          {sehirler.map(sehir => (
            <option key={sehir} value={sehir}>{sehir}</option>
          ))}
        </select>
      </div>

      {formData.sehir && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İlçe
          </label>
          <select
            name="ilce"
            value={formData.ilce}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">İlçe Seçiniz</option>
            {ilceler[formData.sehir as keyof typeof ilceler]?.map(ilce => (
              <option key={ilce} value={ilce}>{ilce}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )

  // İndirim ve Randevu (Step 3)
  const renderIndirimVeRandevu = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">İndirim ve Randevu Bilgileri</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="periyodik"
            name="periyodik"
            checked={formData.periyodik}
            onChange={handleInputChange}
            className="h-4 w-4 text-emerald-600"
          />
          <label htmlFor="periyodik">Periyodik İşlem (%8 indirim)</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="eskiMusteri"
            name="eskiMusteri"
            checked={formData.eskiMusteri}
            onChange={handleInputChange}
            className="h-4 w-4 text-emerald-600"
          />
          <label htmlFor="eskiMusteri">Eski Müşteriyim</label>
        </div>

        {formData.eskiMusteri && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Müşteri Telefon Numarası
            </label>
            <input
              type="tel"
              name="musteriTel"
              value={formData.musteriTel}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="05XX XXX XX XX"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İndirim Durumu
          </label>
          <select
            name="indirimTipi"
            value={formData.indirimTipi}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">İndirim Seçiniz</option>
            {indirimTipleri.map(indirim => (
              <option key={indirim.id} value={indirim.id}>
                {indirim.title} (%{indirim.oran} İndirim)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Randevu Tarihi
          </label>
          <input
            type="date"
            name="randevuTarihi"
            value={formData.randevuTarihi}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Randevu Saati
          </label>
          <select
            name="randevuSaati"
            value={formData.randevuSaati}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Saat Seçiniz</option>
            {Array.from({ length: 11 }, (_, i) => i + 9).map(saat => (
              <option key={saat} value={`${saat}:00`}>{saat}:00</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  // Özet bölümü için yardımcı fonksiyon
  const renderOzet = () => {
    const secilenMekan = mekanTipleri.find(m => m.id === formData.mekanTipi)
    const secilenIndirim = indirimTipleri.find(i => i.id === formData.indirimTipi)
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Teklif Özeti</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Mekan Bilgileri</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>Mekan Tipi: {secilenMekan?.title}</li>
                <li>Alan: {formData.alan} m²</li>
                {formData.mekanTipi === 'apartman' && (
                  <>
                    <li>Kat Sayısı: {formData.katSayisi}</li>
                    <li>Daire Sayısı: {formData.daireSayisi}</li>
                  </>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Konum Bilgileri</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>Şehir: {formData.sehir}</li>
                <li>İlçe: {formData.ilce}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">İşlem Detayları</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>Haşere Türü: {formData.hasereTuru}</li>
                <li>Periyodik İşlem: {formData.periyodik ? 'Evet' : 'Hayır'}</li>
                {formData.periyodik && <li>Periyodik İndirim: %8</li>}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Randevu Bilgileri</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>Tarih: {formData.randevuTarihi}</li>
                <li>Saat: {formData.randevuSaati}</li>
              </ul>
            </div>
          </div>

          {(secilenIndirim || formData.periyodik) && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <h3 className="font-semibold text-emerald-700">İndirim Bilgileri</h3>
              <ul className="mt-2 space-y-2 text-emerald-600">
                {secilenIndirim && (
                  <li>{secilenIndirim.title}: %{secilenIndirim.oran} indirim</li>
                )}
                {formData.periyodik && (
                  <li>Periyodik İşlem: %8 indirim</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Email gönderme fonksiyonu
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Teklifiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
      } else {
        throw new Error('Bir hata oluştu');
      }
    } catch (error) {
      alert('Teklifiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  // Step içeriğini güncelle
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Mekan Tipi Seçin</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mekanTipleri.map((mekan) => (
                <button
                  key={mekan.id}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, mekanTipi: mekan.id }))
                    nextStep()
                  }}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2
                    ${formData.mekanTipi === mekan.id ? 'border-emerald-600' : 'border-gray-200'}
                    hover:border-emerald-600 transition-colors`}
                >
                  <span className="text-3xl">{mekan.icon}</span>
                  <span>{mekan.title}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Konum ve Alan Bilgileri</h2>
            {renderKonumBilgileri()}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İlaçlanacak Alan (m²)
                </label>
                <input
                  type="number"
                  name="alan"
                  value={formData.alan}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Metrekare giriniz"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Haşere Türü
                </label>
                <select
                  name="hasereTuru"
                  value={formData.hasereTuru}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Seçiniz</option>
                  {hasereTurleri.map(tur => (
                    <option key={tur} value={tur}>{tur}</option>
                  ))}
                </select>
              </div>

              {/* Mekan tipine göre ek alanlar */}
              {formData.mekanTipi === 'apartman' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kat Sayısı
                    </label>
                    <input
                      type="number"
                      name="katSayisi"
                      value={formData.katSayisi}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Her Katta Daire Sayısı
                    </label>
                    <input
                      type="number"
                      name="daireSayisi"
                      value={formData.daireSayisi}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )
      case 3:
        return renderIndirimVeRandevu()
      case 4:
        return (
          <div className="space-y-6">
            {renderOzet()}
            <div className="flex items-center justify-center mt-8">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              >
                Teklif Al
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8">İlaçlama Teklifi Al</h1>
          
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`flex items-center ${num < step ? 'text-emerald-600' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${num <= step ? 'border-emerald-600 text-emerald-600' : 'border-gray-300'}`}>
                  {num}
                </div>
                {num < 4 && <div className={`h-1 w-full ${num < step ? 'bg-emerald-600' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50"
              >
                Geri
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
              >
                İlerle
              </button>
            ) : (
              <button
                onClick={() => {/* Form gönderme işlemi */}}
                className="ml-auto px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
              >
                Teklif Al
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeklifAl 