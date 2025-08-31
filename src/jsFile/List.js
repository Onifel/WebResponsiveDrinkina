import icedcl from '../assets/cups/a.png'
import strawberry from '../assets/cups/d.png'
import icedmgt from '../assets/cups/icedtea.png'
import irish from '../assets/cups/icedlem.png'
import hotchoc from '../assets/cups/choccream.png'
import lemcream from '../assets/cups/lemcream.png'
import purplina from '../assets/cups/blueberry.png'
import home from '../assets/icons/home.png'
import order from '../assets/icons/clipboard.png'
import user from '../assets/icons/user.png'
import delivery from '../assets/icons/fast-delivery.png'
import pickup from '../assets/icons/coffee-shop.png'
import blancC from '../assets/menu/blancC.png'
import caesar from '../assets/menu/caesar.png'
import cheese from '../assets/menu/cheese.png'
import chicks from '../assets/menu/chicken.png'
import chocC from '../assets/menu/chocC.png'
import classic from '../assets/menu/classic.png'
import comp from '../assets/menu/comp.png'
import custom from '../assets/menu/custom.png'
import donutC from '../assets/menu/donutC.png'
import friesA from '../assets/menu/friesA.png'
import friesF from '../assets/menu/friesF.png'
import meat from '../assets/menu/meat.png'
import veggie from '../assets/menu/veggie.png'
import original from '../assets/peckish/original.png'
import extrem from '../assets/peckish/extrem.png'
import blanco from '../assets/peckish/blanco.png'
import matcha from '../assets/peckish/matcha.png'
import pinky from '../assets/peckish/pinky.png'
import marshy from '../assets/peckish/marshy.png'
import orig from '../assets/peckish/orig.png'
import red from '../assets/peckish/red.png'
import mocha from '../assets/peckish/mocha.png'
import blancD from '../assets/peckish/blancD.png'
import kinder from '../assets/peckish/kinder.png'
import lotus from '../assets/peckish/lotus.png'
import yogurt from '../assets/peckish/yogurt.png'
import honey from '../assets/peckish/honey.png'
import storeIcon from '../assets/icons/store.png'
import curbside from '../assets/icons/parking-area.png'
import setts from '../assets/icons/setting.png'
import rewards from '../assets/icons/badge.png'
import credit from '../assets/icons/creditC.png'
import paypal from '../assets/icons/paypal.png'
import venmo from '../assets/icons/venmo.jpeg'
import cashapp from '../assets/icons/cashapp.jpeg'
import klarna from '../assets/icons/klarna.jpeg'
import homePink from '../assets/icons/homePink.png'
import orderPink from '../assets/icons/shopping-list.png'
import userPink from '../assets/icons/userPink.png'

const drinkList = [
    {
        img: icedcl,
        name: "Iced Caramel Latte",
        desc: "Chilled espresso, creamy milk, sweet caramel, and ice. Refreshingly smooth.",
        btn: "Learn More",
        dollar: "$",
        price: 5,
        color: '#e8af10'
    },
    {
        img: strawberry,
        name: "Pink'ina",
        desc: "Blended strawberries, yogurt, and ice—creamy, fruity, and refreshing.",
        btn: "Learn More",
        dollar: "$",
        price: 4.5,
        color: '#76262d'
    },
    {
        img: icedmgt,
        name: "Iced Tea",
        desc: "Black tea, ice, sugar",
        btn: "Learn More",
        dollar: "$",
        price: 4.8,
        color: '#767575'
    },
    {
        img: irish,
        name: "Iced Lemon",
        desc: "Hot coffee, Irish whiskey, sugar, and cream—bold, warm, and smooth.",
        btn: "Learn More",
        dollar: "$",
        price: 3.9,
        color: '#7fa53e'
    },
    {
        img: hotchoc,
        name: "Choco cream",
        desc: "Iced coffee, cocoa, chocolate, and cream—bold, warm, and smooth.",
        btn: "Learn More",
        dollar: "$",
        price: 4.9,
        color: '#754d39'
    },
    {
        img: lemcream,
        name: "Macha cream",
        desc: "Earthy macha, creamy milk, lightly sweet—smooth and energizing.",
        btn: "Learn More",
        dollar: "$",
        price: 4.9,
        color: '#c91268'
    },
    {
        img: purplina,
        name: "Purpl'ina",
        desc: "Blueberry, creamy milk, lightly sweet—smooth.",
        btn: "Learn More",
        dollar: "$",
        price: 4.9,
        color: '#f0c0bc'
    },
]

