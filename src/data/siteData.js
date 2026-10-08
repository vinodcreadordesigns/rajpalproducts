// ─── LOCAL IMAGE IMPORTS ───────────────────────────────────────────────────
import React, { useEffect, useRef, useState } from "react";
// ── Category images ─────────────────────────────────────────────────────────
import imgCategoryIncenseSticks   from "../assets/images/categories/incense-sticks.jpg";
import imgCategoryDhoopSticks     from "../assets/images/categories/dhoop-sticks.jpg";
import imgCategoryPremiumIncense  from "../assets/images/categories/premium-incense.jpg";
import imgCategoryPerfumedIncense from "../assets/images/categories/perfumed-incense.jpg";
import imgCategoryAromaFragrance  from "../assets/images/categories/aroma-fragrance.jpg";
import imgCategoryPoojaDeep       from "../assets/images/categories/pooja-deep.jpg";
import imgCategoryKhadiSoaps      from "../assets/images/categories/khadi-soaps.jpg";
import imgCategoryLongSticks      from "../assets/images/categories/long-sticks.jpg";
import imgCategoryPerfumeRollon   from "../assets/images/categories/perfume-rollon.jpg";
import imgCategoryAirFresheners   from "../assets/images/categories/air-fresheners.jpg";
import imgCategoryRawDhoop        from "../assets/images/categories/raw-dhoop.jpg";

// ── Incense Sticks ──────────────────────────────────────────────────────────
import imgSacredChandan             from "../assets/images/incense-sticks/sacred-chandan.png";
import imgSacredRose         from "../assets/images/incense-sticks/sacred-rose.png";
import imgSacredOudh                 from "../assets/images/incense-sticks/sacred-oudh.png";

import imgExoticAmber                from "../assets/images/incense-sticks/exotic-amber.jpg";
import imgExoticAmberHover           from "../assets/images/incense-sticks/exotic-amber-hover.jpg";
import imgExoticBakhoor              from "../assets/images/incense-sticks/exotic-bakhoor.jpg";
import imgExoticBakhoorHover         from "../assets/images/incense-sticks/exotic-bakhoor-hover.jpg";
import imgExoticHeena                from "../assets/images/incense-sticks/exotic-heena.jpg";
import imgExoticHeenaHover           from "../assets/images/incense-sticks/exotic-heena-hover.jpg";
import imgExoticChandan              from "../assets/images/incense-sticks/exotic-chandan.jpg";
import imgExoticChandanHover         from "../assets/images/incense-sticks/exotic-chandan-hover.jpg";
import imgExoticMusk                 from "../assets/images/incense-sticks/exotic-musk.jpg";
import imgExoticMuskHover            from "../assets/images/incense-sticks/exotic-musk-hover.jpg";
import imgExoticOudh                 from "../assets/images/incense-sticks/exotic-oudh.jpg";
import imgExoticOudhHover            from "../assets/images/incense-sticks/exotic-oudh-hover.jpg";
import imgExoticSaffron              from "../assets/images/incense-sticks/exotic-saffron.jpg";
import imgExoticSaffronHover         from "../assets/images/incense-sticks/exotic-saffron-hover.jpg";
import imgExoticRose                 from "../assets/images/incense-sticks/exotic-rose.jpg";
import imgExoticRoseHover            from "../assets/images/incense-sticks/exotic-rose-hover.jpg";

import imgPremiumOudh                from "../assets/images/incense-sticks/premium-oudh.jpg";
import imgPremiumOudhHover           from "../assets/images/incense-sticks/premium-oudh-hover.jpg";
import imgPremiumKhus                from "../assets/images/incense-sticks/premium-khus.jpg";
import imgPremiumKhusHover           from "../assets/images/incense-sticks/premium-khus-hover.jpg";
import imgPremiumChandan             from "../assets/images/incense-sticks/premium-chandan.jpg";
import imgPremiumChandanHover        from "../assets/images/incense-sticks/premium-chandan-hover.jpg";
import imgPremiumRose                from "../assets/images/incense-sticks/premium-rose.jpg";
import imgPremiumRoseHover           from "../assets/images/incense-sticks/premium-rose-hover.jpg";
import imgPremiumHeena           from "../assets/images/incense-sticks/premium-heena.jpg";
import imgPremiumHeenaHover           from "../assets/images/incense-sticks/premium-heena-hover.jpg";
import imgPremiumKesar           from "../assets/images/incense-sticks/premium-kesar.jpg";
import imgPremiumKesarHover           from "../assets/images/incense-sticks/premium-kesar-hover.jpg";



import imgUltraPremiumMajmua         from "../assets/images/incense-sticks/ultra-premium-majmua.jpg";
import imgUltraPremiumMajmuaHover    from "../assets/images/incense-sticks/ultra-premium-majmua-hover.jpg";
import imgUltraPremiumPatchouli      from "../assets/images/incense-sticks/ultra-premium-patchouli.jpg";
import imgUltraPremiumPatchouliHover from "../assets/images/incense-sticks/ultra-premium-patchouli-hover.jpg";
import imgUltraPremiumAgarwood       from "../assets/images/incense-sticks/ultra-premium-agarwood.jpg";
import imgUltraPremiumAgarwoodHover  from "../assets/images/incense-sticks/ultra-premium-agarwood-hover.jpg";
import imgUltraPremiumWhiteOudh      from "../assets/images/incense-sticks/ultra-premium-white-oudh.jpg";
import imgUltraPremiumWhiteOudhHover from "../assets/images/incense-sticks/ultra-premium-white-oudh-hover.jpg";
import imgUltraPremiumBakhoor from "../assets/images/incense-sticks/premium-bakhoor.jpg";
import imgUltraPremiumBakhoorHover from "../assets/images/incense-sticks/premium-bakhoor-hover.jpg";
import imgUltraPremiumJavadhu from "../assets/images/incense-sticks/premium-javadhu.jpg";
import imgUltraPremiumJavadhuHover from "../assets/images/incense-sticks/premium-javadhu-hover.jpg";
import imgUltraPremiumKasturi from "../assets/images/incense-sticks/premium-kasturi.jpg";
import imgUltraPremiumKasturiHover from "../assets/images/incense-sticks/premium-kasturi-hover.jpg";
import imgUltraPremiumrich from "../assets/images/incense-sticks/premium-rich.jpg";
import imgUltraPremiumrichHover from "../assets/images/incense-sticks/premium-rich-hover.jpg";

// ── Dhoop Sticks ────────────────────────────────────────────────────────────
import imgHarmony3in1                from "../assets/images/dhoop-sticks/harmony-3in1.jpg";
import imgHarmony3in1Hover           from "../assets/images/dhoop-sticks/harmony-3in1-hover.jpg";
import imgMograBliss                 from "../assets/images/dhoop-sticks/mogra-bliss.jpg";
import imgMograBlissHover            from "../assets/images/dhoop-sticks/mogra-bliss-hover.jpg";
import imgRoseElegance               from "../assets/images/dhoop-sticks/rose-elegance.jpg";
import imgRoseEleganceHover          from "../assets/images/dhoop-sticks/rose-elegance-hover.jpg";
import imgLavenderCalm               from "../assets/images/dhoop-sticks/lavender-calm.jpg";
import imgLavenderCalmHover          from "../assets/images/dhoop-sticks/lavender-calm-hover.jpg";
import imgChandanDivine              from "../assets/images/dhoop-sticks/chandan-divine.jpg";
import imgChandanDivineHover         from "../assets/images/dhoop-sticks/chandan-divine-hover.jpg";
import imgKasturiMystique            from "../assets/images/dhoop-sticks/kasturi-mystique.jpg";
import imgKasturiMystiqueHover       from "../assets/images/dhoop-sticks/kasturi-mystique-hover.jpg";
import imgChampaGolden               from "../assets/images/dhoop-sticks/champa-golden.jpg";
import imgChampaGoldenHover          from "../assets/images/dhoop-sticks/champa-golden-hover.jpg";
import imgLobanRoyale                from "../assets/images/dhoop-sticks/loban-royale.jpg";
import imgLobanRoyaleHover           from "../assets/images/dhoop-sticks/loban-royale-hover.jpg";
import imgGuggalSacred               from "../assets/images/dhoop-sticks/guggal-sacred.jpg";
import imgGuggalSacredHover          from "../assets/images/dhoop-sticks/guggal-sacred-hover.jpg";
import imgkapoorpure      from "../assets/images/dhoop-sticks/kapoorpure.jpg";
import imgkapoorpureHover      from "../assets/images/dhoop-sticks/kapoorpure-hover.jpg";
import imgLotusbloom      from "../assets/images/dhoop-sticks/lotusbloom.jpg";
import imgLotusbloomHover      from "../assets/images/dhoop-sticks/lotusbloom-hover.jpg";
import imgKewda      from "../assets/images/dhoop-sticks/kewda.jpg";
import imgKewdaHover      from "../assets/images/dhoop-sticks/kewda-hover.jpg";

//premiun dhoopsticks
import imgSpecialChandan             from "../assets/images/dhoop-sticks/special-chandan.jpg";
import imgSpecialChandanHover        from "../assets/images/dhoop-sticks/special-chandan-hover.jpg";
import imgSpecialRose                from "../assets/images/dhoop-sticks/special-rose.jpg";
import imgSpecialRoseHover           from "../assets/images/dhoop-sticks/special-rose-hover.jpg";
import imgPeace                      from "../assets/images/dhoop-sticks/peace.jpg";
import imgAromadhoop                      from "../assets/images/dhoop-sticks/aromadhoop.jpg";
import imgAromadhoopHover                 from "../assets/images/dhoop-sticks/aromadhoop-hover.jpg";
import imgPeaceHover                 from "../assets/images/dhoop-sticks/peace-hover.jpg";
import imgRichGold                   from "../assets/images/dhoop-sticks/rich-gold.jpg";
import imgRichGoldHover              from "../assets/images/dhoop-sticks/rich-gold-hover.jpg";
import imgDivineMeditation           from "../assets/images/dhoop-sticks/divine-meditation.jpg";
import imgDivineMeditationHover      from "../assets/images/dhoop-sticks/divine-meditation-hover.jpg";
import imgRedWoodDhoop               from "../assets/images/dhoop-sticks/red-wood.jpg";
import imgRedWoodDhoopHover          from "../assets/images/dhoop-sticks/red-wood-hover.jpg";
import imgprayerdhoop          from "../assets/images/dhoop-sticks/prayerdhoop.jpg";
import imgprayerdhoopHover          from "../assets/images/dhoop-sticks/prayerdhoop-hover.jpg";
import imgPurple          from "../assets/images/dhoop-sticks/purple.jpg";
import imgPurpleHover         from "../assets/images/dhoop-sticks/purple-hover.jpg";
import imgKesarChandan               from "../assets/images/dhoop-sticks/kesar-chandan.jpg";
import imgKesarChandanHover          from "../assets/images/dhoop-sticks/kesar-chandan-hover.jpg";
import imgSaffronDhoop               from "../assets/images/dhoop-sticks/saffron.jpg";
import imgSaffronDhoopHover          from "../assets/images/dhoop-sticks/saffron-hover.jpg";
import imgMechanizzGold         from "../assets/images/dhoop-sticks/mechnizz.jpg";
import imgMechanizzGoldHover          from "../assets/images/dhoop-sticks/mechnizz-hover.jpg";
import imgrainForest          from "../assets/images/dhoop-sticks/rain-forest.jpg";
import imgrainForestHover          from "../assets/images/dhoop-sticks/rain-forest-hover.jpg";
import imgtathastu          from "../assets/images/dhoop-sticks/tathastuu.jpg";
import imgtathastuHover          from "../assets/images/dhoop-sticks/tathastuu-hover.jpg";
import imgSpanishLev          from "../assets/images/dhoop-sticks/spanishlev.jpg";
import imgSpanishLevHover          from "../assets/images/dhoop-sticks/spanishdev-hover.jpg";


