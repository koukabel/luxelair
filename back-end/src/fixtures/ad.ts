// ads.js
import Ad from "../entities/ad";
import { generateUsers } from "./user";
import { EquipmentTypeEnum, HousingTypeEnum } from "../entities/ad";


const staticAds = [
  {
    title: "Beautiful Parisian Apartment",
    description: "Charming apartment in the heart of Paris with Eiffel Tower view. Perfect for romantic getaways.",
    price: 120,
    location: "Paris, France",
    image: "https://picsum.photos/id/237/200/300",
    equipements: [
      EquipmentTypeEnum.Balcon,
      EquipmentTypeEnum.Ascenseur,
      EquipmentTypeEnum.Domotique
    ],
    housingType: HousingTypeEnum.Appartement
    
  },
  {
    title: "Luxury Villa with Private Pool",
    description: "Stunning 5-bedroom villa with private pool, garden and sea view. Perfect for family vacations.",
    price: 350,
    location: "Nice, France",
    image: "https://picsum.photos/id/237/200/300",
    equipements: [
      EquipmentTypeEnum.Pool,
      EquipmentTypeEnum.Climatisation,
      EquipmentTypeEnum.Parking,
      EquipmentTypeEnum.Gym,
      EquipmentTypeEnum.Jacuzzi
    ],
    housingType: HousingTypeEnum.Villa

  },
  {
    title: "Cozy Mountain Chalet",
    description: "Traditional wooden chalet in the Alps with fireplace and stunning mountain views.",
    price: 180,
    location: "Chamonix, France",
    image: "https://example.com/images/alps-chalet.jpg",
    equipements: [
      EquipmentTypeEnum.Cheminee,
      EquipmentTypeEnum.Sauna,
      EquipmentTypeEnum.Parking
    ],
    housingType: HousingTypeEnum.Chalet
  },
  {
    title: "Modern Loft in Downtown",
    description: "Industrial-style loft with high ceilings and modern amenities in the city center.",
    price: 200,
    location: "Lyon, France",
    image: "https://example.com/images/lyon-loft.jpg",
    equipements: [
      EquipmentTypeEnum.Domotique,
      EquipmentTypeEnum.Ascenseur,
      EquipmentTypeEnum.Rooftop
    ],
    housingType: HousingTypeEnum.Loft
  },
  {
    title: "Historic Castle Stay",
    description: "Experience living in a real castle with antique furniture and expansive gardens.",
    price: 500,
    location: "Loire Valley, France",
    image: "https://example.com/images/loire-castle.jpg",
    equipements: [
      EquipmentTypeEnum.Parking,
      EquipmentTypeEnum.Cheminee,
      EquipmentTypeEnum.Veranda
    ],
    housingType: HousingTypeEnum.Chateau
  },
  {
    title: "Houseboat on the Seine",
    description: "Unique experience living on a beautifully renovated houseboat with river views.",
    price: 150,
    location: "Paris, France",
    image: "https://example.com/images/paris-houseboat.jpg",
    equipements: [
      EquipmentTypeEnum.Balcon,
      EquipmentTypeEnum.Jacuzzi
    ],
    housingType: HousingTypeEnum.Bateau
  },
  {
    title: "Stylish Studio near Beach",
    description: "Compact but well-designed studio just 5 minutes walk from the beach.",
    price: 90,
    location: "Marseille, France",
    image: "https://example.com/images/marseille-studio.jpg",
    equipements: [
      EquipmentTypeEnum.Climatisation,
      EquipmentTypeEnum.Balcon
    ],
    housingType: HousingTypeEnum.Studio
  },
  {
    title: "Luxury Penthouse with Rooftop",
    description: "Ultra-modern penthouse with panoramic city views and private rooftop terrace.",
    price: 400,
    location: "Cannes, France",
    image: "https://example.com/images/cannes-penthouse.jpg",
    equipements: [
      EquipmentTypeEnum.Rooftop,
      EquipmentTypeEnum.Jacuzzi,
      EquipmentTypeEnum.Climatisation,
      EquipmentTypeEnum.Domotique
    ],
    housingType: HousingTypeEnum.Penthouse
  },
  {
    title: "Traditional Moroccan Riad",
    description: "Authentic riad with courtyard pool and traditional Moroccan decor.",
    price: 220,
    location: "Marrakech, Morocco",
    image: "https://example.com/images/marrakech-riad.jpg",
    equipements: [
      EquipmentTypeEnum.Pool,
      EquipmentTypeEnum.Hammam,
      EquipmentTypeEnum.Veranda
    ],
    housingType: HousingTypeEnum.Riad
  },
  {
    title: "Unique Igloo Experience",
    description: "Sleep in a real igloo with glass ceiling for northern lights viewing.",
    price: 300,
    location: "Lapland, Finland",
    image: "https://example.com/images/lapland-igloo.jpg",
    equipements: [
      EquipmentTypeEnum.Sauna
    ],
    housingType: HousingTypeEnum.Igloo
  }
];

export const generateAds = async () => {
  const users = await generateUsers();
  const ads = [];
  
  for (const staticAd of staticAds) {
    // Check if ad already exists by comparing multiple fields
    const existingAd = await Ad.findOne({
      where: {
        title: staticAd.title,
        location: staticAd.location,
        price: staticAd.price
      }
    });

    if (!existingAd) {
      const ad = new Ad();
      ad.title = staticAd.title;
      ad.description = staticAd.description;
      ad.price = staticAd.price;
      ad.location = staticAd.location;
      ad.image = staticAd.image;
      ad.equipements = staticAd.equipements;
      ad.housingType = staticAd.housingType;
      ad.user = users[Math.floor(Math.random() * users.length)]; // Random user assignment
      ads.push(ad);
    }
  }

  if (ads.length > 0) {
    await Ad.save(ads);
    console.log(`Created ${ads.length} new ads`);
  } else {
    console.log('No new ads to create - all exist already');
  }

  return Ad.find({ relations: ["user"] });
};