const sideBarList = [
    {
        name: "Home",
        icon: home,
        iconPink: homePink
    },
    {
        name: "Order",
        icon: order,
        iconPink: orderPink
    },
    {
        name: "Me",
        icon: user,
        iconPink: userPink
    }
]

const orderList = [
    {
        name: 'Delivery',
        img: delivery
    },
    {
        name: 'Pickup',
        img: pickup
    }
]

const serviceList = [
    {
        nameTab: "Drinks",
    },
    {
        nameTab: "Menu",
    },
    {
        nameTab: "Peckish",
    },
]

const menuList = [
    {
        title: "Burgers",
        burgers: [
            {
                name: "The Classic",
                img: classic,
                desc: "Steak of beef, letuce, tomato, sauce",
                dollar: "$",
                price: 4.6
            },
            {
                name: "Love Cheese",
                img: cheese,
                desc: "Steak of beef, cheddar, letuce, tomato, sauce",
                dollar: "$",
                price: 5
            },
            {
                name: "Veggie",
                img: veggie,
                desc: "Vegetable pancake, letuce, tomato, sauce",
                dollar: "$",
                price: 4
            },
            {
                name: "Chicky chicks",
                img: chicks,
                desc: "Crispy chicken fillet, letuce, tomato, sauce",
                dollar: "$",
                price: 5.2
            },
            {
                name: "Meat me",
                img: meat,
                desc: "Steak of beef, chicken fillet, cheese, letuce, sauce",
                dollar: "$",
                price: 6.5
            },
        ]
    },
    {
        title: "Fries",
        fries: [
            {
                name: "French Fries",
                img: friesF,
                desc: "Gold cripsy fries",
                dollar: "$",
                price: 2
            },
            {
                name: "American Fries",
                img: friesA,
                desc: "Cheesy fries, bacon and herbs",
                dollar: "$",
                price: 3
            },
        ]
    },
    {
        title: "Salads",
        fries: [
            {
                name: "Caesar",
                img: caesar,
                desc: "Romaine lettuce, grilled chicken, croutons, parmesan, Caesar dressing",
                dollar: "$",
                price: 4
            },
            {
                name: "Composé",
                img: comp,
                desc: "Letuce, tomato, cucumber, carrots, dressing",
                dollar: "$",
                price: 1.8
            },
            {
                name: "Customizable",
                img: custom,
                desc: "Choice 1 meat, 1 sauce, 1 cheese, 1 vegetable, egg and croutons",
                dollar: "$",
                price: 5
            },
        ]
    },
    {
        title: "Sweet Snack",
        fries: [
            {
                name: "Chocolate Cookies",
                img: chocC,
                desc: "Kinder Bueno, Snickers, M&Ms, cookie",
                dollar: "$",
                price: 4
            },
            {
                name: "Blanco Cookies",
                img: blancC,
                desc: "Soft vanilla cookie",
                dollar: "$",
                price: 3
            },
            {
                name: "Chocolate Donuts",
                img: donutC,
                desc: "Chocolate covered cookie",
                dollar: "$",
                price: 5.5
            },
        ]
    },
]