//nature banquet dhopp sticks
import imgHarmonydhoop      from "../assets/images/dhoop-stickss/harmoneydhoop.jpg";
import imgHarmonydhoopHover      from "../assets/images/dhoop-stickss/harmoneydhoop-hover.jpg";
import imgMograbliss     from "../assets/images/dhoop-stickss/mograblissdhopp.jpg";
import imgMograblissHover      from "../assets/images/dhoop-stickss/mograblissdhopp-hover.jpg";
import imgRoseelegance      from "../assets/images/dhoop-stickss/roseelegance.jpg";
import imgRoseeleganceHover      from "../assets/images/dhoop-stickss/roseelegance-hover.jpg";
import imgLotus      from "../assets/images/dhoop-stickss/Lotus.jpg";
import imgLotusHover      from "../assets/images/dhoop-stickss/Lotus-hover.jpg";
import imgLevendercalm      from "../assets/images/dhoop-stickss/Lavender.jpg";
import imgLevendercalmHover      from "../assets/images/dhoop-stickss/Lavender-hover.jpg";
import imgChandandivine      from "../assets/images/dhoop-stickss/chandandivine.jpg";
import imgChandandivineHover      from "../assets/images/dhoop-stickss/chandandivine-hover.jpg";
import imgChampagolden      from "../assets/images/dhoop-stickss/champagolden.jpg";
import imgChampagoldenHover      from "../assets/images/dhoop-stickss/champagolden-hover.jpg";
import imgMist      from "../assets/images/dhoop-stickss/kewda.jpg";
import imgMistHover      from "../assets/images/dhoop-stickss/kewda-hover.jpg";
import imgKasturimy     from "../assets/images/dhoop-stickss/kasturi.jpg";
import imgKasturimyHover      from "../assets/images/dhoop-stickss/kasturi-hover.jpg";
import imgKapoor     from "../assets/images/dhoop-stickss/kapoor.jpg";
import imgKapoorHover      from "../assets/images/dhoop-stickss/kapoor-hover.jpg";
import imgLoban      from "../assets/images/dhoop-stickss/lobandhoop.jpg";
import imgLobanHover      from "../assets/images/dhoop-stickss/lobandhoop-hover.jpg";
import imgGuggal      from "../assets/images/dhoop-stickss/guggaldhoop.jpg";
import imgGuggalHover      from "../assets/images/dhoop-stickss/guggaldhoop-hover.jpg";


//premium masala dhoopsticks
import imgAnumati      from "../assets/images/dhoop-sticks/anumati.jpg";
import imgAnumatiHover      from "../assets/images/dhoop-sticks/anumati-hover.jpg";
import imgAzzaroRose      from "../assets/images/dhoop-sticks/azzaro.jpg";
import imgAzzaroRoseHover     from "../assets/images/dhoop-sticks/azzaro-hover.jpg";
import imgBhumiflora     from "../assets/images/dhoop-sticks/bhumiflora.jpg";
import imgBhumifloraHover      from "../assets/images/dhoop-sticks/bhumiflora-hover.jpg";
import imgBlackrose      from "../assets/images/dhoop-sticks/blackrose.jpg";
import imgBlackroseHover      from "../assets/images/dhoop-sticks/blackrose-hover.jpg";
import imgBlackSapp     from "../assets/images/dhoop-sticks/bluesapp.jpg";
import imgBlackSappHover     from "../assets/images/dhoop-sticks/bluesapp-hover.jpg";
import imgMeditation    from "../assets/images/dhoop-sticks/divinemedi.jpg";
import imgMeditationHover    from "../assets/images/dhoop-sticks/divinemedi-hover.jpg";
import imgFuitsForest    from "../assets/images/dhoop-sticks/fruitforest.jpg";
import imgFuitsForestHover    from "../assets/images/dhoop-sticks/fruitforest-hover.jpg";
import imgGardenbreeze    from "../assets/images/dhoop-sticks/gardenbreeze.jpg";
import imgGardenbreezeHover    from "../assets/images/dhoop-sticks/gardenbreeze-hover.jpg";
import imgGoldSandal    from "../assets/images/dhoop-sticks/goldsandal.jpg";
import imgGoldSandalHover    from "../assets/images/dhoop-sticks/goldsandal-hover.jpg";
import imgHeaven   from "../assets/images/dhoop-sticks/heaven.jpg";
import imgHeavenHover    from "../assets/images/dhoop-sticks/heaven-hover.jpg";
import imgHerbalLeaf    from "../assets/images/dhoop-sticks/herballeaf.jpg";
import imgHerbalLeafHover    from "../assets/images/dhoop-sticks/herballeaf-hover.jpg";
import imgKesarchandan   from "../assets/images/dhoop-sticks/kesarchandan.jpg";
import imgKesarchandanHover    from "../assets/images/dhoop-sticks/kesarchandan-hover.jpg";
import imgKasturikesar    from "../assets/images/dhoop-sticks/kesarkasturi.jpg";
import imgKasturikesarHover    from "../assets/images/dhoop-sticks/kesarkasturi-hover.jpg";
import imgMechanizGold    from "../assets/images/dhoop-sticks/mechanizegold.jpg";
import imgMechanizGoldHover    from "../assets/images/dhoop-sticks/mechanizegold-hover.jpg";
import imgNagChampa    from "../assets/images/dhoop-sticks/nagchampa.jpg";
import imgNagChampaHover    from "../assets/images/dhoop-sticks/nagchampa-hover.jpg";
import imgPeacemasala    from "../assets/images/dhoop-sticks/peacemasal.jpg";
import imgPeacemasalaHover    from "../assets/images/dhoop-sticks/peacemasal-hover.jpg";
import imgPrayer    from "../assets/images/dhoop-sticks/prayer.jpg";
import imgPrayerHover    from "../assets/images/dhoop-sticks/prayer-hover.jpg";
import imgPurePanadi    from "../assets/images/dhoop-sticks/purepanadi.jpg";
import imgPurePanadiHover    from "../assets/images/dhoop-sticks/purepanadi-hover.jpg";
import imgRainForest    from "../assets/images/dhoop-sticks/rainforest.jpg";
import imgRainForestHover    from "../assets/images/dhoop-sticks/rainforest-hover.jpg";
import imgRedWood    from "../assets/images/dhoop-sticks/redwood.jpg";
import imgRedWoodHover    from "../assets/images/dhoop-sticks/redwood-hover.jpg";
import imgRichGoldd    from "../assets/images/dhoop-sticks/richgold.jpg";
import imgRichGolddHover    from "../assets/images/dhoop-sticks/richgold-hover.jpg";
import imgSilverGold    from "../assets/images/dhoop-sticks/silvergold.jpg";
import imgSilverGoldHover    from "../assets/images/dhoop-sticks/silvergold-hover.jpg";
import imgSpanishLevender    from "../assets/images/dhoop-sticks/spanishlevender.jpg";
import imgSpanishLevenderHover    from "../assets/images/dhoop-sticks/spanishlevender-hover.jpg";
import imgTathastu    from "../assets/images/dhoop-sticks/tathastu.jpg";
import imgTathastuHover    from "../assets/images/dhoop-sticks/tathastu-hover.jpg";
import imgTouchWood    from "../assets/images/dhoop-sticks/touchwood.jpg";
import imgTouchWoodHover    from "../assets/images/dhoop-sticks/touchwood-hover.jpg";
import imgFlora    from "../assets/images/dhoop-sticks/flora.jpg";
import imgFloraHover    from "../assets/images/dhoop-sticks/flora-hover.jpg";
import imgWhiteMusk    from "../assets/images/dhoop-sticks/whitemusk.jpg";
import imgWhiteMuskHover    from "../assets/images/dhoop-sticks/whitemusk-hover.jpg";
import imgWhiteSage    from "../assets/images/dhoop-sticks/whitesage.jpg";
import imgWhiteSageHover    from "../assets/images/dhoop-sticks/whitesage-hover.jpg";
import imgtirumalaa    from "../assets/images/dhoop-sticks/tirumalaa.jpg";
import imgtirumalaaHover    from "../assets/images/dhoop-sticks/tirumalaa-hover.jpg";
import imgmysorechandan    from "../assets/images/dhoop-sticks/mysorechandan.jpg";
import imgmysorechandanHover    from "../assets/images/dhoop-sticks/mysorechandan-hover.jpg";


// raw dhoop category
import imgKaniDhoop from "../assets/images/raw-dhoop/kani-dhoop.jpg";
import imgKaniDhoopHover from '../assets/images/raw-dhoop/kani-dhoop-hover.jpg';
import imgKhadaDhoop from "../assets/images/raw-dhoop/khada-dhoop.jpg";
import imgKhadaDhoopHover from "../assets/images/raw-dhoop/khada-dhoop-hover.jpg";
import imgBhimsenKapoorDhoop from "../assets/images/raw-dhoop/bhimsen-kapoor.jpg";
import imgBhimenKapoorDhoopHover from "../assets/images/raw-dhoop/bhimsen-kapoor-hover.jpg";
import imgParsiFloaters from "../assets/images/raw-dhoop/parsi-floaters.jpg";
import imgParsiFloatersHover from "../assets/images/raw-dhoop/parsi-floaters-hover.jpg";
import imgPureGuggal from "../assets/images/raw-dhoop/pure-guggal.jpg";
import imgPureGuggalHover from "../assets/images/raw-dhoop/pure-guggal-hover.jpg";
import imgPureLoban from "../assets/images/raw-dhoop/pure-loban.jpg";
import imgPureLobanHover from "../assets/images/raw-dhoop/pure-loban-hover.jpg";

//dhoop cups category
import imgGuggleCups from "../assets/images/categories/dhup-cups/guggle-cups.jpg";
import imgGuggleCupsHover from "../assets/images/categories/dhup-cups/guggle-cups-hover.jpg";
import imgLobanCups from "../assets/images/categories/dhup-cups/loban-cups.jpg";
import imgLobanCupsHover from "../assets/images/categories/dhup-cups/loban-cups-hover.jpg";
import imgRedWoodDhoopCups from "../assets/images/categories/dhup-cups/red-wood-cups.jpg";
import imgRedWoodDhoopCupsHover from "../assets/images/categories/dhup-cups/red-wood-cups-hover.jpg";
import imgSandalDhoopcups from "../assets/images/categories/dhup-cups/sandal-cups.jpg";
import imgSandalDhoopcupsHover from "../assets/images/categories/dhup-cups/sandal-cups-hover.jpg";

//natural-incense category image
 import imgDevdutt from "../assets/images/natural-incense/devdutt.jpg";
import imgDevduttHover from "../assets/images/natural-incense/devdutthover.jpg";
import imgDhyanrath from "../assets/images/natural-incense/dhyanarth.jpg";
import imgDhyanrathHover from "../assets/images/natural-incense/dhyanarthhover.jpg";
import imgMahatejas from "../assets/images/natural-incense/mahatejas.jpg";
import imgMahatejasHover from "../assets/images/natural-incense/mahatejashover.jpg";
import imgShivansh from "../assets/images/natural-incense/shivansh.jpg";
import imgShivanshHover from "../assets/images/natural-incense/shivanshhover.jpg";
import imgShrivardhan from "../assets/images/natural-incense/shrivardhan.jpg";
import imgShrivardhanHover from "../assets/images/natural-incense/shrivardhanhover.jpg";
import imgSudharshan from "../assets/images/natural-incense/sudharshan.jpg";
import imgSudharshanHover from "../assets/images/natural-incense/sudharshanhover.jpg";
import imgTapodhan from "../assets/images/natural-incense/tapodhan.jpg";
import imgTapodhanHover from "../assets/images/natural-incense/tapodhan-hover.jpg";
import imgTejomoy from "../assets/images/natural-incense/tejomay.jpg";
import imgTejomoyHover from "../assets/images/natural-incense/tejomay-hover.jpg";

