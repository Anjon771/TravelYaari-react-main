import heroImg from '../assets/images/travel_hero_luxury_resort_1790702626445.jpg';
import kashmirImg from '../assets/images/kashmir_dal_lake_shikara_1790702637557.jpg';
import rajasthanImg from '../assets/images/rajasthan_heritage_palace_1790702647777.jpg';
import goaImg from '../assets/images/goa_tropical_beach_resort_1790702660352.jpg';
import resort1 from '../image/resort1.jpg';
import resort2 from '../image/resort2.jpg';
import resort3 from '../image/resort3.jpg';
import resort4 from '../image/resort4.jpg';

export const initialCategories = [
    { _id: "cat_hill", name: "Hill Stations" },
    { _id: "cat_beach", name: "Beaches & Coastal" },
    { _id: "cat_heritage", name: "Heritage & Culture" },
    { _id: "cat_spiritual", name: "Spiritual & Pilgrimage" },
    { _id: "cat_resorts", name: "Luxury Resorts" },
    { _id: "cat_adventure", name: "Adventure & Trekking" }
];

export const initialProducts = [
    {
        _id: "prod_auli",
        name: "Auli Alpine Snow Haven",
        subname: "Garhwal Himalayas, Uttarakhand",
        description: "Auli is India's premier ski destination framed by towering Himalayan peaks including Nanda Devi, Mana Parvat, and Dunagiri. Enjoy panoramic cable car journeys, ski slopes, pine-scented chalets, and alpine tranquility.",
        price: 4500,
        category: { _id: "cat_hill", name: "Hill Stations" },
        quantity: 12,
        sold: 145,
        rating: 4.9,
        image: heroImg,
        createdAt: "2024-01-15T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_baga",
        name: "Baga Secluded Cove Resort",
        subname: "North Goa Coast",
        description: "Wake up to warm ocean breezes and private shoreline at this luxury beachfront villa. Features direct beach access, sunset infinity pool, fresh seafood cabana dining, and serene coastal living.",
        price: 3800,
        category: { _id: "cat_beach", name: "Beaches & Coastal" },
        quantity: 18,
        sold: 220,
        rating: 4.8,
        image: goaImg,
        createdAt: "2024-02-10T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_taj",
        name: "Taj Heritage Palace & Courtyard",
        subname: "Agra & Rajasthan Heritage Trail",
        description: "Immerse yourself in authentic Mughal-Rajput grandeur with carved sandstone arches, reflecting lotus pools, curated private museum tours, and regal culinary banquets.",
        price: 7200,
        category: { _id: "cat_heritage", name: "Heritage & Culture" },
        quantity: 8,
        sold: 310,
        rating: 5.0,
        image: rajasthanImg,
        createdAt: "2024-01-05T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_pahalgam",
        name: "Dal Lake Shikara & Valley Lodge",
        subname: "Srinagar & Pahalgam, Kashmir",
        description: "Floating pine-paneled cedar houseboats on Dal Lake paired with rolling pine meadows along the Lidder River in Pahalgam. Features traditional kahwa tea, heated wooden suites, and mountain views.",
        price: 5600,
        category: { _id: "cat_hill", name: "Hill Stations" },
        quantity: 10,
        sold: 180,
        rating: 4.9,
        image: kashmirImg,
        createdAt: "2024-02-18T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_goapalms",
        name: "Palm Sanctuary Private Villas",
        subname: "Calangute & Candolim, Goa",
        description: "Private boutique villas nestled in lush palm groves with private plunge pools, open-air stone rain showers, sunset yoga pavilions, and farm-to-table coastal dining.",
        price: 6800,
        category: { _id: "cat_resorts", name: "Luxury Resorts" },
        quantity: 6,
        sold: 160,
        rating: 4.9,
        image: resort1,
        createdAt: "2024-02-25T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_manali",
        name: "Solang Valley Cedar Retreat",
        subname: "Kullu Valley, Himachal Pradesh",
        description: "Handcrafted stone and cedar chalets overlooking snow-capped peaks of the Solang Valley. Cozy fireplaces, guided deodar forest hikes, stargazing terraces, and riverside dining.",
        price: 4200,
        category: { _id: "cat_adventure", name: "Adventure & Trekking" },
        quantity: 14,
        sold: 195,
        rating: 4.8,
        image: resort2,
        createdAt: "2024-03-05T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_bodhgaya",
        name: "Bodh Gaya Lotus Meditation Haven",
        subname: "Gaya, Bihar",
        description: "Discover profound peace at the historic cradle of mindfulness beneath the sacred Bodhi tree. Ancient temple architecture, tranquil monastery gardens, and restorative yoga sessions.",
        price: 2600,
        category: { _id: "cat_spiritual", name: "Spiritual & Pilgrimage" },
        quantity: 20,
        sold: 95,
        rating: 4.7,
        image: resort3,
        createdAt: "2024-01-20T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    },
    {
        _id: "prod_mathura",
        name: "Yamuna Riverside Heritage Manor",
        subname: "Vrindavan & Mathura, Uttar Pradesh",
        description: "Located along peaceful ghats with courtyard fountains, fragrant jasmine gardens, temple soundscapes, vegetarian gourmet dining, and private guided historic walks.",
        price: 2100,
        category: { _id: "cat_spiritual", name: "Spiritual & Pilgrimage" },
        quantity: 15,
        sold: 85,
        rating: 4.6,
        image: resort4,
        createdAt: "2024-03-01T10:00:00.000Z",
        youtubelink: "Wf5lYJ8dYpk"
    }
];

export const initialOrders = [
    {
        _id: "ord_101",
        status: "Processing",
        transaction_id: "txn_88492041",
        amount: 4500,
        address: "74 Marine Drive, Mumbai, MH",
        createdAt: "2024-03-20T14:30:00.000Z",
        user: { name: "Anjon Dev", email: "anjon@example.com" },
        products: [
            {
                _id: "prod_auli",
                name: "Auli Alpine Snow Haven",
                price: 4500,
                count: 1
            }
        ]
    }
];