const peckishList = [
    {
        title: "Cookies",
        cookies: [
            {
                name: "The Original",
                img: original,
                desc: "Chocolate chip cookie",
                dollar: "$",
                price: 1.5
            },
            {
                name: "The Extrem",
                img: extrem,
                desc: "Kinder Bueno Snickers M&Ms cookie",
                dollar: "$",
                price: 2.5
            },
            {
                name: "The Blanco",
                img: blanco,
                desc: "White chocolate chip cookie",
                dollar: "$",
                price: 2
            },
            {
                name: "The Matcha",
                img: matcha,
                desc: "Matcha cookie",
                dollar: "$",
                price: 1.8
            },
            {
                name: "The Pinky",
                img: pinky,
                desc: "Strawberry cookie",
                dollar: "$",
                price: 1.5
            },
            {
                name: "The Marshy",
                img: marshy,
                desc: "Guillemauve cookie",
                dollar: "$",
                price: 1.3
            },
        ]
    },
    {
        title: "Donuts",
        fries: [
            {
                name: "Original",
                img: orig,
                desc: "Natural donut",
                dollar: "$",
                price: 1.2
            },
            {
                name: "Chocolaty",
                img: donutC,
                desc: "Chocolate covered donut",
                dollar: "$",
                price: 1.5
            },
            {
                name: "Reddish",
                img: red,
                desc: "Red fruits donut",
                dollar: "$",
                price: 1.3
            },
            {
                name: "Mochado",
                img: mocha,
                desc: "mocha coffee donut",
                dollar: "$",
                price: 1.8
            },
            {
                name: "Blando",
                img: blancD,
                desc: "White chocolate donut",
                dollar: "$",
                price: 2
            },
            {
                name: "Kinder",
                img: kinder,
                desc: "Kinder chocolate",
                dollar: "$",
                price: 1.8
            },
            {
                name: "Lotus",
                img: lotus,
                desc: "Lotus donut",
                dollar: "$",
                price: 1.5
            },
            {
                name: "Yogurty",
                img: yogurt,
                desc: "Yogurt donut",
                dollar: "$",
                price: 1.8
            },
            {
                name: "Honeydo",
                img: honey,
                desc: "Honey donut",
                dollar: "$",
                price: 1.3
            },
        ]
    },
]

const stores = [
    { 
        name: "New York City", 
        icon: storeIcon,
        lat: 40.7128, 
        lng: -74.0060 
    },
    { 
        name: "Los Angeles",
        icon: storeIcon, 
        lat: 34.0522, 
        lng: -118.2437 
    },
    { 
        name: "Chicago",
        icon: storeIcon, 
        lat: 41.8781, 
        lng: -87.6298 
    },
];

const pickPref = [
    {
        name: 'Carryout',
        icon: storeIcon
    },
    {
        name: 'Curbside',
        icon: curbside
    }
];

const title = [
    {
        id:0,
        name: 'Delivery'
    },
    {
        id:1,
        name: 'Carryout'
    },
    {
        id:2,
        name: 'Curbside'
    }
];

const myAccount = [
    {
        title: "Orders",
        icon: order
    },
    {
        title: "Settings",
        icon: setts
    },
    {
        title: "Profile",
        icon: user
    },
    {
        title: "Rewards",
        icon: rewards
    }
];

const settings = [
    {
        name: "Manage Account",
        para: "Update information and manage your account"
    },
    {
        name: "Payment",
        para: "Manage payment methods and Drink'ina Credits"
    },
    {
        name: "Business Profile",
        para: "Make expensing effortless"
    },
    {
        name: "Address",
        para: "Add or remove a delivery address"
    },
    {
        name: "Privacy",
        para: "Learn about Privacy and manage settings"
    },
    {
        name: "Notifications",
        para: "Manage delivery and promotional notifications"
    },
    {
        name: "Dark Mode",
        para: "Manage Dark Mode appearance"
    },
];

const payment = [
    {
        name: "Credit/Debit Card",
        icon: credit
    },
    {
        name: "PayPal",
        icon: paypal
    },
    {
        name: "Venmo",
        icon: venmo
    },
    {
        name: "Cash App Pay",
        icon: cashapp
    },
    {
        name: "Klarna",
        icon: klarna
    },
    {
        name: "HSA/FSA",
        icon: credit
    },
];

export {drinkList, sideBarList, orderList, serviceList, menuList, peckishList, stores, pickPref, title, myAccount, settings, payment};