//perfume-incense category images
import img3Fragrance from "../assets/images/perfume-incense/3fragrance.jpg";
import img3FragranceHover from"../assets/images/perfume-incense/3fragrance-hover.jpg";
import imgAngle from "../assets/images/perfume-incense/angle.jpg";
import imgAngleHover from "../assets/images/perfume-incense/angle-hover.jpg";
import imgAromaa from "../assets/images/perfume-incense/aroma.jpg";
import imgAromaaHover from "../assets/images/perfume-incense/aroma-hover.jpg";
import imgAttar from "../assets/images/perfume-incense/attar.jpg";
import imgAttarHover from "../assets/images/perfume-incense/attar-hover.jpg";
import imgBlackMusk from "../assets/images/perfume-incense/black-musk.jpg";
import imgBlackMuskHover from "../assets/images/perfume-incense/black-musk-hover.jpg";
import imgBlossom from "../assets/images/perfume-incense/blossom.jpg";
import imgBlossomHover from "../assets/images/perfume-incense/blossom-hover.jpg";
import imgChampa from "../assets/images/perfume-incense/champa.jpg";
import imgChampaHover from "../assets/images/perfume-incense/champa-hover.jpg";
import imgChandan from "../assets/images/perfume-incense/chandan.jpg";
import imgChandanHover from "../assets/images/perfume-incense/chandan-hover.jpg";
import imgDeepnandan from "../assets/images/perfume-incense/deepnandan.jpg";
import imgDeepnandanHover from "../assets/images/perfume-incense/deepnandan-hover.jpg";
import imgDewDrop from "../assets/images/perfume-incense/dewdrop.jpg";
import imgDewDropHover from "../assets/images/perfume-incense/dewdrop-hover.jpg";
import imgDivineMeditationn from "../assets/images/perfume-incense/divinemed.jpg";
import imgDivineMeditationnHover from "../assets/images/perfume-incense/divinemed-hover.jpg";
import imgDreams from "../assets/images/perfume-incense/dreams.jpg";
import imgDreamsHover from "../assets/images/perfume-incense/dreams-hover.jpg";
import imgFancyFlower from "../assets/images/perfume-incense/fancyflower.jpg";
import imgFancyFlowerHover from "../assets/images/perfume-incense/fancyflower-hover.jpg";
import imgFantasia from "../assets/images/perfume-incense/fantasia.jpg";
import imgFantasiaHover from "../assets/images/perfume-incense/fantasia-hover.jpg";
import imgFirdous from "../assets/images/perfume-incense/firdous.jpg";
import imgFirdousHover from "../assets/images/perfume-incense/firdous-hover.jpg";
import imgFreshperfume from "../assets/images/perfume-incense/freshperfume.jpg";
import imgFreshperfumeHover from "../assets/images/perfume-incense/freshperfume-hover.jpg";
import imgFresh from "../assets/images/perfume-incense/Fresh.jpg";
import imgFreshHover from "../assets/images/perfume-incense/fresh-hover.jpg";
import imgguggalkapoor from "../assets/images/perfume-incense/guggalkapoor.jpg";
import imgguggalkapoorHover from "../assets/images/perfume-incense/guggalkapoor-hover.jpg";
import imgHeena from "../assets/images/perfume-incense/heena.jpg";
import imgHeenaHover from "../assets/images/perfume-incense/heena-hover.jpg";
import imgIntimate from "../assets/images/perfume-incense/intimate.jpg";
import imgIntimateHover from "../assets/images/perfume-incense/intimate-hover.jpg";
import imgJiya from "../assets/images/perfume-incense/jiya.jpg";
import imgJiyaHover from "../assets/images/perfume-incense/jiya-hover.jpg";
import imgKacchaBela from "../assets/images/perfume-incense/kacchabela.jpg";
import imgKacchaBelaHover from "../assets/images/perfume-incense/kacchabela-hover.jpg";
import imgKasturi from "../assets/images/perfume-incense/kasturi.jpg";
import imgKasturiHover from "../assets/images/perfume-incense/kasturi-hover.jpg";
import imgKasturigold from "../assets/images/perfume-incense/kasturigold.jpg";
import imgKasturigoldHover from "../assets/images/perfume-incense/kasturigold-hover.jpg";
import imgKesarChandann from "../assets/images/perfume-incense/kesarchandan.jpg";
import imgKesarChandannHover from "../assets/images/perfume-incense/kesarchandan-hover.jpg";
import imgKhus from "../assets/images/perfume-incense/khus.jpg";
import imgKhusHover from "../assets/images/perfume-incense/khus-hover.jpg";
import imgKonkanExpress from "../assets/images/perfume-incense/konkanexpress.jpg";
import imgKonkanExpressHover from "../assets/images/perfume-incense/konkanexpress-hover.jpg";
import imgLevender from "../assets/images/perfume-incense/lavender.jpg";
import imgLevenderHover from "../assets/images/perfume-incense/lavender-hover.jpg";
import imgLondonnight from "../assets/images/perfume-incense/london.jpg";
import imgLondonnightHover from "../assets/images/perfume-incense/london-hover.jpg";
import imgMango from "../assets/images/perfume-incense/mango.jpg";
import imgMangoHover from "../assets/images/perfume-incense/mango-hover.jpg";
import imgMogra from "../assets/images/perfume-incense/mogra.jpg";
import imgMograHover from "../assets/images/perfume-incense/mogra-hover.jpg";
import imgMusk from "../assets/images/perfume-incense/musk.jpg";
import imgMuskHover from "../assets/images/perfume-incense/musk-hover.jpg";
import imgMuskmelon from "../assets/images/perfume-incense/muskmelon.jpg";
import imgMuskmelonHover from "../assets/images/perfume-incense/muskmelon-hover.jpg";
import imgMysorechandan from "../assets/images/perfume-incense/mysorechandan.jpg";
import imgMysorechandanHover from "../assets/images/perfume-incense/mysorechandan-hover.jpg";
import imgPaanSugandh from "../assets/images/perfume-incense/paansugandh.jpg";
import imgPaanSugandhHover from "../assets/images/perfume-incense/paansugandh-hover.jpg";
import imgPanadi from "../assets/images/perfume-incense/panadi.jpg";
import imgPanadiHover from "../assets/images/perfume-incense/panadi-hover.jpg";
import imgParadise from "../assets/images/perfume-incense/paradise.jpg";
import imgParadiseHover from "../assets/images/perfume-incense/paradise-hover.jpg";
import imgPassion from "../assets/images/perfume-incense/passion.jpg";
import imgPassionHover from "../assets/images/perfume-incense/passion-hover.jpg";
import imgPineapple from "../assets/images/perfume-incense/pineapple.jpg";
import imgPineappleHover from "../assets/images/perfume-incense/pineapple-hover.jpg";
import imgPureLilly from "../assets/images/perfume-incense/purelilly.jpg";
import imgPureLillyHover from "../assets/images/perfume-incense/purelilly-hover.jpg";
import imgPureLobann from "../assets/images/perfume-incense/pureloban.jpg";
import imgPureLobannHover from "../assets/images/perfume-incense/pureloban-hover.jpg";
import imgRajnigandha from "../assets/images/perfume-incense/rajnigandha.jpg";
import imgRajnigandhaHover from "../assets/images/perfume-incense/rajnigandha-hover.jpg";
import imgRajpalSpecial from "../assets/images/perfume-incense/rajpalspecial.jpg";
import imgRajpalSpecialHover from "../assets/images/perfume-incense/rajpalspecial-hover.jpg";
import imgRichFeel from "../assets/images/perfume-incense/richfeel.jpg";
import imgRichFeelHover from "../assets/images/perfume-incense/richfeel-hover.jpg";
import imgRose from "../assets/images/perfume-incense/rose.jpg";
import imgRoseHover from "../assets/images/perfume-incense/rose-hover.jpg";
import imgRoyalKing from "../assets/images/perfume-incense/royalking.jpg";
import imgRoyalKingHover from "../assets/images/perfume-incense/royalking-hover.jpg";
import imgSandalum from "../assets/images/perfume-incense/sandalum.jpg";
import imgSandalumHover from "../assets/images/perfume-incense/sandalum-hover.jpg";
import imgSringargold from "../assets/images/perfume-incense/sringargold.jpg";
import imgSringargoldHover from "../assets/images/perfume-incense/sringargold-hover.jpg";
import imgSweethoney from "../assets/images/perfume-incense/sweethoney.jpg";
import imgSweethoneyHover from "../assets/images/perfume-incense/sweethoney-hover.jpg";
import imgTatvam from "../assets/images/perfume-incense/tatvam.jpg";
import imgTatvamHover from "../assets/images/perfume-incense/tatvam-hover.jpg";
import imgTulipgarden from "../assets/images/perfume-incense/tulipgarden.jpg";
import imgTulipgardenHover from "../assets/images/perfume-incense/tulipgarden-hover.jpg";
import imgViolet from "../assets/images/perfume-incense/violet.jpg";
import imgVioletHover from "../assets/images/perfume-incense/violet-hover.jpg";
import imgsignature from "../assets/images/perfume-incense/signature.jpg";
import imgsignatureHover from "../assets/images/perfume-incense/signature-hover.jpg";

// fruist

import imgGrapes from "../assets/images/fruites/Grapes.jpg";
import imgGrapesHover from "../assets/images/fruites/grapes-hover.jpg";
import imgPeach from "../assets/images/fruites/peach.jpg";
import imgPeachHover from "../assets/images/fruites/peach-hover.jpg";
import imgPineapple2 from "../assets/images/fruites/pineapple.jpg";
import imgPineapple2Hover from "../assets/images/fruites/pineapple-hover.jpg";
import imgRedgauva from "../assets/images/fruites/red-gauva.jpg";
import imgRedgauvaHover from "../assets/images/fruites/red-gauva-hover.jpg";
import imgStrawberry from "../assets/images/fruites/strawberry.jpg";
import imgStrawberryHover from "../assets/images/fruites/strawberry-hover.jpg";
import imgWatermelon from "../assets/images/fruites/watermelon.jpg";
import imgWatermelonHover from "../assets/images/fruites/watermelon-hover.jpg";

//9-inch longsticks
import imgAroma                      from "../assets/images/dhoop-sticks/aroma.jpg";
import imgAromaHover                 from "../assets/images/dhoop-sticks/aroma-hover.jpg";
import imgSignatureDhoop           from "../assets/images/dhoop-sticks/signature.jpg";
import imgSignatureDhoopHover      from "../assets/images/dhoop-sticks/signature-hover.jpg";
import imgRoyalKingDhoop           from "../assets/images/dhoop-sticks/royal-king.jpg";
import imgRoyalKingDhoopHover      from "../assets/images/dhoop-sticks/royal-king-hover.jpg";
import imgMysoreChandan              from "../assets/images/dhoop-sticks/mysore-chandan.jpg";
import imgMysoreСhandanHover         from "../assets/images/dhoop-sticks/mysore-chandan-hover.jpg";
import imgDivinemeditation           from "../assets/images/dhoop-sticks/meditation.jpg"
import imgDivinemeditationHover           from "../assets/images/dhoop-sticks/meditation-hover.jpg"
import imgDreams9           from "../assets/images/dhoop-sticks/dreams.jpg"
import imgDreams9Hover           from "../assets/images/dhoop-sticks/dreams-hover.jpg"
import imgfantasia          from "../assets/images/dhoop-sticks/fantasia.jpg"
import imgfantasiaHover          from "../assets/images/dhoop-sticks/fantasia-hover.jpg"
import imgIntimate9         from "../assets/images/dhoop-sticks/intimate.jpg"
import imgIntimate9Hover         from "../assets/images/dhoop-sticks/intimate-hover.jpg"
import imgKasturigold9         from "../assets/images/dhoop-sticks/kasturigold.jpg"
import imgKasturigold9Hover         from "../assets/images/dhoop-sticks/kasturigold-hover.jpg"
import imgParadise9      from "../assets/images/dhoop-sticks/paradise.jpg"
import imgParadise9Hover       from "../assets/images/dhoop-sticks/paradise-hover.jpg"
import imgRichfeel       from "../assets/images/dhoop-sticks/richfeel.jpg"
import imgRichfeelHover       from "../assets/images/dhoop-sticks/richfeel-hover.jpg"
import  imgKhuswalaDhoop       from "../assets/images/dhoop-sticks/khusvala.jpg"
import  imgKhuswalaHover       from "../assets/images/dhoop-sticks/khusvala-hover.jpg"

