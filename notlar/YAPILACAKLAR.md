# Kalan işler (çöp adam detay denetimi) — 28.11.2026

Durum: 2. bağımsız görsel denetim turu yapıldı (bulgular: qa2_bulgu_A/B/C/D.md).
Grup A (HS*, PPU_HSPU) düzeltmeleri sitede (fix2_A.md). B, C, D bulguları henüz düzeltilmedi.

## Sıradaki adımlar
1. Grup B (PL*, PR*) — qa2_bulgu_B.md: PL_TUCK:9 duvardan uzağa eğilme, PL_BENT:2/6 dirsek ipuçları, PL_LEAN:1 diz/ayak yerde, PL_LEAN:7 düz plank, PL_TUCK:6/8 gerçek tuck, PR_COMP:5 kalça açısı, ulaşılmayan kurulum ipuçları.
2. Grup C (PU*, DIP, LS*) — qa2_bulgu_C.md: DIP:5 kutudan çıkış, PU_VERT:4, PU_CHIN:2 zıplama, PU_SHLD:5 face pull, LS_ACTIVE:7 sıra, PU_ISO:6, PU_VERT:13 typewriter, çene bar üstü, havlu tutuş ipucu, LS_HOLD:7, LS_CROSS:2/4.
3. Grup D (LG*, CORE*, esnemeler) — qa2_bulgu_D.md: CORE_ARCH/HOLLOW/PELVIS 'diz kilitli' ama diz bükük, CORE_ARCH_1, CORE_HOLLOW_1/3, CORE_PELVIS_5 45°, LG_QUAD_7/8 arka ayak sandalyede, LG_QUAD_9 el ayakta, LG_NORDIC_1, scapular push up esnemesi, jefferson curl, leg swings, 180° split açıları, LG_QUAD:2 diz 90°.
4. Motor (veriyle çözülemeyenler):
   - Ters duruşta "omuz aşağı" + yukarı ok → "omuz kulaktan uzak" ifadesi.
   - Kol başına omuz kaldırma (tek el kaldırmada havadaki kol düz kalsın).
   - Ağırlık çizgisi sadece yerdeki ellere göre (HS_SHIFT:6/8).
   - Straddle açısı kalça eklemlerinden ölçülsün.
   - Göğüs duvara önden çizimde arkadan baş (göz yok).
   - Kurulumun başlangıç karesi seçilebilsin (HS_LINE:2/3, HS_PARA:1/2).
5. Sonra 3. denetim turu (sadece değişen seviyeler, 2 denetçi, ekonomik model).

## Araçlar (notlar/araclar)
- qa_sheet.js: her çizimin tam döngüsünü kare kare tek sayfa PNG yapar.
  `NODE_PATH=$(npm root -g) node qa_sheet.js /yol/index.html cikti_klasoru [KOD1,KOD2]`
- an/: rules.js, cuetest2.js, jumptest2.js, insettest.js, sutest2.js, overlaytest.js (çizim testleri; dosya yolunu argüman alır).
