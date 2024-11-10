# Leaflet-Angular

Projede, Angular'ın en güncel özelliklerini kullanarak kurumsal düzeyde Angular uygulamalarının nasıl geliştirileceğine dair temel prensipler ve yapıları göstermeyi amaçladım.

## Teknik Özellikler

-   **Leaflet Harita Entegrasyonu**: Leaflet harita kütüphanesi, Angular directives kullanılarak entegre edildi. Leaflet haritasını bir directive olarak tanımlayarak, bu haritayı farklı bileşenlerde veya sayfalarda kullanılması amaçlandı. Leaflet gibi harita kütüphaneleri DOM üzerinde işlem yaptığı için directives kullanmak iyi performans veriyordu. Ayrıca harita kütüphanesini componentlerden ayırarak kodun modülerliğini arttırırken, bağımlılıkları da azaltılmış oldu.

-   **Mock Data Servisi**: Gerçek zamanlı veri akışını simüle etmek için RxJS kullanılarak bir mock-data servisi oluşturulmuştur. Bu servis, geliştirme ortamında kullanılmak üzere tasarlanmıştır. `BaseDataService` sınıfı, veri servisleri için bir abstraction katmanı sağlar. Bu yapı, farklı veri kaynaklarının (örneğin, mock veya gerçek veri servisleri) kolayca entegre edilmesine olanak tanır.

## Kod Kalitesi ve Standartlar

-   **Signal'ler**: Projede, Angular'ın ilerleyen versiyonlarında adını sıkça duyacağımız Zoneless kavramı içinde kritik olan signal'ler kullanılmıştır. Signal'ler gerek RxJS ile uyumlu çalışması gerekse kolay kullanımıyla uygulamanın performansını arttıracak önemli etkenlerden biridir.

-   **Commit Standartları**: Projede, commit mesajları için Conventional Commits standartları kullanılmıştır. Bu, değişikliklerin daha anlaşılır ve takip edilebilir olmasını sağlar.

-   **Modüler ve Ölçeklenebilir Yapı**: Proje, modüler bir yapıya sahiptir ve bu sayede kolayca ölçeklenebilir. Bileşenler ve servisler, bağımsız olarak geliştirilebilir ve test edilebilir.