//car fresher 
import  imgCategoryAroma       from "../assets/images/carair/aromacar.jpg"
import  imgCategoryAromaHover       from "../assets/images/carair/aromacar-hover.jpg"
import  imgSandalair       from "../assets/images/carair/sandalair.jpg"
import  imgAromaticair       from "../assets/images/carair/aromaticair.jpg"
import  imgLemongressair      from "../assets/images/carair/lemongressair.jpg"
import  imgJasmineair       from "../assets/images/carair/jasmineair.jpg"
import  imgRosepinkair       from "../assets/images/carair/rosepinkair.jpg"
import  imgLevenderair       from "../assets/images/carair/levenderair.jpg"
import  imgOriginalair       from "../assets/images/carair/originalair.jpg"

//deep
import  imgdeepcow      from "../assets/images/carair/deepcow.jpg"
import  imgdeepcowhover      from "../assets/images/carair/deepcow-hover.jpg"
import  imgdeepcow50      from "../assets/images/carair/deepcow50.jpg"
import  imgdeepcow50hover      from "../assets/images/carair/deepcow50-hover.jpg"
import  imgdeepcow60      from "../assets/images/carair/deepcow60.jpg"
import  imgdeepcow60hover      from "../assets/images/carair/deepcow60-hover.jpg"
import  imgdeepcow100     from "../assets/images/carair/deepcow100.jpg"
import  imgdeepcow100hover      from "../assets/images/carair/deepcow100-hover.jpg"

import   imgvasnpati      from "../assets/images/carair/vanaspati.jpg"
import   imgvasnpatihover      from "../assets/images/carair/vanaspati-hover.jpg"
import   imgvasnpati30      from "../assets/images/carair/vanaspati30.jpg"
import   imgvasnpati30hover      from "../assets/images/carair/vanaspati30-hover.jpg"
import   imgvasnpati50      from "../assets/images/carair/vanaspati50.jpg"
import   imgvasnpati50hover      from "../assets/images/carair/vanaspati50-hover.jpg"
import   imgvasnpati100      from "../assets/images/carair/vanaspati100.jpg"
import   imgvasnpati100hover      from "../assets/images/carair/vanaspati100-hover.jpg"

//longsticks 
import   imgBhumifloralong      from "../assets/images/longsticks/bhumi.jpg"
import   imgBhumifloralongHover      from "../assets/images/longsticks/bhumi-hover.jpg"
import   imgBluesapplong      from "../assets/images/longsticks/bluesapplong.jpg"
import   imgBluesapplongHover      from "../assets/images/longsticks/bluesapplong-hover.jpg"
import   imgherballeaflong      from "../assets/images/longsticks/leaf.jpg"
import   imgherballeaflongHover      from "../assets/images/longsticks/leaf-hover.jpg"
import   imgkesarkasturilong      from "../assets/images/longsticks/kasturi.jpg"
import   imgkesarkasturilongHover      from "../assets/images/longsticks/kasturi-hover.jpg"
import   imgmechanizelong      from "../assets/images/longsticks/mecgold.jpg"
import   imgmechanizelongHover      from "../assets/images/longsticks/mecgold-hover.jpg"
import   imgRedlong      from "../assets/images/longsticks/redlong.jpg"
import   imgRedlongHover      from "../assets/images/longsticks/redlong-hover.jpg"
import   imgtathastulong      from "../assets/images/longsticks/tathastulong.jpg"
import   imgtathastulongHover      from "../assets/images/longsticks/tathastulong-hover.jpg"
import   imgtirumala      from "../assets/images/longsticks/tirumala.jpg"
import   imgtirumalaHover      from "../assets/images/longsticks/tirumala-hover.jpg"
import   imgflora      from "../assets/images/longsticks/flora.jpg"
import   imgfloraHover      from "../assets/images/longsticks/flora-hover.jpg"
import   imgChandanlong      from "../assets/images/longsticks/chandan.jpg"
import   imgChandanlongHover      from "../assets/images/longsticks/chandan-hover.jpg"
import   imgKhuslong      from "../assets/images/longsticks/khus.jpg"
import   imgKhuslongHover      from "../assets/images/longsticks/khus-hover.jpg"
import   imgHeenalong     from "../assets/images/longsticks/heena.jpg"
import   imgHeenalongHover     from "../assets/images/longsticks/heena-hover.jpg"
import   imgjavadhulong     from "../assets/images/longsticks/javadhu.jpg"
import   imgjavadhulongHover     from "../assets/images/longsticks/javadhu-hover.jpg"
import   imgKasturilong     from "../assets/images/longsticks/kasturi.jpg"
import   imgKasturilongHover     from "../assets/images/longsticks/kasturi-hover.jpg"
import   imgKesarlong     from "../assets/images/longsticks/kesar.jpg"
import   imgKesarlongHover     from "../assets/images/longsticks/kesar-hover.jpg"

//roll on perfume
import   imgAgarwoodRollon     from "../assets/images/rollon/agarwood.jpg"
import   imgBhakoorRollon     from "../assets/images/rollon/bakhoor.jpg"
import   imgChandanRollon     from "../assets/images/rollon/chandan.jpg"
import  imgHeenaRollon     from "../assets/images/rollon/heena.jpg"
import   imgJavadhuRollon     from "../assets/images/rollon/javadhu.jpg"
import   imgKasturiRollon     from "../assets/images/rollon/kasturi.jpg"
import  imgKesarRollon     from "../assets/images/rollon/kesar.jpg"
import   imgKhusRollon    from "../assets/images/rollon/khus.jpg"
import   imgMajmuaRollon    from "../assets/images/rollon/majmua.jpg"
import   imgOudhRollon    from "../assets/images/rollon/oudh.jpg"
import   imgPatchouliRollon    from "../assets/images/rollon/patchouli.jpg"
import   imgRoseRollon    from "../assets/images/rollon/rose.jpg"
import   imgWhiteoudhRollon    from "../assets/images/rollon/whiteoudh.jpg"
import   imgSacchandanRollon    from "../assets/images/rollon/sacredchandan.jpg"
import   imgSacoudhRollon    from "../assets/images/rollon/sacredoudh.jpg"
import   imgPreroseRollon    from "../assets/images/rollon/prerose.jpg"

//aromatic

      import   imgDiamond    from "../assets/images/perfume-incense/aromatic/diamond.jpg"
      import   imgDiamondHover    from "../assets/images/perfume-incense/aromatic/diamond-hover.jpg"
      import   imgMagic    from "../assets/images/perfume-incense/aromatic/copper.jpg"
      import   imgMagicHover    from "../assets/images/perfume-incense/aromatic/copper-hover.jpg"
      import   imgDivine3    from "../assets/images/perfume-incense/aromatic/divine3in1.jpg"
      import  imgDivine3Hover    from "../assets/images/perfume-incense/aromatic/divine3in1-hover.jpg"
      import  imgFestival    from "../assets/images/perfume-incense/aromatic/festival.jpg"
      import  imgFestivalHover    from "../assets/images/perfume-incense/aromatic/festival-hover.jpg"
      import  imgGolden    from "../assets/images/perfume-incense/aromatic/petal.jpg"
      import  imgGoldenHover    from "../assets/images/perfume-incense/aromatic/petal-hover.jpg"
      import  imgGreenmusk    from "../assets/images/perfume-incense/aromatic/greenmusk.jpg"
      import imgGreenmuskHover    from "../assets/images/perfume-incense/aromatic/greenmusk-hover.jpg"
      import imgPearl    from "../assets/images/perfume-incense/aromatic/pearl.jpg"
      import imgPearlHover    from "../assets/images/perfume-incense/aromatic/pearl-hover.jpg"
      import imgpunch    from "../assets/images/perfume-incense/aromatic/pinch.jpg"
      import imgpunchHover    from "../assets/images/perfume-incense/aromatic/pinch-hover.jpg"
      import imgSaffron    from "../assets/images/perfume-incense/aromatic/saffron.jpg"
      import imgSaffronHover    from "../assets/images/perfume-incense/aromatic/saffron-hover.jpg"
      import imgSilver    from "../assets/images/perfume-incense/aromatic/silver.jpg"
import imgSilverHover    from "../assets/images/perfume-incense/aromatic/silver-hover.jpg"

//khadi soap
import imgAlomond            from "../assets/images/khadi/almond.png";
import imgAloevera             from "../assets/images/khadi/aloevera.png";
import imgApple             from "../assets/images/khadi/apple.png";
import imgApricot             from "../assets/images/khadi/apricot.png";
import imgAquacool             from "../assets/images/khadi/aquacool.png";
import imgBamboo             from "../assets/images/khadi/bamboo.png";
import imgFloral             from "../assets/images/khadi/floral.png";
import imgHimalaya             from "../assets/images/khadi/himalaya.png";
import imgLemon             from "../assets/images/khadi/lemon.png";
import imgLevenderkhadi             from "../assets/images/khadi/levender.png";
import imgLily             from "../assets/images/khadi/lily.png";
import imgOrange             from "../assets/images/khadi/orange.png";
import imgPapya             from "../assets/images/khadi/papya.png";
import imgRedwine            from "../assets/images/khadi/redwine.png";
import imgSeabutter            from "../assets/images/khadi/seabutter.png";
import imgSeamilk            from "../assets/images/khadi/seamilk.png";
import imgStrawberrysoap            from "../assets/images/khadi/strawberry.png";
import imgTea            from "../assets/images/khadi/tea.png";
import imgWhitemusk            from "../assets/images/khadi/whitemusk.png";

//Exotic Dhoopsticks
import imgamberdhoop     from "../assets/images/dhoop-stickss/amber.jpg"
import imgbakhoordhoop       from "../assets/images/dhoop-stickss/bakhoor.jpg"
import imgheenadhoop      from "../assets/images/dhoop-stickss/heena.jpg"
import imgchandandhoop      from "../assets/images/dhoop-stickss/chandan.jpg"
import imgmuskdhoop      from "../assets/images/dhoop-stickss/musk.jpg"
import imgoudhdhoop     from "../assets/images/dhoop-stickss/oudh.jpg"
import imgsaffrondhoop      from "../assets/images/dhoop-stickss/saffron.jpg"
import imgrosedhoop     from "../assets/images/dhoop-stickss/rose.jpg"
  


  
// ═══════════════════════════════════════════════════════════════════════════x
// ── CARD STYLES ────────────────────────────────────────────────────────────

const CARD_CSS = `
.rp-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  cursor: pointer;
  user-select: none;
}
.rp-card:hover {
  box-shadow: 0 10px 36px rgba(0,0,0,0.18);
  transform: translateY(-4px);
}

/* ── Image container ── */
.rp-card__img-wrap {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #f5f0ea;
}

/* Both images fill the container absolutely */
.rp-card__img-wrap img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: opacity, transform;
}

.rp-card__img-default {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
  transition:
    opacity   0.5s ease,
    transform 0.5s ease,
    z-index   0s   linear 0s;
}
.rp-card__img-default.hovered {
  opacity: 0;
  transform: scale(1.08);
  z-index: 1;
  transition:
    opacity   0.5s ease,
    transform 0.5s ease,
    z-index   0s   linear 0.5s;
}

.rp-card__img-hover {
  opacity: 0;
  transform: scale(1.08);
  z-index: 1;
  transition:
    opacity   0.5s ease,
    transform 0.5s ease,
    z-index   0s   linear 0s;
}
.rp-card__img-hover.hovered {
  opacity: 1;
  transform: scale(1.08);
  z-index: 2;
  transition:
    opacity   0.5s ease,
    transform 0.5s ease,
    z-index   0s   linear 0s;
}

/* ── Card body ── */
.rp-card__body {
  padding: 14px 16px 18px;
  position: relative;
  z-index: 3;
}
.rp-card__name {
  margin: 0 0 3px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-card__weight {
  margin: 0 0 7px;
  font-size: 12px;
  color: #999;
}
.rp-card__price {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #b5451b;
}
.rp-card__desc {
  margin: 6px 0 0;
  font-size: 12px;
  color: #777;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Weight selector pills (NEW) ── */
.rp-card__weights {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 8px;
}
.rp-card__weight-btn {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid #e7ddce;
  background: #f6efe4;
  color: #6b6255;
  cursor: pointer;
  transition: all 0.2s ease;
}
.rp-card__weight-btn.active {
  border-color: #7a1020;
  background: #7a1020;
  color: #ffffff;
}
`;

