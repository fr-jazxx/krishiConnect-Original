import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Brand & Roles
    appName: 'KRISHI CONNECT',
    subTitle: 'Transparent Agri Supply Platform',
    farmerRole: 'Farmer',
    buyerRole: 'Buyer',
    adminRole: 'Admin',
    farmerHubBadge: 'Verified Producer · Bardhaman Hub',
    buyerTerminalBadge: 'Institutional Procurement Terminal · APMC Certified',
    welcomeUser: 'Welcome',
    farmerSubtitle: 'Kisan Service Hub · Check live mandi prices, accept guaranteed buyer orders, and get instant bank payouts.',
    listenAudio: 'Listen Audio',
    stopAudio: 'Stop Audio',
    sellCropBtn: '+ Sell Harvest',

    // Quick Action Cards
    quickSellTitle: 'Sell New Harvest',
    quickSellSub: 'Guaranteed Price · Escrow Protected',
    quickTruckTitle: 'Where is the Truck?',
    quickTruckSub: 'Live GPS Fleet Tracking',
    quickMoneyTitle: 'My Bank Balance',
    quickMoneySub: 'Safe in Escrow Account',

    // Farmer Dashboard Metrics
    metricRateLabel: "Today's Market Rate",
    metricDistrictTag: 'District APMC Benchmark',
    metricRateSub: 'Higher than traditional middleman rate',
    metricProduceLabel: 'Listed Farm Produce',
    metricProduceActive: 'Active on Market',
    metricProduceSub: 'Batches ready for dispatch',
    metricEscrowLabel: 'Locked Escrow Payout',
    metricEscrowSub: 'Guaranteed in RBI Escrow · Instant RTGS settlement',

    // Mandi Comparison Box
    liveMandiTitle: 'LIVE MANDI RATE UPDATE',
    mandiPulseTitle: 'Crop Price & Market Pulse',
    viewAllRates: 'View All Rates',
    marketSpread: 'Market Spread',
    buyerDemand: 'Buyer Demand: HIGH',
    verifiedBuyersCount: 'Verified Buyers: 14 Active Near You',
    legacyMandiTitle: 'Traditional Middleman / Agent Rate',
    legacyMandiDeduction: 'Less 8% commission + arbitrary weight deductions',
    krishiConnectTitle: 'Krishi Connect Guaranteed Net',
    krishiGainHighlight: 'extra net realization (+28.8% Gain)',

    // Buyer Deal Card
    confirmedOfferTitle: 'Confirmed Buyer Offer',
    validHours: 'Valid for 4 hours',
    verifiedInstitutional: 'Verified Institutional Buyer',
    unitPrice: 'Unit Price',
    batchVolume: 'Volume',
    netPayout: 'Direct Bank Payout',
    escrowGuaranteeNote: 'Funds held in RBI Escrow account. Guaranteed payment released immediately upon weighment verification.',
    acceptOfferBtn: 'Accept Offer & Schedule Dispatch',

    // Active Consignments
    activeConsignmentsTitle: 'Active Consignments',
    viewAll: 'View All',
    trackLive: 'Track Live →',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    paymentProcessing: 'Payment Processing',

    // Nav
    navOverview: 'Overview',
    navMarket: 'Mandi Market',
    navProduce: 'My Produce',
    navOrders: 'Orders',
    navPayments: 'Payments',
    navLogistics: 'Logistics',
    navLedger: 'Trust Ledger',
    navSettings: 'Settings',
    navHelp: 'Help',
    navBuyerMarket: 'Wholesale Market',
    navBuyerOrders: 'Active Contracts',
    navBuyerTracking: 'Fleet Tracking',
    navAdminSupply: 'Supply Network',
    navAdminTrust: 'Trust Monitor',
    navAdminDisputes: 'Dispute Engine',

    // Topbar
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    farmMarketplace: 'Transparent farm marketplace',
    notifications: 'Notifications',
    profile: 'Profile',

    // Market Page
    marketPageTitle: 'Live Agricultural Market Board',
    marketPageSub: 'District Bardhaman & neighboring hubs. Real-time direct wholesale listings with verified digital weighment and zero middleman fee cuts.',
    allCrops: 'All Crops',
    searchPlaceholder: 'Search crop, mandi, or buyer...',
    sortNearestHub: 'Nearest Hub',
    sortHighestPrice: 'Highest Price',
    sortHighestVolume: 'Highest Volume',
    availableQty: 'Available Volume',
    locationMandi: 'Mandi Location',
    tradingParty: 'Party / Seller',
    qualityCertBtn: 'Quality Certificate',
    lockDealBtn: 'Lock Deal',
    distanceAway: 'away',

    // List Produce
    sellHarvestTitle: 'Sell Your Harvest',
    sellHarvestSub: 'Choose your crop, set your price, and get matched with verified institutional buyers with guaranteed escrow bank payment.',
    directContractBadge: 'Direct Farmer-to-Buyer Contract',
    listedSuccessTitle: 'Produce Listed Successfully!',
    listedSuccessSub: 'Verified buyers are receiving your batch details. A delivery truck will be scheduled upon match.',
    chooseCrop: 'Step 1: Choose Crop',
    quantity: 'Quantity',
    quickAdd: 'Quick add:',
    qualityGrade: 'Quality Grade',
    gradeA: 'Grade A',
    gradeADesc: 'Super Clean Quality (+12% Premium)',
    gradeB: 'Grade B',
    gradeBDesc: 'Standard Mandi Benchmark Pricing',
    yourPrice: 'Your Price',
    useMandiRate: 'Mandi Benchmark',
    harvestDate: 'Harvest Date',
    storagePackaging: 'Storage & Packaging',
    submitListing: 'Submit & Match Institutional Buyers',
    estimatedPayout: 'Estimated Escrow Payout',
    escrowGuaranteed: '100% Escrow Bank Guaranteed',
    instantPayout: 'Direct RTGS / UPI settlement upon weighment',
    zeroCommission: 'Zero Mandi Agent Commission',
    currentBatchesTitle: 'Your Current Batches',
    activeStatus: 'Active',
    unitKg: 'kg',
    unitQuintal: 'Quintal',
    storageCold: 'Cold Storage / Aerated Crates',
    storageColdSub: 'Ideal for perishables and vegetables',
    storageJute: 'Jute Bags / Dry Ventilated Shed',
    storageJuteSub: 'Recommended for grains and pulses',
    storageBulk: 'Protected Bulk Polyhouse',
    storageBulkSub: 'Moisture and pest protected',

    // Logistics
    logisticsTitle: 'Cold-Chain Fleet & GPS Tracking',
    logisticsSub: 'Shared temperature-controlled transport. Track your produce live from field collection to institutional buyer gate.',
    activeTrucks: 'Active Fleet Vehicles',
    sharedSavings: 'Shared Truck Cost Savings',
    sharedSavingsDetail: 'Consolidated pooling lowers freight costs from ₹2.10/kg to ₹0.64/kg.',
    fareSavings: 'Transport Savings',
    spoilageRate: 'Transit Spoilage',
    cabinTemp: 'Reefer Cabin Temp',
    freshnessLevel: 'Freshness Index',
    vehicleSpeed: 'Vehicle Speed',
    sharingFarmers: 'Consolidated Farms',
    callDriver: 'Call Driver',
    routeStopsTitle: 'Route Stops & Waypoints',

    // Crops
    cropTomato: 'Tomato',
    cropPaddy: 'Paddy',
    cropPotato: 'Potato',
    cropOnion: 'Onion',
    cropWheat: 'Wheat',
    cropMustard: 'Mustard',
    cropRice: 'Rice',
  },

  hi: {
    // Brand & Roles
    appName: 'कृषि कनेक्ट',
    subTitle: 'पारदर्शी कृषि आपूर्ति मंच',
    farmerRole: 'किसान',
    buyerRole: 'खरीदार',
    adminRole: 'प्रशासक',
    farmerHubBadge: 'सत्यापित किसान उत्पादक · बर्धमान हब',
    buyerTerminalBadge: 'संस्थागत खरीद टर्मिनल · APMC प्रमाणित',
    welcomeUser: 'नमस्ते',
    farmerSubtitle: 'किसान सेवा केंद्र · लाइव मंडी भाव देखें, पक्के खरीदार ऑर्डर स्वीकार करें और सीधे बैंक खाते में भुगतान पाएं।',
    listenAudio: 'बोल कर सुनें',
    stopAudio: 'आवाज बंद करें',
    sellCropBtn: '+ फसल बेचें',

    // Quick Action Cards
    quickSellTitle: 'नई फसल बेचें',
    quickSellSub: 'पक्का भाव · सुरक्षित एस्क्रो गारंटी',
    quickTruckTitle: 'गाड़ी कहां है?',
    quickTruckSub: 'लाइव जीपीएस फ्लीट ट्रैकिंग',
    quickMoneyTitle: 'मेरा बैंक बैलेंस',
    quickMoneySub: 'एस्क्रो खाते में 100% सुरक्षित',

    // Farmer Dashboard Metrics
    metricRateLabel: 'टमाटर का आज का भाव',
    metricDistrictTag: 'जिला APMC बेंचमार्क',
    metricRateSub: 'पुराने दलाल भाव से अधिक मुनाफा',
    metricProduceLabel: 'आपकी लिस्टेड फसल',
    metricProduceActive: 'मंडी में सक्रिय',
    metricProduceSub: 'उठाव के लिए तैयार खेप',
    metricEscrowLabel: 'आगामी बैंक भुगतान',
    metricEscrowSub: 'आरबीआई एस्क्रो में सुरक्षित · तौल होते ही तुरंत ट्रांसफर',

    // Mandi Comparison Box
    liveMandiTitle: 'लाइव मंडी भाव अपडेट',
    mandiPulseTitle: 'फसल मूल्य व बाजार की मांग',
    viewAllRates: 'सभी भाव देखें',
    marketSpread: 'बाजार भाव दायरा',
    buyerDemand: 'खरीदार मांग: बहुत तेज',
    verifiedBuyersCount: 'सत्यापित खरीदार: 14 आपके पास सक्रिय',
    legacyMandiTitle: 'पारंपरिक दलाल / आढ़ती भाव',
    legacyMandiDeduction: 'कम 8% दलाली कमीशन + मनमाना वजन कटौती',
    krishiConnectTitle: 'कृषि कनेक्ट पक्का शुद्ध भाव',
    krishiGainHighlight: 'अतिरिक्त शुद्ध मुनाफा (+28.8% लाभ)',

    // Buyer Deal Card
    confirmedOfferTitle: 'पक्का खरीदार आर्डर',
    validHours: '4 घंटे के लिए मान्य',
    verifiedInstitutional: 'सत्यापित संस्थागत खरीदार',
    unitPrice: 'तय भाव',
    batchVolume: 'मात्रा / वजन',
    netPayout: 'आपके बैंक में आएगा',
    escrowGuaranteeNote: 'पैसा बैंक एस्क्रो में जमा है। डिजिटल तौल होते ही खाते में तुरंत भुगतान की गारंटी।',
    acceptOfferBtn: 'ऑर्डर स्वीकार करें और गाड़ी बुक करें',

    // Active Consignments
    activeConsignmentsTitle: 'चालू ऑर्डर्स',
    viewAll: 'सभी देखें',
    trackLive: 'लाइव ट्रैक करें →',
    inTransit: 'रास्ते में है',
    delivered: 'पहुंच चुकी है',
    paymentProcessing: 'भुगतान प्रक्रिया में',

    // Nav
    navOverview: 'अवलोकन',
    navMarket: 'मंडी भाव',
    navProduce: 'मेरी फसलें',
    navOrders: 'ऑर्डर्स',
    navPayments: 'बैंक खाते',
    navLogistics: 'गाड़ी ट्रैकिंग',
    navLedger: 'ट्रस्ट लेजर',
    navSettings: 'सेटिंग्स',
    navHelp: 'सहायता',
    navBuyerMarket: 'थोक मंडी',
    navBuyerOrders: 'सक्रिय सौदे',
    navBuyerTracking: 'फ्लीट ट्रैकिंग',
    navAdminSupply: 'सप्लाई नेटवर्क',
    navAdminTrust: 'ट्रस्ट मॉनिटर',
    navAdminDisputes: 'विवाद समाधान',

    // Topbar
    greetingMorning: 'शुभ प्रभात',
    greetingAfternoon: 'शुभ दोपहर',
    greetingEvening: 'शुभ संध्या',
    farmMarketplace: 'आपकी अपनी कृषि मंडी',
    notifications: 'सूचनाएं',
    profile: 'प्रोफाइल',

    // Market Page
    marketPageTitle: 'लाइव कृषि मंडी भाव',
    marketPageSub: 'जिला बर्धमान और आसपास के केंद्र। डिजिटल तौल और बिना किसी बिचौलिये के सीधी थोक खरीद।',
    allCrops: 'सभी फसलें',
    searchPlaceholder: 'फसल, मंडी या खरीदार खोजें...',
    sortNearestHub: 'निकटतम मंडी',
    sortHighestPrice: 'उच्चतम भाव',
    sortHighestVolume: 'अधिकतम मात्रा',
    availableQty: 'उपलब्ध मात्रा',
    locationMandi: 'मंडी का स्थान',
    tradingParty: 'खरीदार / विक्रेता',
    qualityCertBtn: 'गुणवत्ता प्रमाणपत्र',
    lockDealBtn: 'सौदा लॉक करें',
    distanceAway: 'दूरी',

    // List Produce
    sellHarvestTitle: 'नई फसल बेचें',
    sellHarvestSub: 'अपनी फसल चुनें, भाव तय करें और एस्क्रो बैंक गारंटी के साथ प्रमाणित खरीदारों को सीधे बेचें।',
    directContractBadge: 'सीधा किसान-खरीदार अनुबंध',
    listedSuccessTitle: 'फसल सफलतापूर्वक लिस्ट हो गई!',
    listedSuccessSub: 'सत्यापित खरीदार आपकी खेप देख रहे हैं। सौदा तय होते ही गाड़ी भेजी जाएगी।',
    chooseCrop: 'स्टेप 1: फसल चुनें',
    quantity: 'वजन / मात्रा',
    quickAdd: 'त्वरित जोड़ें:',
    qualityGrade: 'गुणवत्ता ग्रेड',
    gradeA: 'ग्रेड A',
    gradeADesc: 'सुपर क्वालिटी (+12% प्रीमियम भाव)',
    gradeB: 'ग्रेड B',
    gradeBDesc: 'मानक मंडी बेंचमार्क दर',
    yourPrice: 'आपका भाव',
    useMandiRate: 'मंडी भाव',
    harvestDate: 'कटाई की तारीख',
    storagePackaging: 'भंडारण व पैकेजिंग',
    submitListing: 'फसल लिस्ट करें व खरीदार खोजें',
    estimatedPayout: 'अनुमानित बैंक भुगतान',
    escrowGuaranteed: '100% बैंक एस्क्रो सुरक्षित गारंटी',
    instantPayout: 'तौल होते ही तुरंत खाते में RTGS / UPI ट्रांसफर',
    zeroCommission: 'दलालों का 0% कमीशन',
    currentBatchesTitle: 'आपकी चालू फसलें',
    activeStatus: 'सक्रिय',
    unitKg: 'किलो',
    unitQuintal: 'क्विंटल',
    storageCold: 'कोल्ड स्टोरेज / जालीदार क्रेट',
    storageColdSub: 'सब्जियों व जल्दी खराब होने वाली फसलों के लिए उपयुक्त',
    storageJute: 'जूट की बोरियां / हवादार गोदाम',
    storageJuteSub: 'अनाज और दलहन के लिए उत्तम',
    storageBulk: 'सुरक्षित पॉलीहाउस भंडारण',
    storageBulkSub: 'नमी और कीटों से सुरक्षित',

    // Logistics
    logisticsTitle: 'गाड़ी की लाइव जीपीएस ट्रैकिंग',
    logisticsSub: 'साझा कोल्ड-चेन परिवहन। खेत से लेकर खरीदार के गोदाम तक तापमान नियंत्रित गाड़ी की सटीक स्थिति देखें।',
    activeTrucks: 'सक्रिय गाड़ियां',
    sharedSavings: 'साझा गाड़ी से 40% तक कम किराया',
    sharedSavingsDetail: 'साझा लॉजिस्टिक्स से ढुलाई खर्च ₹2.10/किग्रा से घटकर केवल ₹0.64/किग्रा रह जाता है।',
    fareSavings: 'किराया बचत',
    spoilageRate: 'फसल खराबी',
    cabinTemp: 'केबिन तापमान',
    freshnessLevel: 'ताजगी सूचकांक',
    vehicleSpeed: 'गाड़ी की गति',
    sharingFarmers: 'साझेदार किसान',
    callDriver: 'ड्राइवर को कॉल करें',
    routeStopsTitle: 'रास्ते के मुख्य पड़ाव व चेकपॉइंट्स',

    // Crops
    cropTomato: 'टमाटर',
    cropPaddy: 'धान',
    cropPotato: 'आलू',
    cropOnion: 'प्याज',
    cropWheat: 'गेहूं',
    cropMustard: 'सरसों',
    cropRice: 'चावल',
  },

  bn: {
    // Brand & Roles
    appName: 'কৃষি কানেক্ট',
    subTitle: 'স্বচ্ছ কৃষি সরবরাহ প্ল্যাটফর্ম',
    farmerRole: 'কৃষক',
    buyerRole: 'ক্রেতা',
    adminRole: 'প্রশাসক',
    farmerHubBadge: 'যাচাইকৃত কৃষক উৎপাদক · বর্ধমান হাব',
    buyerTerminalBadge: 'প্রাতিষ্ঠানিক ক্রয় টার্মিনাল · APMC প্রত্যয়িত',
    welcomeUser: 'স্বাগতম',
    farmerSubtitle: 'কৃষক সেবা কেন্দ্র · লাইভ বাজার দর দেখুন, নিশ্চিত ক্রেতার অর্ডার গ্রহণ করুন এবং সরাসরি ব্যাংকে টাকা পান।',
    listenAudio: 'ভয়েস শুনুন',
    stopAudio: 'ভয়েস বন্ধ করুন',
    sellCropBtn: '+ ফসল বিক্রি করুন',

    // Quick Action Cards
    quickSellTitle: 'নতুন ফসল বিক্রি করুন',
    quickSellSub: 'নিশ্চিত দাম · ব্যাংক এসক্রো সুরক্ষিত',
    quickTruckTitle: 'গাড়ি কোথায় আছে?',
    quickTruckSub: 'লাইভ জিপিএস ফ্লিট ট্র্যাকিং',
    quickMoneyTitle: 'আমার ব্যাংক ব্যালেন্স',
    quickMoneySub: 'এসক্রো অ্যাকাউন্টে ১০০% নিরাপদ',

    // Farmer Dashboard Metrics
    metricRateLabel: 'টমেটোর আজকের বাজার দর',
    metricDistrictTag: 'জেলা মান্ডি বেঞ্চমার্ক',
    metricRateSub: 'দালালদের হারের চেয়ে অনেক বেশি লাভ',
    metricProduceLabel: 'আপনার তালিকাভুক্ত ফসল',
    metricProduceActive: 'বাজারে সক্রিয়',
    metricProduceSub: 'ডেলিভারির জন্য প্রস্তুত লট',
    metricEscrowLabel: 'আসন্ন ব্যাংক পেমেন্ট',
    metricEscrowSub: 'আরবিআই এসক্রোতে সুরক্ষিত · ডিজিটাল ওজনের সাথে সাথেই ট্রান্সফার',

    // Mandi Comparison Box
    liveMandiTitle: 'লাইভ মান্ডি দর আপডেট',
    mandiPulseTitle: 'ফসলের দাম ও বাজারের চাহিদা',
    viewAllRates: 'সকল দর দেখুন',
    marketSpread: 'বাজারের মূল্য পরিসীমা',
    buyerDemand: 'ক্রেতার চাহিদা: অত্যন্ত বেশি',
    verifiedBuyersCount: 'যাচাইকৃত ক্রেতা: ১৪ জন আপনার এলাকায় সক্রিয়',
    legacyMandiTitle: 'চিরাচরিত দালাল / আড়তদারের দর',
    legacyMandiDeduction: '৮% পর্যন্ত কমিশন বাদ + খেয়ালখুশি মতো ওজনে কারচুপি',
    krishiConnectTitle: 'কৃষি কানেক্ট নিশ্চিত নিট দর',
    krishiGainHighlight: 'অতিরিক্ত নিট লাভ (+২৮.৮% বৃদ্ধি)',

    // Buyer Deal Card
    confirmedOfferTitle: 'নিশ্চিত প্রাতিষ্ঠানিক অর্ডার',
    validHours: '৪ ঘণ্টার জন্য প্রযোজ্য',
    verifiedInstitutional: 'যাচাইকৃত প্রাতিষ্ঠানিক ক্রেতা',
    unitPrice: 'ধার্যকৃত দর',
    batchVolume: 'মোট পরিমাণ',
    netPayout: 'আপনার ব্যাংকে জমা হবে',
    escrowGuaranteeNote: 'টাকা ব্যাংক এসক্রোতে জমা রাখা আছে। ডিজিটাল ওজন নিশ্চিত হতেই অবিলম্বে অ্যাকাউন্টে পেমেন্ট।',
    acceptOfferBtn: 'অর্ডার গ্রহণ করুন এবং গাড়ি বুক করুন',

    // Active Consignments
    activeConsignmentsTitle: 'চলমান চালান ও ডেলিভারি',
    viewAll: 'সকল দেখুন',
    trackLive: 'লাইভ ট্র্যাক করুন →',
    inTransit: 'চলমান রয়েছে',
    delivered: 'পৌঁছে গেছে',
    paymentProcessing: 'পেমেন্ট প্রক্রিয়াধীন',

    // Nav
    navOverview: 'সারসংক্ষেপ',
    navMarket: 'বাজার দর',
    navProduce: 'আমার ফসল',
    navOrders: 'অর্ডার তালিকা',
    navPayments: 'পেমেন্ট ও হিসাব',
    navLogistics: 'গাড়ির অবস্থান',
    navLedger: 'ট্রাস্ট লেজার',
    navSettings: 'সেটিংস',
    navHelp: 'সাহায্য',
    navBuyerMarket: 'পাইকারি বাজার',
    navBuyerOrders: 'সক্রিয় চুক্তি',
    navBuyerTracking: 'ফ্লিট ট্র্যাকিং',
    navAdminSupply: 'সাপ্লাই নেটওয়ার্ক',
    navAdminTrust: 'ট্রাস্ট মনিটর',
    navAdminDisputes: 'বিরোধ নিষ্পত্তি',

    // Topbar
    greetingMorning: 'সুপ্রভাত',
    greetingAfternoon: 'শুভ অপরাহ্ন',
    greetingEvening: 'শুভ সন্ধ্যা',
    farmMarketplace: 'আপনার নিজস্ব কৃষি মার্কেটপ্লেস',
    notifications: 'বিজ্ঞপ্তি',
    profile: 'প্রোফাইল',

    // Market Page
    marketPageTitle: 'লাইভ কৃষি মান্ডি দর',
    marketPageSub: 'বর্ধমান জেলা ও সংলগ্ন হাব। ডিজিটাল ওজন এবং দালাল ছাড়া সরাসরি পাইকারি কেনাবেচা।',
    allCrops: 'সকল ফসল',
    searchPlaceholder: 'ফসল, মান্ডি বা ক্রেতা খুঁজুন...',
    sortNearestHub: 'নিকটবর্তী মান্ডি',
    sortHighestPrice: 'সর্বোচ্চ দর',
    sortHighestVolume: 'সর্বোচ্চ পরিমাণ',
    availableQty: 'উপলব্ধ পরিমাণ',
    locationMandi: 'মান্ডির অবস্থান',
    tradingParty: 'ক্রেতা / বিক্রেতা',
    qualityCertBtn: 'গুণমান সনদ',
    lockDealBtn: 'চুক্তি নিশ্চিত করুন',
    distanceAway: 'দূরে',

    // List Produce
    sellHarvestTitle: 'নতুন ফসল বিক্রি করুন',
    sellHarvestSub: 'আপনার ফসল বেছে নিন, দাম নির্ধারণ করুন এবং যাচাইকৃত ক্রেতাদের সাথে ব্যাংক গ্যারান্টিতে বিক্রি করুন।',
    directContractBadge: 'সরাসরি কৃষক-ক্রেতা চুক্তি',
    listedSuccessTitle: 'ফসল সফলভাবে তালিকাভুক্ত হয়েছে!',
    listedSuccessSub: 'যাচাইকৃত ক্রেতারা আপনার ফসলের বিবরণ দেখছেন। চুক্তি হতেই পরিবহন গাড়ি পাঠানো হবে।',
    chooseCrop: 'ধাপ ১: ফসল নির্বাচন করুন',
    quantity: 'পরিমাণ / ওজন',
    quickAdd: 'দ্রুত যোগ করুন:',
    qualityGrade: 'গুণমান গ্রেড',
    gradeA: 'গ্রেড A',
    gradeADesc: 'উচ্চমানের তাজা ফসল (+১২% প্রিমিয়াম রেট)',
    gradeB: 'গ্রেড B',
    gradeBDesc: 'সাধারণ মান্ডি বাজার দর',
    yourPrice: 'আপনার দাম',
    useMandiRate: 'মান্ডি দর',
    harvestDate: 'ফসল কাটার তারিখ',
    storagePackaging: 'সংরক্ষণ ও প্যাকেজিং',
    submitListing: 'ফসল তালিকাভুক্ত করুন ও ক্রেতা খুঁজুন',
    estimatedPayout: 'আনুমানিক ব্যাংক পেমেন্ট',
    escrowGuaranteed: '১০০% ব্যাংক এসক্রো গ্যারান্টি',
    instantPayout: 'ডিজিটাল ওজনের সাথে সাথে RTGS / UPI পেমেন্ট',
    zeroCommission: 'দালালদের ০% কমিশন',
    currentBatchesTitle: 'আপনার সক্রিয় ফসল',
    activeStatus: 'সক্রিয়',
    unitKg: 'কেজি',
    unitQuintal: 'কুইন্টাল',
    storageCold: 'কোল্ড স্টোরেজ / বায়ুচলাচলযুক্ত ক্রেট',
    storageColdSub: 'শাকসবজি ও পচনশীল ফসলের জন্য আদর্শ',
    storageJute: 'পাটের বস্তা / শুকনো গুদাম',
    storageJuteSub: 'শস্যদানা ও ডালের জন্য উপযুক্ত',
    storageBulk: 'সুরক্ষিত পলিহাউস সংরক্ষণ',
    storageBulkSub: 'আর্দ্রতা ও কীটপতঙ্গ মুক্ত',

    // Logistics
    logisticsTitle: 'লাইভ জিপিএস ও তাপমাত্রা ট্র্যাকিং',
    logisticsSub: 'যৌথ কোল্ড-চেন পরিবহন। আপনার ফসল সুরক্ষিত রেফ্রিজারেটেড ট্রাকে জিপিএস পর্যবেক্ষণে ক্রেতার কাছে পৌঁছায়।',
    activeTrucks: 'চলমান যানবাহন',
    sharedSavings: 'যৌথ গাড়িতে ৪০% পর্যন্ত খরচ সাশ্রয়',
    sharedSavingsDetail: 'একক গাড়ির বদলে যৌথ পরিবহনে প্রতি কেজিতে ২.১০ টাকার বদলে মাত্র ০.৬৪ টাকা খরচ হয়।',
    fareSavings: 'ভাড়া সাশ্রয়',
    spoilageRate: 'ফসল নষ্ট হার',
    cabinTemp: 'কেবিন তাপমাত্রা',
    freshnessLevel: 'তাজাতা সূচক',
    vehicleSpeed: 'গাড়ির গতি',
    sharingFarmers: 'অংশীদার কৃষক',
    callDriver: 'চালককে কল করুন',
    routeStopsTitle: 'যাত্রাপথের প্রধান চেকপয়েন্ট ও সময়সূচী',

    // Crops
    cropTomato: 'টমেটো',
    cropPaddy: 'ধান',
    cropPotato: 'আলু',
    cropOnion: 'পেঁয়াজ',
    cropWheat: 'গম',
    cropMustard: 'সরিষা',
    cropRice: 'চাল',
  },
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('krishi_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('krishi_language', lang);
  };

  const t = (key, fallback = '') => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
