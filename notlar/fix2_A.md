# fix2_A — 2. tur grup A düzeltmeleri (patch_fix2A.json, tek blok: applyCues() öncesi)

| bulgu | yapılan |
|---|---|
| HS_BAL:1 omuz kulağa (headstand) | kurulum scap: "Ellerle yere bas, omuzları kulaktan uzaklaştır"; hareket karesi koç çizgisi line+ang:elb (dep etiketi yok) |
| HS_BAL:2 "raf (90°)" / "koltuk altı" | arm: "Dirsekler hafif bükük: dizlere raf olur"; knees: "Dizler dirseklerin dış-üstüne yaslanır" |
| HS_BAL:3 parmakla it çelişkisi | adım: "Parmak uçlarıyla yumuşak kon, avuçla yeniden it" |
| HS_BAL:6 / HS_PARA:5 avuç topuğu inset | yeni INSET 'hands-heel' (yazı "avuç topuğuyla it"); HS_PARA:5 kısa etiket "avuç topuğu" |
| HS_BAL:5/9, HS_ENTRY:2/9, HS_PARA:6/8 altyazı gecikmesi | motor 3. tur (hedef kare altyazısı) ile çözülmüş; yeniden çizimde doğrulandı |
| HS_ENTRY:1 çıkış öğretilmiyor | kurulum adımı eklendi: "Çıkış: ağırlığı bir ele aktar, öbür eli kaldır; kalça yana döner, ayakla yere in" |
| HS_ENTRY:9 başlangıçta omuz bilek gerisinde | k0 omuz bilek üstünde (S x .02), kalça bacak boyuna göre yeniden konumlandı (diz düz) |
| HS_LINE:2/3, HS_PARA:1/2 kur 6 poz hedefe gitmiyor | kurulum motoru başlangıç pozunu (k0) kullanıyor ve hatayı k0'a düzeltiyor; k0'ın ötesine gidemez. Kare sırasını ters çevirmek altyazı yönünü bozduğu için denendi, geri alındı. İpucu metni başlangıcı + hareketin yönünü anlatacak şekilde yazıldı ("Ters V'de başla…; harekette omuz bileğin üstüne kayar", "Ayaklar kutuda başla; kalçayı omuz üstüne it…") |
| HS_LINE:3, PPU_HSPU:6, HS_SHIFT:2/3, HS_PARA:2 diz sarkması | kutudaki ayak bacak boyuna çekildi: dizler tam düz (tüm kareler) |
| HS_LINE:1/7/9, HS_PARA:4 "omuz aşağı" + yukarı ok | MOTOR: 'dep' etiketi ters duruşta "omuz çökük"/"kulaktan uzak" demeli (anatomik yön doğru); veriyle değiştirilemedi |
| HS_PARA:2 etiket kutu üstünde | motor 3. tur (etiket ekipmandan kaçar); yeniden çizimde sorun görülmedi |
| HS_PARA:4 gövde duvara giriyor, duvar kısa | duvar x −0.235, yükseklik 2.65 |
| HS_PARA:9 "bacak 95°" ~70° çizim | straddle genişletildi (her bacak ~47°). MOTOR notu: fwide açısı kalça merkezinden ölçülüyor (şimdi 111° yazıyor, kalça eklemlerinden ~95°) — ölçüm kalça eklemlerinden yapılmalı |
| HS_SHIFT:1 etiket hep "ortada"; "ayak ucu sivri" | kalça da yüklenen ele kayar (±.05): etiket solda/ortada/sağda; legs: "Dizler kilitli, ayaklar bitişik, parmak ucunda" |
| HS_SHIFT:2 (kritik) el kalkmıyor, dirsek bükülüyor | arka (gri) el 3 cm dik kalkar, öne kaymaz; ön destek kolu kilitli; altyazı "Bir el 2-3 cm kalkar, ağırlık öbür elde; gövde sabit". MOTOR sınırı: tek omuz noktası olduğundan kalkan kol düz kalamaz (~148°); kol başına omuz yükselmesi gerekir |
| HS_SHIFT:3 el omuz altına | dokunan el omuz hizasında |
| HS_SHIFT:5 kalkan kol yana açılıyor | MOTOR sınırı (yukarıdakiyle aynı) — değiştirilmedi |
| HS_SHIFT:6 etiket sağ/sol atlıyor | gövde-kalça destek elinin üstüne yığıldı (S .14/.2, P .18/.26); dokunuş elinin karşı omza gitmesi; etiket artık hep "sağda". MOTOR notu: fshift orta noktası kalkan eli de sayıyor — sadece yerdeki eller sayılmalı |
| HS_SHIFT:8 çekül yanlış taraftan | gövde destek eline yığıldı (S .18, P .24). MOTOR notu: çekül orta noktası uzanan kolu sayıyor (yukarıdakiyle aynı) |
| HS_SHIFT:4–8 CTW önden yüz görünüyor | MOTOR: önden "arkadan görünüş" (gözsüz baş) bayrağı yok; veriyle çözülemedi |
| PPU_HSPU:1 parmak ucu (dizler yerde) | pelvis: "Dizler yerde, hafif öne yaslan: omuz bilek üstüne" |
| PPU_HSPU:3 altta kalça düşüyor | kare 3–4'te kalça omuzla birlikte yükseltildi (pike korunur, kalça ~85°) |

Değişen kodlar: HS_BAL:1,2,3,6 · HS_ENTRY:1,9 · HS_LINE:2,3 · HS_PARA:1,2,4,5,9 · HS_SHIFT:1,2,3,6,8 · PPU_HSPU:1,3,6
Testler (index_fix2A.html): rules 0 · cuetest2 0 hata · jumptest2 0 · insettest 0 hata · sutest2 0 hata · overlaytest 0 hata.