let _stylesInjected = false;
function injectCardStyles() {
  if (_stylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-rp-product-card", "1");
  el.textContent = CARD_CSS;
  document.head.appendChild(el);
  _stylesInjected = true;
}


// ═══════════════════════════════════════════════════════════════════════════
// ── ProductCard ────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
//
// Supports products with multiple weight/price options via `product.variants`
// (an array of { weight, price }). If a product has more than one variant,
// small weight-selector pills are shown and the displayed price switches to
// match whichever weight is selected. Products with a single weight/price
// still render exactly as before — nothing breaks for them.
//
// NOTE (performance): both the default AND hover images are now lazy-loaded.
// Previously the hover image used loading="eager", which forced the browser
// to start downloading it immediately for every rendered card — fine for a
// handful of products, but costly once you have 100-200+ products on a page
// (that's 100-200+ extra image requests firing on page load). With both set
// to "lazy", the browser only fetches images as cards scroll into view.

export function ProductCard({ product, onClick, className = "" }) {
  const mounted = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(function () {
    if (!mounted.current) {
      injectCardStyles();
      mounted.current = true;
    }
  }, []);

  const { name, description, image, imageHover, variants } = product;
  const hoverSrc = imageHover || image;

  const hasMultipleVariants = Array.isArray(variants) && variants.length > 1;
  const selected = hasMultipleVariants
    ? variants[selectedIndex]
    : { weight: product.weight, price: product.price };

  return React.createElement(
    "div",
    {
      className: ("rp-card " + className).trim(),
      onClick:   onClick,
      role:      onClick ? "button" : undefined,
      tabIndex:  onClick ? 0        : undefined,
      onMouseEnter: function () { setHovered(true);  },
      onMouseLeave: function () { setHovered(false); },
      onKeyDown: onClick
        ? function (e) { if (e.key === "Enter") onClick(); }
        : undefined,
    },

    // ── Image wrap ──
    React.createElement(
      "div",
      { className: "rp-card__img-wrap" },
      React.createElement("img", {
        src:       hoverSrc,
        alt:       name + " - alternate view",
        className: "rp-card__img-hover" + (hovered ? " hovered" : ""),
        loading:   "lazy",
        draggable: false,
      }),
      React.createElement("img", {
        src:       image,
        alt:       name,
        className: "rp-card__img-default" + (hovered ? " hovered" : ""),
        loading:   "lazy",
        draggable: false,
      })
    ),

    // ── Card body ──
    React.createElement(
      "div",
      { className: "rp-card__body" },
      React.createElement("p", { className: "rp-card__name" }, name),

      // Weight selector pills — only when a product has more than one option.
      // Clicking a pill selects that weight without triggering the card's
      // own onClick (stopPropagation), so navigation still works normally.
      hasMultipleVariants
        ? React.createElement(
            "div",
            { className: "rp-card__weights" },
            variants.map(function (variant, index) {
              return React.createElement(
                "button",
                {
                  key: variant.weight,
                  type: "button",
                  className:
                    "rp-card__weight-btn" +
                    (index === selectedIndex ? " active" : ""),
                  onClick: function (e) {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  },
                },
                variant.weight
              );
            })
          )
        : selected.weight
        ? React.createElement("p", { className: "rp-card__weight" }, selected.weight)
        : null,

      React.createElement("p", { className: "rp-card__price" }, selected.price),
      description ? React.createElement("p", { className: "rp-card__desc" }, description) : null
    )
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// ── STATIC DATA ────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

export const topbarText = "Spreading Fragrance Since 1981";

export const navLinks = [
  { label: "Home",       path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "About",      path: "/about" },
  { label: "Catalogue",       path: "/catalogue" },
  { label: "Contact",    path: "/contact" },
];

// Turns a product name into a URL/id-safe slug, e.g.
// "Harmony (3-in-1)" -> "harmony-3-in-1"
const slugify = (str) =>
  String(str)
    .toLowerCase()
    .replace(/[()]/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * makeProduct now properly builds a `variants` array instead of the old
 * broken `variants: weight` line (which just copied the weight string and
 * never actually split anything).
 *
 * Some products pass a combined string for both weight and price, e.g.
 *   weight = "50g / 250g"
 *   price  = "₹135 / ₹575"
 * These get split on "/" and paired up into proper variants:
 *   [ { weight: "50g",  price: "₹135" },
 *     { weight: "250g", price: "₹575" } ]
 *
 * Products with a single weight/price (no "/") get a single-item variants
 * list, same as before — nothing changes for them visually.
 *
 * Every product also now gets a unique `id` (slug of its name), which the
 * cart system needs to tell products and variants apart. Previously `id`
 * was missing entirely, which could cause different products/weights to
 * collide in the cart.
 */
const makeProduct = (name, weight, price, notes, image, imageHover) => {
  const weightParts = String(weight).split("/").map((w) => w.trim());
  const priceParts = String(price).split("/").map((p) => p.trim());

  const variants = weightParts.map((w, i) => ({
    weight: w,
    // If there's a matching price at the same position, use it.
    // Otherwise fall back to the first price (covers malformed data safely).
    price: priceParts[i] || priceParts[0],
  }));

  return {
    id: slugify(name),
    name,
    // Kept for backward compatibility with any code reading product.weight /
    // product.price directly — always mirrors the FIRST variant.
    weight: variants[0].weight,
    price: variants[0].price,
    // Only attach `variants` when there's genuinely more than one option.
    variants: variants.length > 1 ? variants : undefined,
    description: notes || "Premium fragrance offering from RAJPAL PRODUCTS catalog.",
    image,
    imageHover: imageHover || image,
  };
};


// ── Product Catalog ──────────────────────────────────────────────────────────
// No changes needed below — every product with a "X / Y" weight/price
// already gets split into proper variants automatically by makeProduct.

export const productCatalog = {

  "incense-sticks": {
    sections: [
      {
        title: "Sacred Incense-sticks",
        products: [
          makeProduct("Sacred Chandan", "50g", "₹1800", "", imgSacredChandan),
          makeProduct("Sacred Oudh",    "50g", "₹1200", "", imgSacredOudh),
          makeProduct("Sacred Rose",    "50g", "₹900",  "", imgSacredRose),
        ],
      },
      {
        title: "Exotic Incense-sticks",
        products: [
          makeProduct("Exotic Amber",   "50g / 250g", "₹135 / ₹575", "", imgExoticAmber,   imgExoticAmberHover),
          makeProduct("Exotic Bakhoor", "50g / 250g", "₹135 / ₹575", "", imgExoticBakhoor, imgExoticBakhoorHover),
          makeProduct("Exotic Heena",   "50g / 250g", "₹135 / ₹575", "", imgExoticHeena,   imgExoticHeenaHover),
          makeProduct("Exotic Chandan", "50g / 250g", "₹135 / ₹575", "", imgExoticChandan, imgExoticChandanHover),
          makeProduct("Exotic Musk",    "50g / 250g", "₹135 / ₹575", "", imgExoticMusk,    imgExoticMuskHover),
          makeProduct("Exotic Oudh",    "50g / 250g", "₹135 / ₹575", "", imgExoticOudh,    imgExoticOudhHover),
          makeProduct("Exotic Saffron", "50g / 250g", "₹135 / ₹575", "", imgExoticSaffron, imgExoticSaffronHover),
          makeProduct("Exotic Rose",    "50g / 250g", "₹135 / ₹575", "", imgExoticRose,    imgExoticRoseHover),
        ],
      },
      {
        title: "Premium Incense-sticks",
        products: [
          makeProduct("Premium Oudh",             "50g / 250g", "₹325 / ₹1500", "", imgPremiumOudh,            imgPremiumOudhHover),
          makeProduct("Premium Khus",             "50g / 250g", "₹325 / ₹1500", "", imgPremiumKhus,            imgPremiumKhusHover),
          makeProduct("Premium Chandan",          "50g / 250g", "₹275 / ₹1250", "", imgPremiumChandan,         imgPremiumChandanHover),
          makeProduct("Premium Rose",             "50g / 250g", "₹275 / ₹1250", "", imgPremiumRose,            imgPremiumRoseHover),
          makeProduct("Premium Heena",            "50g / 250g", "₹275 / ₹1250", "", imgPremiumHeena,           imgPremiumHeenaHover),
          makeProduct("Premium kesar",             "50g / 250g", "₹275 / ₹1250", "", imgPremiumKesar,            imgPremiumKesarHover),
        ],
      },
       {
        title: "Ultra Premium Incense-sticks",
        products: [
         
          makeProduct("Ultra Premium Majmua",     "50g / 250g", "₹400 / ₹1800", "", imgUltraPremiumMajmua,     imgUltraPremiumMajmuaHover),
          makeProduct("Ultra Premium Patchouli",  "50g / 250g", "₹300 / ₹1500", "", imgUltraPremiumPatchouli,  imgUltraPremiumPatchouliHover),
          makeProduct("Ultra Premium Agarwood",   "50g / 250g", "₹300 / ₹1500", "", imgUltraPremiumAgarwood,   imgUltraPremiumAgarwoodHover),
          makeProduct("Ultra Premium White Oudh", "50g / 250g", "₹275 / ₹1250", "", imgUltraPremiumWhiteOudh,  imgUltraPremiumWhiteOudhHover),
          makeProduct("Ultra Premium bakhoor", "50g / 250g", "₹275 / ₹1250", "", imgUltraPremiumBakhoor,  imgUltraPremiumBakhoorHover),
          makeProduct("Ultra Premium javadhu", "50g / 250g", "₹325 / ₹1500", "", imgUltraPremiumJavadhu,  imgUltraPremiumJavadhuHover),
          makeProduct("Ultra Premium kasturi", "50g / 250g", "₹325 / ₹1500", "", imgUltraPremiumKasturi,  imgUltraPremiumKasturiHover),
          makeProduct("Ultra Premium Royal Rich ", "50g / 250g", "₹325 / ₹1500", "", imgUltraPremiumrich,  imgUltraPremiumrichHover),
        ],
      },
      
    ],
  },


  //dhop sticks category start 
  "dhoop-sticks": {
    sections: [
      {
        title: "Nature's Bouquet Dhoop-Sticks",
        products: [
          makeProduct("Harmony (3-in-1)",     "80g", "₹80", "", imgHarmonydhoop,     imgHarmonydhoopHover),
          makeProduct("Mogra (Bliss)",       "80g", "₹80", "", imgMograbliss,      imgMograblissHover),
          makeProduct("Rose (Elegance)",       "80g", "₹80", "", imgRoseelegance,    imgRoseeleganceHover),
          makeProduct("Bloom Lotus",      "80g", "₹80", "", imgLotus,    imgLotusHover),
          makeProduct("levender (calm)",      "80g", "₹80", "", imgLevendercalm,    imgLevendercalmHover),
          makeProduct("Chandan divine",       "80g", "₹80", "", imgChandandivine,    imgChandandivineHover),
          makeProduct("Champa golden",       "80g", "₹80", "", imgChampagolden,    imgChampagoldenHover),
          makeProduct("mist kewda",       "80g", "₹80", "", imgMist,    imgMistHover),
          makeProduct("mystique kasturi",       "80g", "₹80", "", imgKasturimy,    imgKasturimyHover),
          makeProduct("pure kapoor",       "80g", "₹80", "", imgKapoor,    imgKapoorHover),
          makeProduct("Royal loban",     "80g", "₹80", "",imgLoban,    imgLobanHover),
          makeProduct("sacred guggal",       "80g", "₹80", "", imgGuggal,    imgGuggalHover),
        ],
      },
      {
        title: "Premium Dhoopsticks",
        products: [
          makeProduct("Premium Special Chandan",   "50g", "₹75", "", imgSpecialChandan,   imgSpecialChandanHover),
          makeProduct("Premium Special Rose",      "50g", "₹75", "", imgSpecialRose,      imgSpecialRoseHover),
          makeProduct("Premium Peace",             "50g", "₹75", "", imgPeace,            imgPeaceHover),
          makeProduct("Premium Aroma",             "50g", "₹75", "", imgAromadhoop ,            imgAromadhoopHover),
          makeProduct("Premium Rich Gold",         "50g", "₹75", "", imgRichGold,         imgRichGoldHover),
          makeProduct("Premium Divine Meditation", "50g", "₹75", "", imgDivineMeditation, imgDivineMeditationHover),
          makeProduct("Premium Prayer",          "50g", "₹75", "", imgprayerdhoop,     imgprayerdhoopHover),
          makeProduct("Premium Purple",    "50g", "₹75", "", imgPurple ,    imgPurpleHover),
          
        ],
      },
         {
        title: "Exotic Dhoopsticks",
        products: [
         makeProduct("Exotic Amber",   "10sticks", "₹150", "", imgamberdhoop),
          makeProduct("Exotic Bakhoor", "10sticks", "₹150", "", imgbakhoordhoop),
          makeProduct("Exotic Heena",   "10sticks", "₹150", "", imgheenadhoop),
          makeProduct("Exotic Chandan", "10sticks", "₹150", "", imgchandandhoop),
          makeProduct("Exotic Musk",    "10sticks", "₹150", "", imgmuskdhoop),
          makeProduct("Exotic Oudh",   "10sticks", "₹150", "", imgoudhdhoop),
          makeProduct("Exotic Saffron", "10sticks", "₹150", "", imgsaffrondhoop),
          makeProduct("Exotic Rose",   "10sticks", "₹150", "", imgrosedhoop),
         
        ],
      },
         {
        title: "9-Inch Long Dhoopsticks",
        products: [
          makeProduct("divine meditation",   "100g", "₹150", "", imgDivinemeditation,   imgDivinemeditationHover),
          makeProduct("dreams",      "100g", "₹150", "", imgDreams9 ,      imgDreams9Hover),
          makeProduct("fantasia",             "100g", "₹180", "", imgfantasia,            imgfantasiaHover),
          makeProduct("Aroma",             "100g", "₹150", "", imgAroma,           imgAromaHover),
          makeProduct("intimate",         "100g", "₹180", "", imgIntimate9,         imgIntimate9Hover),
          makeProduct("kasturi gold", "100g", "₹150", "", imgKasturigold9, imgKasturigold9Hover),
          makeProduct("khuswala",          "100g", "₹180", "", imgKhuswalaDhoop,     imgKhuswalaHover),
          makeProduct("Mysore Chandan",    "100g", "₹180", "", imgMysoreChandan,    imgMysoreСhandanHover),
          makeProduct("paradise",     "100g", "₹150", "", imgParadise9,     imgParadise9Hover),
          makeProduct("rich-feel",           "100g", "₹150", "", imgRichfeel,     imgRichfeelHover),
          makeProduct("Royal King",             "100g",    "₹180", "", imgRoyalKingDhoop,     imgRoyalKingDhoopHover),
          makeProduct("Signature",              "100g",    "₹180", "", imgSignatureDhoop,     imgSignatureDhoopHover),
        ],
      },
         {
        title: "Premium Masala Dhoopsticks",
        products: [
                     makeProduct("Premium Red Wood",          "50g", "₹135", "", imgRedWoodDhoop,     imgRedWoodDhoopHover),
          makeProduct("Premium Kesar Chandan",     "50g", "₹135", "", imgKesarChandan,     imgKesarChandanHover),
          makeProduct("Premium Saffron",           "50g", "₹150", "", imgSaffronDhoop,     imgSaffronDhoopHover),
           makeProduct("Premium Mechaniz gold",       "50g ", "₹150", "",imgMechanizzGold,     imgMechanizzGoldHover),
                makeProduct("Premium Rain forest",      "50g ", "₹110", "",imgrainForest,     imgrainForestHover),
                  makeProduct("Premium tathastu",     "50g ", "₹135", "",imgtathastu,    imgtathastuHover),
                    makeProduct("Premium spanish levender",     "50g", "₹135", "",imgSpanishLev,    imgSpanishLevHover),
                    makeProduct("Premium Mysore Chandan",     "50g", "₹135", "",imgmysorechandan,    imgmysorechandanHover),
        ],
      },
    ],
  },
//Dhup cups 
    "Dhup-cups": {
    sections: [
      {
        title: "Pure Dhoop Cups",
        products: [
          makeProduct("Guggle - pure", "12cups", "₹180", "", imgGuggleCups, imgGuggleCupsHover),
          makeProduct("Loban - pure", "12cups", "₹180", "", imgLobanCups, imgLobanCupsHover),
          makeProduct("Red wood  - pure",  "12cups", "₹225", "", imgRedWoodDhoopCups, imgRedWoodDhoopCupsHover),
          makeProduct("Sandal  - pure",  "12cups", "₹225", "", imgSandalDhoopcups, imgSandalDhoopcupsHover),
        ],
      },
    ],
  },
  //perfumed incense category
   "perfumed-incense": {
    sections: [
      {
        title: "Perfumed-incense Sticks",
   products: [
  makeProduct("3 Fragrance", "100g / 250g", "₹80 / ₹190", "", img3Fragrance, img3FragranceHover),
  makeProduct("Angle", "100g / 250g", "₹100 / ₹225", "", imgAngle, imgAngleHover),         // Angel = ₹100/₹225 (item 21)
  makeProduct("Aroma", "100g / 250g", "₹120 / ₹300", "", imgAromaa, imgAromaaHover),         // not in image 2 MRP list explicitly, kept from 
  makeProduct("Attar Fantasia", "100g / 250g", "₹80 / ₹190", "", imgAttar, imgAttarHover),  // item 13
  makeProduct("Black Musk", "100g / 250g", "₹150 / ₹375", "", imgBlackMusk, imgBlackMuskHover), // item 52
  makeProduct("Blossom", "100g / 250g", "₹80 / ₹190", "", imgBlossom, imgBlossomHover),     // item 9
  makeProduct("Champa", "100g / 250g", "₹80 / ₹190", "", imgChampa, imgChampaHover),        // item 3
  makeProduct("Chandan", "100g / 250g", "₹80 / ₹190", "", imgChandan, imgChandanHover),     // item 5
  makeProduct("Deepnandan", "100g / 250g", "₹80 / ₹190", "", imgDeepnandan, imgDeepnandanHover), // item 7
  makeProduct("Dew Drop", "100g / 250g", "₹180 / ₹425", "", imgDewDrop, imgDewDropHover),   // item 54
  makeProduct("Divine Meditation", "100g / 250g", "₹120 / ₹300", "", imgDivineMeditationn, imgDivineMeditationnHover), // item 38
  makeProduct("Dreams", "100g / 250g", "₹110 / ₹250", "", imgDreams, imgDreamsHover),       // item 36
  makeProduct("Fancy Flower", "100g / 250g", "₹80 / ₹190", "", imgFancyFlower, imgFancyFlowerHover), // item 12
  makeProduct("Fantasia", "100g / 250g", "₹135 / ₹325", "", imgFantasia, imgFantasiaHover), // item 50
  makeProduct("Firdous", "100g / 250g", "₹80 / ₹190", "", imgFirdous, imgFirdousHover),     // item 14
  makeProduct("French Perfume", "100g / 250g", "₹80 / ₹190", "", imgFreshperfume, imgFreshperfumeHover), // item 11
  makeProduct("Fresh", "100g / 250g", "₹80 / ₹190", "", imgFresh, imgFreshHover),           // item 15
  makeProduct("Guggal Kapoor", "100g / 250g", "₹90 / ₹210", "", imgguggalkapoor, imgguggalkapoorHover), // item 28
  makeProduct("Heena", "100g / 250g", "₹180 / ₹425", "", imgHeena, imgHeenaHover),          // item 55
  makeProduct("Intimate", "100g / 250g", "₹135 / ₹325", "", imgIntimate, imgIntimateHover), // item 49
  makeProduct("Jiya", "100g / 250g", "₹100 / ₹225", "", imgJiya, imgJiyaHover),             // item 29 (Jiya/Strawberry)
  makeProduct("Kaccha Bela", "100g / 250g", "₹120 / ₹300", "", imgKacchaBela, imgKacchaBelaHover), // item 45
  makeProduct("Kasturi", "100g / 250g", "₹80 / ₹190", "", imgKasturi, imgKasturiHover),     // item 4
  makeProduct("Kasturi-Gold", "100g / 250g", "₹120 / ₹300", "", imgKasturigold, imgKasturigoldHover), // item 39
  makeProduct("Kesar Chandan", "100g / 250g", "₹100 / ₹225", "", imgKesarChandann, imgKesarChandannHover), // item 22
  makeProduct("Khus", "100g / 250g", "₹120 / ₹300", "", imgKhus, imgKhusHover),             // item 43 (Khus Wala)
  makeProduct("Konkan-Express", "100g / 250g", "₹80 / ₹190", "", imgKonkanExpress, imgKonkanExpressHover), // item 16
  makeProduct("Levender", "100g / 250g", "₹100 / ₹225", "", imgLevender, imgLevenderHover), // item 20
  makeProduct("London Night", "100g / 250g", "₹100 / ₹225", "", imgLondonnight, imgLondonnightHover), // item 23
  makeProduct("Mango", "100g / 250g", "₹100 / ₹225", "", imgMango, imgMangoHover),          // item 32
  makeProduct("Mogra", "100g / 250g", "₹80 / ₹190", "", imgMogra, imgMograHover),           // item 2
  makeProduct("Musk", "100g / 250g", "₹100 / ₹225", "", imgMusk, imgMuskHover),             // item 19
  makeProduct("Muskmelon", "100g / 250g", "₹100 / ₹225", "", imgMuskmelon, imgMuskmelonHover), // item 30
  makeProduct("Mysorechandan", "100g / 250g", "₹135 / ₹325", "", imgMysorechandan, imgMysorechandanHover), // item 47
  makeProduct("Paan sugandh", "100g / 250g", "₹135 / ₹325", "", imgPaanSugandh, imgPaanSugandhHover), // item 51
  makeProduct("Panadi", "100g / 250g", "₹100 / ₹225", "", imgPanadi, imgPanadiHover),       // item 18
  makeProduct("Paradise", "100g / 250g", "₹110 / ₹250", "", imgParadise, imgParadiseHover), // item 35
  makeProduct("Passion", "100g / 250g", "₹80 / ₹190", "", imgPassion, imgPassionHover),     // item 6
  makeProduct("Pineapple", "100g / 250g", "₹100 / ₹225", "", imgPineapple, imgPineappleHover), // item 31
  makeProduct("Pure Lilly", "100g / 250g", "₹100 / ₹225", "", imgPureLilly, imgPureLillyHover), // item 25
  makeProduct("Pure Loban", "100g / 250g", "₹120 / ₹300", "", imgPureLobann, imgPureLobannHover), // item 46
  makeProduct("Rajnigandha", "100g / 250g", "₹120 / ₹300", "", imgRajnigandha, imgRajnigandhaHover), // item 44
  makeProduct("Rajpal Special", "100g / 250g", "₹110 / ₹250", "", imgRajpalSpecial, imgRajpalSpecialHover), // item 34
  makeProduct("Rich Feel", "100g / 250g", "₹120 / ₹300", "", imgRichFeel, imgRichFeelHover), // item 40
  makeProduct("Rose", "100g / 250g", "₹80 / ₹190", "", imgRose, imgRoseHover),              // item 1
  makeProduct("RoyalKing", "100g / 250g", "₹150 / ₹375", "", imgRoyalKing, imgRoyalKingHover), // item 53
  makeProduct("sandalum", "100g / 250g", "₹110 / ₹250", "", imgSandalum, imgSandalumHover), // item 37
  makeProduct("sringargold", "100g / 250g", "₹80 / ₹190", "", imgSringargold, imgSringargoldHover), // item 8
  makeProduct("sweethoney", "100g / 250g", "₹100 / ₹225", "", imgSweethoney, imgSweethoneyHover), // item 26
  makeProduct("tatvam", "100g / 250g", "₹120 / ₹300", "", imgTatvam, imgTatvamHover),       // item 41
  makeProduct("tulipgarden", "100g / 250g", "₹100 / ₹225", "", imgTulipgarden, imgTulipgardenHover), // item 24
  makeProduct("Violet", "100g / 250g", "₹100 / ₹225", "", imgViolet, imgVioletHover),       // item 17
  makeProduct("Signature", "100g / 250g", "₹100 / ₹225", "", imgsignature, imgsignatureHover),       // item 17
],
      },
         {
        title: "Aromatic-incense Sticks",
        products: [
          makeProduct("Blue diamond",   "100g / 250g", "₹110 / ₹250", "", imgDiamond,     imgDiamondHover),
          makeProduct("copper magic",       "100g / 250g", "₹110 / ₹250", "", imgMagic,      imgMagicHover),
          makeProduct("divine 3 in 1",       "100g / 250g", "₹110 / ₹250", "", imgDivine3,    imgDivine3Hover),
          makeProduct("festival 3 in 1",      "100g / 250g", "₹110 / ₹250", "", imgFestival,    imgFestivalHover),
          makeProduct("golden petal",      "100g / 250g", "₹110 / ₹250", "", imgGolden,   imgGoldenHover),
          makeProduct("green musk",  "100g / 250g", "₹110 / ₹250", "", imgGreenmusk, imgGreenmuskHover),
          makeProduct("pink pearl",     "100g / 250g", "₹110 / ₹250", "", imgPearl,    imgPearlHover),
          makeProduct("purple pinch",      "100g / 250g", "₹110 / ₹250", "", imgpunch,     imgpunchHover),
          makeProduct("saffron bliss",     "100g / 250g", "₹110 / ₹250", "", imgSaffron,    imgSaffronHover),
          makeProduct("silver touch",  "100g / 250g", "₹110 / ₹250",  "", imgSilver, imgSilverHover),
        ],
      },
    ],
  },

  //natural incense
 "natural-incense": {
    sections: [
       {
        title: "Nature's Bouquet Natural-Incense",
        products: [
          makeProduct("Harmony (3-in-1)",   "200g / 100g", "₹225 / ₹125", "", imgHarmony3in1,     imgHarmony3in1Hover),
          makeProduct("Mogra (Bliss)",      "200g / 100g", "₹225 / ₹125", "", imgMograBliss,      imgMograBlissHover),
          makeProduct("Rose (Elegance)",      "200g / 100g", "₹225 / ₹125", "", imgRoseElegance,    imgRoseEleganceHover),
          makeProduct("Lavender (Calm)",      "200g / 100g", "₹225 / ₹125", "", imgLavenderCalm,    imgLavenderCalmHover),
          makeProduct("Chandan (Divine)",     "200g / 100g", "₹225 / ₹125", "", imgChandanDivine,   imgChandanDivineHover),
          makeProduct("Kasturi (Mystique)",  "200g / 100g", "₹225 / ₹125", "", imgKasturiMystique, imgKasturiMystiqueHover),
          makeProduct("Champa (Golden)",     "200g / 100g", "₹225 / ₹125", "", imgChampaGolden,    imgChampaGoldenHover),
          makeProduct("Loban (Royale)",       "200g / 100g", "₹225 / ₹125", "", imgLobanRoyale,     imgLobanRoyaleHover),
          makeProduct("Guggal (Sacred)",      "200g / 100g", "₹225 / ₹125", "", imgGuggalSacred,    imgGuggalSacredHover),
          makeProduct("Mist kewda", "200g / 100g", "₹225 / ₹125",  "", imgKewda, imgKewdaHover),
          makeProduct("Lotus (Bloom)", "200g / 100g", "₹225 / ₹125",  "", imgLotusbloom, imgLotusbloomHover),
          makeProduct("Kapoor (Pure)", "200g / 100g", "₹225 / ₹125",  "", imgkapoorpure, imgkapoorpureHover),
        ],
      },
      {
        title: "Divya Mandir Natural-Incense",
        products: [
          makeProduct("Devedutt", "250g", "₹210", "", imgDevdutt, imgDevduttHover),
          makeProduct("Dhyanarath", "250g", "₹210", "", imgDhyanrath, imgDhyanrathHover),
          makeProduct("Mahatejas", "250g", "₹210", "", imgMahatejas, imgMahatejasHover),
          makeProduct("Shivansh", "250g", "₹210", "", imgShivansh, imgShivanshHover),
          makeProduct("Shrivardhan",  "250g", "₹210", "", imgShrivardhan, imgShrivardhanHover),
          makeProduct("Sudharshan",  "250g", "₹210", "", imgSudharshan, imgSudharshanHover),
          makeProduct("Tapodhan",  "250g", "₹210", "", imgTapodhan, imgTapodhanHover),
          makeProduct("Tejomoy",  "250g", "₹210", "",  imgTejomoy,  imgTejomoyHover),
        ],
      },
      {
        title: "Fruites Natural-Incense",
        products: [
          makeProduct("Grapes", "100g", "₹110", "", imgGrapes, imgGrapesHover),
          makeProduct("Peach", "100g", "₹110", "", imgPeach, imgPeachHover),
          makeProduct("Pineapple",   "100g", "₹110", "", imgPineapple2, imgPineapple2Hover),
          makeProduct("Red Gauva",   "100g", "₹110", "", imgRedgauva, imgRedgauvaHover),
          makeProduct("Strawberry",   "100g", "₹110", "", imgStrawberry, imgStrawberryHover),
          makeProduct("Watermelon",  "100g", "₹110", "", imgWatermelon, imgWatermelonHover),
        ],
      },
         {
        title: "Premium Masala Natural-Incense",
        products: [
          makeProduct("anumati flora",   "50g / 250g", "₹150 / ₹650", "", imgAnumati,   imgAnumatiHover),
           makeProduct("mechaniz gold",       "50g / 250g", "₹150 / ₹650", "",imgMechanizGold,     imgMechanizGoldHover),
           makeProduct("Rain forest",      "50g / 250g", "₹135 / ₹510", "",imgRainForest,     imgRainForestHover),
           makeProduct("spanish levender",     "50g / 250g", "₹135 / ₹650", "",imgSpanishLevender,    imgSpanishLevenderHover),
          makeProduct("tathastu",    "50g / 250g", "₹150 / ₹650", "",imgTathastu,    imgTathastuHover),
          makeProduct("azzaro",      "50g / 250g", "₹95 / ₹325", "", imgAzzaroRose,      imgAzzaroRoseHover),
          makeProduct("bhumi flora",     "50g / 250g", "₹135 / ₹575", "", imgBhumiflora,     imgBhumifloraHover),
          makeProduct("black rose",     "50g / 250g", "₹150 / ₹650", "", imgBlackrose,     imgBlackroseHover),
          makeProduct("blue sapphire",      "50g / 250g", "₹135 / ₹575", "", imgBlackSapp,     imgBlackSappHover),
          makeProduct("divine meditation",      "50g / 250g", "₹120 / ₹510", "", imgMeditation,     imgMeditationHover),
          makeProduct("Fruits forest",     "50g / 250g", "₹120 / ₹510", "", imgFuitsForest,     imgFuitsForestHover),
          makeProduct("garden breeze",      "50g / 250g", "₹135 / ₹575", "", imgGardenbreeze,     imgGardenbreezeHover),
          makeProduct("gold sandal",      "50g / 250g", "₹135 / ₹575", "", imgGoldSandal,     imgGoldSandalHover),
          makeProduct("heaven",      "50g / 250g", "₹135 / ₹575", "",imgHeaven,     imgHeavenHover),
          makeProduct("herbal leaf",     "50g / 250g", "₹150 / ₹650", "",imgHerbalLeaf,     imgHerbalLeafHover),
          makeProduct("kesar chandan",      "50g / 250g", "₹135 / ₹510", "",imgKesarchandan,     imgKesarchandanHover),
          makeProduct("kesar kasturi",      "50g / 250g", "₹135 / ₹575", "",imgKasturikesar,     imgKasturikesarHover),
          makeProduct("nag champa",      "50g / 250g", "₹135 / ₹510", "",imgNagChampa,     imgNagChampaHover),
          makeProduct("peace masala",   "50g / 250g", "₹135 / ₹575", "",imgPeacemasala,     imgPeacemasalaHover),
          makeProduct("prayer",      "50g / 250g", "₹135 / ₹575", "",imgPrayer,     imgPrayerHover),
          makeProduct("purepanadi",     "50g / 250g", "₹150 / ₹650", "",imgPurePanadi,     imgPurePanadiHover),
          makeProduct("Red wood",      "50g / 250g", "₹135 / ₹575", "",imgRedWood,    imgRedWoodHover),
          makeProduct("Rich gold",     "50g / 250g", "₹150 / ₹650", "",imgRichGoldd,    imgRichGolddHover),
          makeProduct("silver gold",     "50g / 250g", "₹150 / ₹650", "",imgSilverGold,    imgSilverGoldHover),
          makeProduct("touch wood",      "50g / 250g", "₹150 / ₹650", "",imgTouchWood,    imgTouchWoodHover),
          makeProduct("traditional flora",     "50g / 250g", "₹150 / ₹650", "",imgFlora,    imgFloraHover),
          makeProduct("white musk",      "50g / 250g", "₹135 / ₹510", "",imgWhiteMusk,    imgWhiteMuskHover),
          makeProduct("white sage",     "50g / 250g", "₹120 / ₹510", "",imgWhiteSage,    imgWhiteSageHover),
          makeProduct("Tirumala",     "50g / 250g", "₹110 / ₹425", "",imgtirumalaa,    imgtirumalaaHover),
          makeProduct("Yug",     "50g / 250g", "₹150 / ₹650", "",imgtirumalaa,    imgtirumalaaHover),
        ],
      },
    ],
  },
  //pooja deep 
 "pooja-deep": {
    sections: [
      {
        title: "Pooja Deep Ghee Diyas",
        products: [
          makeProduct("pure cow ghee diyas", "30 Pcs", "₹120", "",imgdeepcow, imgdeepcowhover),
                 makeProduct("pure cow ghee (Big diyas)", "50 Pcs", "₹350", "",imgdeepcow50, imgdeepcow50hover),
          makeProduct("pure cow ghee diyas", "60 Pcs", "₹240", "",imgdeepcow60, imgdeepcow60hover),
          makeProduct("pure cow ghee diyas", "100 Pcs", "₹350", "",imgdeepcow100, imgdeepcow100hover),
        ],
      },
      {
        title: "Pooja Deep Vanaspati Diyas",
        products: [
          makeProduct("Pooja deep vanaspati", "30 Pcs", "₹90", "", imgvasnpati30, imgvasnpati30hover),
            makeProduct("Pooja deep vanaspati", "60 Pcs", "₹180", "", imgvasnpati, imgvasnpatihover),
          makeProduct("Pooja deep vanaspati (Big diyas)", "50 Pcs", "₹250", "", imgvasnpati50, imgvasnpati50hover),
          makeProduct("Pooja deep vanaspati", "100 Pcs", "₹250", "", imgvasnpati100, imgvasnpati100hover),
        ],
      },
    ],
  },
  // khadi shop handmade
 "khadi-soaps": {
    sections: [
      {
        title: "Luxurious Handmade Bathing Bar",
        products: [
          makeProduct("Almond khadi  - soap", "125g", "₹140", "", imgAlomond),
          makeProduct("apricot khadi - soap",  "125g", "₹140", "", imgApricot),
          makeProduct("aquacool - khadi",  "125g", "₹140", "", imgAquacool),
          makeProduct("bamboo khadi - soap",  "125g", "₹140", "", imgBamboo),
          makeProduct("floral khadi - soap",  "125g", "₹140", "", imgFloral),
          makeProduct("lily khadi - soap",  "125g", "₹140", "", imgLily),
          makeProduct("seabutter khadi - soap",  "125g", "₹140", "", imgSeabutter),
        ],
      },
      {
        title: "Premium Handmade Bathing Bar",
        products: [
          makeProduct("aloevera khadi - soap", "125g", "₹110", "", imgAloevera),
          makeProduct("apple khadi - soap",  "125g", "₹110", "", imgApple),
          makeProduct("himalaya khadi - soap",  "125g", "₹110", "", imgHimalaya),
          makeProduct("lemon khadi - soap",  "125g", "₹110", "", imgLemon),
          makeProduct("Levender khadi - soap",  "125g", "₹100", "", imgLevenderkhadi),
          makeProduct("orange khadi - soap",  "1g25", "₹110", "", imgOrange),
          makeProduct("papaya khadi - soap",  "125g", "₹110", "", imgPapya),
          makeProduct("redwine khadi - soap",  "125g", "₹110", "", imgRedwine),
          makeProduct("seamilk khadi - soap",  "125g", "₹110", "", imgSeamilk),
          makeProduct("strawberry khadi - soap",  "125g", "₹110", "", imgStrawberrysoap),
          makeProduct("tea khadi - soap",  "10ml", "₹110", "", imgTea),
          makeProduct("white musk khadi - soap",  "125g", "₹110", "", imgWhitemusk),
        ],
      },
    ],
  },
  // NEW — placeholder entries so the 3 new categories aren't empty.
  // Currently reusing the category thumbnail as both the product image and
  // hover image (imgCategoryPerfumeRollon / imgCategoryAirFresheners /
  // imgCategoryRawDhoop). Replace with real per-product images + hover
  // images the same way "incense-sticks" does above, once you have them.
    "long-sticks": {
    sections: [
        {
        title: "Premiun Longsticks",
        products: [
        makeProduct("Premiun kesar",  "2 sticks", "₹180", "", imgKesarlong, imgKesarlongHover),
        makeProduct("Premiun chandan - long", "2 sticks", "₹180", "", imgChandanlong, imgChandanlongHover),
        makeProduct("Premiun heena - long", "2 sticks", "₹180", "", imgHeenalong, imgHeenalongHover),
        makeProduct("Ultra Premiun javadhu",  "2 sticks", "₹180", "", imgjavadhulong, imgjavadhulongHover),
        makeProduct("Ultra Premiun kasturi",  "2 sticks", "₹180", "", imgKasturilong, imgKasturilongHover),
          makeProduct("Premiun Khus",  "2 sticks", "₹180", "", imgKhuslong, imgKhuslongHover),

        ],
      },
        {
        title: "Premiun Natural Incense Longsticks",
        products: [
          makeProduct("red wood", "5 sticks", "₹150", "", imgRedlong, imgRedlongHover),
               makeProduct("blue sapphire", "5 sticks", "₹150", "", imgBluesapplong, imgBluesapplongHover),
                 makeProduct("mechanize - gold",  "5 sticks", "₹150", "", imgmechanizelong, imgmechanizelongHover),
   makeProduct("bhumi flora", "5 sticks", "₹150", "", imgBhumifloralong, imgBhumifloralongHover),
 makeProduct("tirumala-flora",  "10 sticks", "₹150", "", imgtirumala, imgtirumalaHover),
   makeProduct("herbal - leaf",  "5 sticks", "₹175", "", imgherballeaflong, imgherballeaflongHover),
    makeProduct("tathastu",  "5 sticks", "₹175", "", imgtathastulong, imgtathastulongHover),
      makeProduct("traditional flora", "5 sticks", "₹175", "", imgflora, imgfloraHover),
        makeProduct("kesar - kasturi",  "1 sticks", "₹50", "", imgkesarkasturilong, imgkesarkasturilongHover),
        ],
      },
    ],
  },

  //prefume rollon  

  "perfume-rollon": {
    sections: [
      {
        title: "Premium Perfume Roll-on",
        products: [
          makeProduct("agarwood rollon", "3ml / 8ml", "₹150 / ₹350", "", imgAgarwoodRollon),
          makeProduct("bhakoor Rollon", "3ml / 8ml", "₹120 / ₹250", "", imgBhakoorRollon),
          makeProduct("chandan Rollon",   "3ml / 8ml", "₹120 / ₹250", "", imgChandanRollon),
          makeProduct("heena Rollon",   "3ml / 8ml", "₹120 / ₹250", "", imgHeenaRollon),
          makeProduct("javadhu Rollon",  "3ml / 8ml", "₹120 / ₹250", "", imgJavadhuRollon),
          makeProduct("kasturi Rollon",  "3ml / 8ml", "₹120 / ₹250", "", imgKasturiRollon),
          makeProduct("kesar Rollon",   "3ml / 8ml", "₹120 / ₹250", "", imgKesarRollon),
          makeProduct("khus Rollon",   "3ml / 8ml", "₹150 / ₹350", "", imgKhusRollon),
          makeProduct("majmua Rollon",   "3ml / 8ml", "₹300 / ₹500", "", imgMajmuaRollon),
          makeProduct("oudh Rollon",  "3ml / 8ml", "₹150 / ₹350", "", imgOudhRollon),
          makeProduct("patchouli Rollon",   "3ml / 8ml", "₹150 / ₹350", "", imgPatchouliRollon),
          makeProduct("whiteoudh Rollon",  "3ml / 8ml", "₹120 / ₹250", "", imgWhiteoudhRollon),
          makeProduct("Premiun Rose Rollon",  "3ml / 8ml", "₹120 / ₹250", "", imgPreroseRollon),
        ],
      },
      {
        title: "Sacred Perfume Roll-on",
        products: [
          makeProduct("Sacred Rose Rollon",   "3ml / 8ml", "₹500 / ₹750", "", imgRoseRollon),
          makeProduct("Sacred Chandan Rollon",   "3ml / 8ml", "₹750 / ₹1250", "", imgSacchandanRollon),
          makeProduct("Sacred Oudh Rollon",   "3ml / 8ml", "₹600 / ₹900", "", imgSacoudhRollon),
        ],
      },
    ],
  },

  "air-fresheners": {
    sections: [
      {
        title: "Fresh Aroma Car Pod",
        products: [
          makeProduct("Rajpal fresh  - Salace", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
          makeProduct("Rajpal fresh  - Elan", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
          makeProduct("Rajpal fresh  - Hush", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
          makeProduct("Rajpal fresh  - Noir", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
          makeProduct("Rajpal fresh  - Pulse", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
          makeProduct("Rajpal fresh  - Drift", "", "₹299", "", imgCategoryAroma,  imgCategoryAromaHover),
        ],
      },
      {
        title: "Fresh Aroma Organic purity Pod",
        products: [
      makeProduct(" sandal fresh-aroma ", "1pod", "₹199", "", imgSandalair),
makeProduct(" aromatic fresh-aroma ",  "1pod", "₹199", "", imgAromaticair),
makeProduct(" lemongress fresh-aroma ",  "1pod", "₹199", "", imgLemongressair),
makeProduct(" jasmine fresh-aroma ",  "1pod", "₹199", "", imgJasmineair),
makeProduct(" rosepink fresh-aroma ",  "1pod", "₹199", "", imgRosepinkair),
makeProduct(" levender fresh-aroma ",  "1pod", "₹199", "", imgLevenderair),
makeProduct(" original fresh-aroma ",  "1pod", "₹199", "", imgOriginalair),
        ],
      },
    ],
  },

  "raw-dhoop": {
    sections: [
      {
        title: "Natural Raw Dhoop",
        products: [
          makeProduct("Kani  - Dhoop", "100g / 250g", "₹120 / ₹250", "", imgKaniDhoop, imgKaniDhoopHover),
          makeProduct("Khada  - Dhoop",  "100g / 250g", "₹180 / ₹450", "", imgKhadaDhoop, imgKhadaDhoopHover),
          makeProduct("bhimsen Kapoor", "50g / 100g / 250g", "₹150 / ₹300 / ₹750", "", imgBhimsenKapoorDhoop, imgBhimenKapoorDhoopHover),
         makeProduct("Parsi-Floaters", "100pc / 200pc / 600pc", "₹120 / ₹240 / ₹600", "", imgParsiFloaters, imgParsiFloatersHover),
          makeProduct("Pure Guggal", "50g / 100g / 250g", "₹90 / ₹180 / ₹450g", "", imgPureGuggal, imgPureGuggalHover),
           makeProduct("Pure Loban",  "50g / 100g / 250g", "₹90 / ₹180 / ₹450", "", imgPureLoban, imgPureLobanHover)
        ],
      },
    ],
  },

};

// ── Categories ───────────────────────────────────────────────────────────────

const categoryMeta = [
{ name: "Incense Sticks",      slug: "incense-sticks",   image: imgCategoryIncenseSticks   },
 { name: "Natural Incense",     slug: "natural-incense",  image: imgCategoryPremiumIncense  },
  { name: "Perfumed Incense",    slug: "perfumed-incense", image: imgCategoryPerfumedIncense },
  { name: "Dhoop Sticks",        slug: "dhoop-sticks",     image: imgCategoryDhoopSticks     },
  { name: "Long Sticks",         slug: "long-sticks",      image: imgCategoryLongSticks      },
  { name: "Pooja Deep",          slug: "pooja-deep",       image: imgCategoryPoojaDeep       },
  { name: "Khadi Natural Soaps", slug: "khadi-soaps",      image: imgCategoryKhadiSoaps      },
  { name: "Perfume Rollon",      slug: "perfume-rollon",   image: imgCategoryPerfumeRollon   },
  { name: "Air Fresheners",      slug: "air-fresheners",   image: imgCategoryAirFresheners   },
  { name: "Raw Dhoop",           slug: "raw-dhoop",        image: imgCategoryRawDhoop        },
    { name: "Dhup Cups",   slug: "Dhup-cups",  image: imgCategoryAromaFragrance  },
];

export const categories = categoryMeta.map(function (item) {
  return Object.assign({}, item, {
    subcategories: (
      productCatalog[item.slug] && productCatalog[item.slug].sections || []
    ).map(function (s) { return s.title; }),
  });
});

// ── Testimonials & FAQs ──────────────────────────────────────────────────────
export const googleReviews = [
  { name: "Priya Sharma", initials: "PS", rating: 5, date: "2 weeks ago", text: "Amazing fragrance quality — my temple smells divine every morning. Highly recommend Rajpal products!" },
  { name: "Anil Mehta", initials: "AM", rating: 5, date: "1 month ago", text: "Been using their agarbatti for years. Consistent quality and long-lasting aroma, perfect for daily pooja." },
  { name: "Sunita Rao", initials: "SR", rating: 4, date: "3 weeks ago", text: "Lovely packaging and the dhoop batti burns evenly. Will order again for Diwali." },
  { name: "Rajesh Kumar", initials: "RK", rating: 5, date: "1 week ago", text: "Best incense sticks I've used. My retail customers love the fragrance variety too." },
  { name: "Meena Iyer", initials: "MI", rating: 5, date: "2 months ago", text: "Authentic, traditional scents. Reminds me of my grandmother's pooja room — truly divine." },
];

export const faqs = [
  { q: "How is product quality ensured?", a: "Each batch follows strict fragrance and burn-quality standards."            },
  { q: "Do you offer shipping support?",  a: "Yes, domestic and export dispatch support is available."                   },
  { q: "Can I get fragrance details?",    a: "Detailed fragrance notes and usage guidance are provided per product line." },
  { q: "Do you accept custom orders?",    a: "Yes, custom fragrance and packaging consultations are supported."          },
  { q: "Are bulk orders available?",      a: "Yes, we handle wholesale and distributor-grade quantities."                 },
  { q: "Do you export internationally?",  a: "Yes, export-ready documentation and product formats are available."        },
];