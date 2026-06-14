import { useState, useEffect, useRef } from "react";
 
/* ─── DATA ────────────────────────────────────────────── */
const NAV_LINKS = ["Menu", "About", "Gallery", "Contact"];
 
const MENU_CATEGORIES = [
  {
    id: "coffee", label: "Coffee", icon: "☕",
    items: [
      { name: "Filter Coffee",      desc: "South Indian drip brew, frothy & strong",    price: 60  },
      { name: "Cappuccino",          desc: "Espresso with steamed milk foam",             price: 110 },
      { name: "Cold Coffee",         desc: "Chilled coffee with milk & ice cream",        price: 130 },
      { name: "Bulletproof Coffee",  desc: "Black coffee with butter & MCT oil",          price: 150 },
      { name: "Dalgona Coffee",      desc: "Whipped coffee over chilled milk",            price: 120 },
    ],
  },
  {
    id: "tea", label: "Tea", icon: "🍵",
    items: [
      { name: "Masala Chai",         desc: "Ginger, cardamom, cinnamon — classic",        price: 50  },
      { name: "Cutting Chai",        desc: "Half-cup strong milky tea",                   price: 30  },
      { name: "Lemon Ginger Tea",    desc: "Fresh ginger, lemon, honey",                  price: 70  },
      { name: "Tulsi Green Tea",     desc: "Holy basil with green tea leaves",             price: 80  },
      { name: "Kashmiri Kahwa",      desc: "Saffron, almonds, cardamom infusion",          price: 100 },
    ],
  },
  {
    id: "snacks", label: "Snacks", icon: "🍽️",
    items: [
      { name: "Samosa (2 pcs)",      desc: "Crispy pastry with spiced potato filling",    price: 60  },
      { name: "Vada Pav",            desc: "Mumbai street style spiced potato bun",        price: 70  },
      { name: "Pav Bhaji",           desc: "Buttery mashed veggies with soft pav",         price: 120 },
      { name: "Masala Maggi",        desc: "Noodles tossed with veggies & spices",         price: 90  },
      { name: "Bread Pakoda",        desc: "Stuffed bread dipped in gram batter",          price: 80  },
      { name: "Aloo Tikki Chaat",    desc: "Crispy potato cakes with chutneys",            price: 100 },
    ],
  },
  {
    id: "mains", label: "Mains", icon: "🍛",
    items: [
      { name: "Dal Tadka + Rice",              desc: "Yellow lentils tempered with cumin & ghee",           price: 160 },
      { name: "Paneer Butter Masala + Roti",   desc: "Creamy tomato-based cottage cheese curry",            price: 200 },
      { name: "Chole Bhature",                 desc: "Spiced chickpeas with fluffy fried bread",            price: 150 },
      { name: "Rajma Chawal",                  desc: "Kidney beans curry with steamed rice",                price: 150 },
      { name: "Veg Biryani",                   desc: "Fragrant basmati with seasonal vegetables",           price: 180 },
      { name: "Masala Dosa",                   desc: "Crispy rice crepe with potato filling & sambar",      price: 130 },
    ],
  },
  {
    id: "sweets", label: "Sweets", icon: "🍮",
    items: [
      { name: "Gulab Jamun (2 pcs)", desc: "Soft milk-solid dumplings in rose syrup",    price: 80  },
      { name: "Kulfi Falooda",       desc: "Dense ice cream with vermicelli & basil seeds", price: 130 },
      { name: "Gajar Halwa",         desc: "Slow-cooked carrot pudding with cardamom",   price: 100 },
      { name: "Rasmalai (2 pcs)",    desc: "Cottage cheese patties in saffron milk",      price: 120 },
    ],
  },
  {
    id: "drinks", label: "Cold Drinks", icon: "🥤",
    items: [
      { name: "Mango Lassi",         desc: "Chilled yoghurt with Alphonso mango pulp",   price: 100 },
      { name: "Rose Sharbat",        desc: "Rose syrup with chilled milk & basil seeds",  price: 80  },
      { name: "Nimboo Pani",         desc: "Fresh lime water, salted or sweet",           price: 50  },
      { name: "Jal Jeera",           desc: "Cumin spiced chilled cooler",                 price: 60  },
      { name: "Coconut Water",       desc: "Fresh tender coconut served chilled",         price: 70  },
    ],
  },
];
 
const STATS = [
  { icon: "☕", num: 320, suffix: "+", label: "Cups daily"      },
  { icon: "🌿", num: 47,  suffix: "",  label: "Origins sourced" },
  { icon: "✦",  num: 12,  suffix: "",  label: "Years of craft"  },
];
 
// Gallery: Unsplash images — Indian cafe, tea, coffee, food vibes
const GALLERY_ITEMS = [
  {
    url: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=600&q=80&auto=format&fit=crop",
    label: "Masala Chai",         tag: "Tea",     span: "tall",
  },
  {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop",
    label: "Espresso Art",        tag: "Coffee",  span: "wide",
  },

  {
    url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80&auto=format&fit=crop",
    label: "Vada Pav",            tag: "Snacks",  span: "normal",
  },
  {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop",
    label: "Cafe Ambience",       tag: "Vibes",   span: "wide",
  },

  {
    url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80&auto=format&fit=crop",
    label: "Bamboo Seating",      tag: "Vibes",   span: "tall",
  },

  {
    url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80&auto=format&fit=crop",
    label: "Morning Brew",        tag: "Coffee",  span: "normal",
  },
  {
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop",
    label: "Cappuccino",
    tag: "Coffee",
    span: "normal",
  },
  {
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop",
    label: "Cold Brew",
    tag: "Coffee",
    span: "wide",
  },
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80&auto=format&fit=crop",
    label: "Latte Corner",
    tag: "Coffee",
    span: "tall",
  },

  {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&auto=format&fit=crop",
    label: "Paneer Wrap",
    tag: "Snacks",
    span: "wide",
  },
  {
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop",
    label: "Butter Naan",
    tag: "Mains",
    span: "normal",
  },
  {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80&auto=format&fit=crop",
    label: "Veg Thali",
    tag: "Mains",
    span: "wide",
  },
  {
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80&auto=format&fit=crop",
    label: "Gulab Jamun",
    tag: "Sweets",
    span: "normal",
  },
  {
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop",
    label: "Chocolate Brownie",
    tag: "Sweets",
    span: "tall",
  },
  {
    url: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=600&q=80&auto=format&fit=crop",
    label: "Herbal Tea",
    tag: "Tea",
    span: "normal",
  },

];
 
/* ─── CSS ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@400;600&family=Inter:wght@300;400;500&display=swap');
 
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:#0b1a0d;}
 
:root{
  --gold:#d4af37; --gold-light:#f0d060; --gold-dim:rgba(212,175,55,.35);
  --gd:#0b1a0d; --gm:#1a4a12; --gt:rgba(160,210,145,.8);
  --gmut:rgba(100,160,80,.5); --cream:#e8f5e0;
}
 
/* ── Fairy lights ── */
.fb-lights-wire{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(212,175,55,.15);}
.fb-bulb{position:absolute;top:0;border-radius:50%;animation:bulbGlow 2s ease-in-out infinite alternate;}
@keyframes bulbGlow{0%{opacity:.25;box-shadow:0 0 2px 1px currentColor;}100%{opacity:1;box-shadow:0 0 9px 4px currentColor;}}
 
/* ── Leaf ── */
.fb-leaf{position:absolute;opacity:0;pointer-events:none;user-select:none;animation:leafUp linear infinite;}
@keyframes leafUp{0%{opacity:0;transform:translateY(0) rotate(0deg);}10%{opacity:.65;}90%{opacity:.2;}100%{opacity:0;transform:translateY(-110px) rotate(200deg);}}
 
.fb-page{font-family:'Inter',sans-serif;background:#0b1a0d;color:#e8f5e0;}
 
/* ── NAV ── */
.fb-nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 48px;background:rgba(5,14,6,.85);
  backdrop-filter:blur(14px);border-bottom:1px solid rgba(212,175,55,.12);
}
.fb-logo{display:flex;flex-direction:column;gap:2px;cursor:pointer;}
.fb-logo-row{display:flex;align-items:center;gap:6px;}
.fb-logo-4b{font-family:'Cinzel',serif;font-size:24px;font-weight:600;color:var(--gold);letter-spacing:2px;text-shadow:0 0 18px rgba(212,175,55,.35);}
.fb-logo-leaf{font-size:14px;}
.fb-logo-cafe{font-size:8px;letter-spacing:5px;color:rgba(138,184,122,.8);text-transform:uppercase;}
.fb-logo-tag{font-size:7px;letter-spacing:3px;color:rgba(212,175,55,.35);text-transform:uppercase;border-top:1px solid rgba(212,175,55,.15);padding-top:3px;margin-top:2px;}
.fb-nav-links{display:flex;gap:28px;}
.fb-nav-link{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(200,230,190,.7);cursor:pointer;background:none;border:none;font-family:'Inter',sans-serif;position:relative;padding-bottom:4px;transition:color .3s;}
.fb-nav-link::after{content:'';position:absolute;bottom:0;left:50%;right:50%;height:1px;background:var(--gold);transition:all .35s;}
.fb-nav-link:hover{color:var(--gold);}
.fb-nav-link:hover::after{left:0;right:0;}
.fb-reserve-btn{border:1px solid rgba(212,175,55,.45);color:var(--gold);padding:9px 22px;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;background:rgba(212,175,55,.06);border-radius:2px;font-family:'Inter',sans-serif;transition:all .3s;}
.fb-reserve-btn:hover{background:rgba(212,175,55,.14);border-color:var(--gold);color:var(--gold-light);}
 
/* ── HERO ── */
.fb-hero-section{position:relative;min-height:100vh;display:flex;flex-direction:column;overflow:hidden;}
.fb-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 2s ease;filter:brightness(.38) saturate(1.1);}
.fb-hero-bg.loaded{opacity:1;}
.fb-hero-ov1{position:absolute;inset:0;background:linear-gradient(140deg,rgba(4,14,5,.85) 0%,rgba(8,22,9,.4) 55%,rgba(3,12,4,.88) 100%);}
.fb-hero-ov2{position:absolute;inset:0;background:radial-gradient(ellipse at 28% 50%,transparent 30%,rgba(2,9,3,.6) 100%);}
.fb-hero-frame{position:absolute;inset:14px;border:1px solid rgba(212,175,55,.18);border-radius:3px;pointer-events:none;z-index:3;}
.fb-lights-row{position:absolute;top:0;left:0;right:0;height:56px;z-index:4;pointer-events:none;}
.fb-hero-inner{position:relative;z-index:6;flex:1;display:flex;flex-direction:column;justify-content:center;padding:120px 48px 60px;}
.fb-eyebrow{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(212,175,55,.28);background:rgba(8,26,10,.65);padding:7px 16px;border-radius:2px;width:fit-content;opacity:0;animation:heroIn .7s 1s ease forwards;}
.fb-eyebrow-line{width:18px;height:1px;background:var(--gold);opacity:.5;}
.fb-eyebrow-text{font-size:9px;letter-spacing:3px;color:rgba(138,184,122,.9);text-transform:uppercase;}
.fb-h1{margin-top:20px;}
.fb-h1-a{font-family:'Playfair Display',serif;font-size:clamp(40px,6vw,66px);font-weight:400;color:var(--cream);line-height:1.06;display:block;opacity:0;animation:heroSlide .9s 1.2s ease forwards;}
.fb-h1-b{font-family:'Playfair Display',serif;font-size:clamp(40px,6vw,66px);font-weight:700;font-style:italic;background:linear-gradient(135deg,#d4af37 0%,#f0d878 50%,#c49a20 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.06;display:block;opacity:0;animation:heroSlide .9s 1.4s ease forwards;}
.fb-subtitle{margin-top:18px;font-size:14px;font-weight:300;color:rgba(160,210,145,.75);line-height:1.85;max-width:430px;opacity:0;animation:heroUp .9s 1.75s ease forwards;}
.fb-cta-row{margin-top:30px;display:flex;align-items:center;gap:18px;opacity:0;animation:heroUp .8s 2.05s ease forwards;}
.fb-cta-main{background:linear-gradient(135deg,#2a5c1e,#1b4112);border:1px solid rgba(212,175,55,.5);color:var(--gold);font-size:10px;letter-spacing:2.5px;text-transform:uppercase;padding:13px 30px;cursor:pointer;border-radius:2px;font-family:'Inter',sans-serif;transition:all .3s;}
.fb-cta-main:hover{border-color:var(--gold);color:var(--gold-light);background:linear-gradient(135deg,#326e22,#244f17);}
.fb-cta-ghost{color:rgba(180,230,160,.65);font-size:11px;letter-spacing:1.5px;cursor:pointer;background:none;border:none;font-family:'Inter',sans-serif;transition:color .3s;display:flex;align-items:center;gap:8px;}
.fb-cta-ghost:hover{color:var(--gold);}
.fb-arrow-circle{width:28px;height:28px;border-radius:50%;border:1px solid rgba(212,175,55,.3);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--gold);transition:all .3s;}
.fb-cta-ghost:hover .fb-arrow-circle{background:rgba(212,175,55,.1);border-color:var(--gold);}
.fb-stats-row{display:flex;gap:14px;margin-top:28px;opacity:0;animation:heroUp .8s 2.3s ease forwards;}
.fb-stat{background:rgba(8,24,10,.7);border:1px solid rgba(212,175,55,.2);padding:10px 16px;border-radius:2px;display:flex;align-items:center;gap:10px;}
.fb-stat-icon{font-size:16px;}
.fb-stat-num{font-family:'Playfair Display',serif;font-size:20px;color:var(--gold);line-height:1;}
.fb-stat-lbl{font-size:8px;letter-spacing:2px;color:rgba(100,160,80,.8);text-transform:uppercase;margin-top:2px;}
.fb-today-card{position:absolute;right:44px;top:50%;transform:translateY(-50%);width:215px;z-index:8;opacity:0;animation:heroUp .9s 2.5s ease forwards;}
.fb-tc-head{background:linear-gradient(135deg,#1a4a12,#0d2e08);border:1px solid rgba(212,175,55,.35);border-bottom:none;padding:13px 18px 9px;border-radius:2px 2px 0 0;text-align:center;}
.fb-tc-title{font-family:'Cinzel',serif;font-size:10px;letter-spacing:3px;color:var(--gold);}
.fb-tc-sub{font-size:7px;letter-spacing:2px;color:rgba(100,160,80,.8);text-transform:uppercase;margin-top:3px;}
.fb-tc-div{height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.45),transparent);}
.fb-tc-body{background:rgba(5,16,6,.88);border:1px solid rgba(212,175,55,.18);border-top:none;padding:12px 18px;border-radius:0 0 2px 2px;}
.fb-tc-item{display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:1px solid rgba(212,175,55,.07);}
.fb-tc-item:last-child{border-bottom:none;}
.fb-tc-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.fb-tc-name{font-size:12px;color:rgba(200,240,180,.9);font-weight:400;line-height:1.3;}
.fb-tc-note{font-size:9px;color:rgba(90,130,70,.85);margin-top:1px;}
.fb-tc-footer{margin-top:10px;text-align:center;font-size:8px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;cursor:pointer;border:1px solid rgba(212,175,55,.22);padding:8px;border-radius:2px;transition:all .3s;background:none;}
.fb-tc-footer:hover{background:rgba(212,175,55,.08);}
.fb-hero-bottom{position:relative;z-index:6;display:flex;align-items:flex-end;justify-content:space-between;padding:0 48px 32px;opacity:0;animation:heroIn 1s 2.8s ease forwards;}
.fb-tags{display:flex;gap:9px;flex-wrap:wrap;}
.fb-tag{font-size:8px;letter-spacing:2px;color:rgba(160,210,145,.5);text-transform:uppercase;border:1px solid rgba(100,160,80,.2);padding:5px 10px;border-radius:1px;}
.fb-scroll{display:flex;flex-direction:column;align-items:center;gap:4px;}
.fb-scroll-bar{width:1px;height:34px;background:linear-gradient(to bottom,rgba(212,175,55,.55),transparent);animation:scrollPulse 2.2s ease infinite;}
@keyframes scrollPulse{0%,100%{opacity:.3;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}
.fb-scroll-txt{font-size:7px;letter-spacing:3px;color:rgba(212,175,55,.3);text-transform:uppercase;}
.fb-hv{position:absolute;bottom:90px;right:48px;z-index:7;font-family:'Playfair Display',serif;font-style:italic;font-size:13px;color:rgba(212,175,55,.38);letter-spacing:2px;opacity:0;animation:heroIn 1.5s 3.1s ease forwards;}
@keyframes heroIn{from{opacity:0}to{opacity:1}}
@keyframes heroSlide{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}
@keyframes heroUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
 
/* ── SECTION SHARED ── */
.fb-sec-label{text-align:center;font-size:9px;letter-spacing:4px;color:rgba(100,160,80,.7);text-transform:uppercase;margin-bottom:10px;}
.fb-sec-title{font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,48px);font-weight:400;color:var(--cream);text-align:center;line-height:1.1;}
.fb-sec-title span{font-style:italic;font-weight:700;background:linear-gradient(135deg,#d4af37,#f0d878,#c49a20);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.fb-sec-div{width:60px;height:1px;background:var(--gold);margin:18px auto;opacity:.4;}
.fb-gold-rule{position:absolute;top:0;left:48px;right:48px;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.3),transparent);}
 
/* ── MENU ── */
.fb-menu-section{padding:100px 48px 80px;background:linear-gradient(180deg,#0b1a0d 0%,#0d1f0f 100%);position:relative;}
.fb-cat-tabs{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:32px;margin-bottom:40px;}
.fb-cat-tab{display:flex;align-items:center;gap:6px;border:1px solid rgba(212,175,55,.2);background:rgba(8,24,10,.6);color:rgba(160,210,145,.65);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;padding:9px 18px;border-radius:2px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s;}
.fb-cat-tab:hover{border-color:rgba(212,175,55,.45);color:rgba(212,175,55,.8);}
.fb-cat-tab.active{border-color:var(--gold);background:rgba(212,175,55,.1);color:var(--gold);}
.fb-cat-tab-icon{font-size:14px;}
.fb-menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;max-width:1100px;margin:0 auto;}
.fb-menu-card{background:rgba(8,22,9,.75);border:1px solid rgba(212,175,55,.14);border-radius:3px;padding:18px 20px;transition:all .3s;cursor:default;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
.fb-menu-card:hover{border-color:rgba(212,175,55,.38);background:rgba(12,30,13,.9);transform:translateY(-2px);}
.fb-mc-left{flex:1;}
.fb-mc-name{font-size:15px;font-weight:500;color:var(--cream);line-height:1.2;}
.fb-mc-desc{font-size:12px;font-weight:300;color:rgba(130,190,110,.7);margin-top:5px;line-height:1.5;}
.fb-mc-price{font-family:'Playfair Display',serif;font-size:17px;font-weight:400;color:var(--gold);white-space:nowrap;padding-top:2px;}
.fb-mc-price span{font-size:11px;color:rgba(212,175,55,.55);}
 
/* ── ABOUT ── */
.fb-about-section{padding:100px 48px 80px;background:linear-gradient(180deg,#0d1f0f 0%,#0b1a0d 100%);position:relative;}
.fb-about-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
.fb-about-head{font-family:'Playfair Display',serif;font-size:clamp(28px,3.5vw,42px);font-weight:400;color:var(--cream);line-height:1.15;margin-top:10px;}
.fb-about-head em{font-style:italic;font-weight:700;color:var(--gold);}
.fb-about-body{font-size:14px;font-weight:300;color:rgba(160,210,145,.7);line-height:1.9;margin-top:18px;}
.fb-about-features{margin-top:28px;display:flex;flex-direction:column;gap:12px;}
.fb-about-feat{display:flex;align-items:center;gap:12px;font-size:13px;color:rgba(180,220,160,.8);}
.fb-about-feat-icon{width:32px;height:32px;border-radius:50%;border:1px solid rgba(212,175,55,.3);background:rgba(212,175,55,.07);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.fb-about-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.fb-about-stat{background:rgba(8,24,10,.7);border:1px solid rgba(212,175,55,.18);border-radius:3px;padding:22px 20px;text-align:center;}
.fb-about-stat-num{font-family:'Playfair Display',serif;font-size:38px;font-weight:400;color:var(--gold);}
.fb-about-stat-lbl{font-size:9px;letter-spacing:2px;color:rgba(100,160,80,.7);text-transform:uppercase;margin-top:5px;}
 
/* ── GALLERY ── */
.fb-gallery-section{padding:100px 48px 80px;background:linear-gradient(180deg,#0b1a0d 0%,#0e2210 100%);position:relative;}
.fb-gallery-filters{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:32px 0;}
.fb-gf-btn{font-size:10px;letter-spacing:2px;text-transform:uppercase;border:1px solid rgba(212,175,55,.2);background:rgba(8,24,10,.6);color:rgba(160,210,145,.6);padding:7px 16px;border-radius:2px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s;}
.fb-gf-btn:hover,.fb-gf-btn.active{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,.08);}
.fb-gallery-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-auto-rows:220px;
  gap:12px;
  max-width:1100px;margin:0 auto;
}
.fb-gallery-item{
  position:relative;overflow:hidden;border-radius:3px;
  border:1px solid rgba(212,175,55,.1);cursor:pointer;
  transition:border-color .3s;
}
.fb-gallery-item.span-wide{grid-column:span 2;}
.fb-gallery-item.span-tall{grid-row:span 2;}
.fb-gallery-item:hover{border-color:rgba(212,175,55,.45);}
.fb-gallery-item img{
  width:100%;height:100%;object-fit:cover;
  transition:transform .6s ease,filter .6s ease;
  filter:brightness(.75) saturate(.8);
}
.fb-gallery-item:hover img{transform:scale(1.06);filter:brightness(.9) saturate(1.1);}
.fb-gallery-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(4,14,5,.85) 0%,transparent 55%);
  opacity:0;transition:opacity .4s;
  display:flex;flex-direction:column;justify-content:flex-end;padding:16px;
}
.fb-gallery-item:hover .fb-gallery-overlay{opacity:1;}
.fb-gallery-tag{font-size:8px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:4px;}
.fb-gallery-name{font-family:'Playfair Display',serif;font-size:16px;font-style:italic;color:var(--cream);}
/* always-visible label strip at bottom */
.fb-gallery-strip{
  position:absolute;bottom:0;left:0;right:0;
  background:linear-gradient(to top,rgba(4,14,5,.7),transparent);
  padding:24px 14px 10px;
}
.fb-gallery-strip-tag{font-size:7px;letter-spacing:2px;color:rgba(212,175,55,.7);text-transform:uppercase;}
.fb-gallery-strip-name{font-family:'Playfair Display',serif;font-size:13px;color:rgba(232,245,224,.85);font-style:italic;margin-top:2px;}
 
/* lightbox */
.fb-lightbox{
  position:fixed;inset:0;z-index:200;
  background:rgba(2,8,3,.92);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;
  padding:24px;
}
.fb-lightbox-img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:3px;border:1px solid rgba(212,175,55,.25);}
.fb-lightbox-close{
  position:absolute;top:20px;right:24px;
  font-size:22px;color:rgba(212,175,55,.7);cursor:pointer;
  background:none;border:none;transition:color .3s;
}
.fb-lightbox-close:hover{color:var(--gold);}
.fb-lightbox-caption{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  text-align:center;
}
.fb-lightbox-caption-tag{font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;}
.fb-lightbox-caption-name{font-family:'Playfair Display',serif;font-size:18px;color:var(--cream);font-style:italic;margin-top:4px;}
 
/* ── CONTACT ── */
.fb-contact-section{padding:100px 48px 80px;background:linear-gradient(180deg,#0e2210 0%,#060f07 100%);position:relative;}
.fb-contact-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
 
/* Info side */
.fb-contact-info{display:flex;flex-direction:column;gap:28px;}
.fb-contact-card{background:rgba(8,24,10,.7);border:1px solid rgba(212,175,55,.18);border-radius:3px;padding:22px 24px;}
.fb-cc-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.fb-cc-icon{width:36px;height:36px;border-radius:50%;border:1px solid rgba(212,175,55,.35);background:rgba(212,175,55,.07);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.fb-cc-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;color:var(--gold);}
.fb-cc-body{font-size:13px;font-weight:300;color:rgba(160,210,145,.8);line-height:1.8;}
.fb-cc-body strong{font-weight:500;color:var(--cream);}
.fb-cc-body a{color:rgba(160,210,145,.75);text-decoration:none;transition:color .3s;}
.fb-cc-body a:hover{color:var(--gold);}
 
/* hours grid */
.fb-hours-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;margin-top:6px;}
.fb-hour-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(212,175,55,.06);}
.fb-hour-day{color:rgba(130,190,110,.7);}
.fb-hour-time{color:var(--gold);}
 
/* Map side */
.fb-map-wrap{display:flex;flex-direction:column;gap:16px;}
.fb-map-frame{
  width:100%;height:320px;border-radius:3px;overflow:hidden;
  border:1px solid rgba(212,175,55,.25);position:relative;
}
.fb-map-frame iframe{width:100%;height:100%;border:none;filter:invert(90%) hue-rotate(140deg) saturate(.8) brightness(.85);}
.fb-map-badge{
  background:rgba(8,24,10,.85);border:1px solid rgba(212,175,55,.25);
  border-radius:3px;padding:14px 18px;
  display:flex;align-items:center;gap:12px;
}
.fb-map-badge-icon{font-size:20px;}
.fb-map-badge-address{font-size:12px;color:rgba(160,210,145,.8);line-height:1.6;}
.fb-map-badge-address strong{display:block;font-family:'Cinzel',serif;font-size:11px;letter-spacing:1px;color:var(--gold);margin-bottom:3px;}
 
/* reserve form */
.fb-reserve-form{margin-top:28px;}
.fb-reserve-form-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;color:var(--gold);margin-bottom:16px;text-align:center;}
.fb-form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}
.fb-form-input{
  background:rgba(8,24,10,.8);border:1px solid rgba(212,175,55,.2);
  color:var(--cream);font-family:'Inter',sans-serif;font-size:13px;font-weight:300;
  padding:11px 14px;border-radius:2px;outline:none;width:100%;
  transition:border-color .3s;
}
.fb-form-input::placeholder{color:rgba(100,160,80,.5);}
.fb-form-input:focus{border-color:rgba(212,175,55,.5);}
.fb-form-full{grid-column:span 2;}
.fb-form-submit{
  width:100%;margin-top:6px;
  background:linear-gradient(135deg,#2a5c1e,#1b4112);
  border:1px solid rgba(212,175,55,.5);color:var(--gold);
  font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
  padding:13px;cursor:pointer;border-radius:2px;
  font-family:'Inter',sans-serif;transition:all .3s;
}
.fb-form-submit:hover{background:linear-gradient(135deg,#326e22,#244f17);border-color:var(--gold);color:var(--gold-light);}
.fb-form-success{text-align:center;padding:20px;font-size:14px;color:rgba(160,210,145,.8);font-style:italic;}
 
/* ── FOOTER ── */
.fb-footer{background:#03080a;border-top:1px solid rgba(212,175,55,.15);padding:50px 48px 32px;position:relative;}
.fb-footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:48px;max-width:1000px;margin:0 auto;}
.fb-footer-brand .fb-footer-logo{font-family:'Cinzel',serif;font-size:22px;color:var(--gold);letter-spacing:2px;}
.fb-footer-brand .fb-footer-tag{font-size:8px;letter-spacing:3px;color:rgba(212,175,55,.3);text-transform:uppercase;margin-top:6px;}
.fb-footer-brand p{font-size:13px;font-weight:300;color:rgba(130,190,110,.6);line-height:1.7;margin-top:14px;max-width:260px;}
.fb-footer-col-title{font-size:9px;letter-spacing:3px;color:rgba(212,175,55,.5);text-transform:uppercase;margin-bottom:16px;}
.fb-footer-nav-links{display:flex;flex-direction:column;gap:10px;}
.fb-footer-nav-link{font-size:13px;font-weight:300;color:rgba(130,190,110,.6);cursor:pointer;background:none;border:none;text-align:left;font-family:'Inter',sans-serif;transition:color .3s;padding:0;}
.fb-footer-nav-link:hover{color:var(--gold);}
.fb-footer-contact-lines{display:flex;flex-direction:column;gap:10px;}
.fb-footer-contact-line{font-size:12px;font-weight:300;color:rgba(130,190,110,.6);display:flex;align-items:flex-start;gap:8px;}
.fb-footer-contact-icon{font-size:14px;flex-shrink:0;margin-top:1px;}
.fb-footer-bottom{max-width:1000px;margin:36px auto 0;padding-top:20px;border-top:1px solid rgba(212,175,55,.1);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.fb-footer-copy{font-size:9px;color:rgba(100,140,80,.35);letter-spacing:1px;}
.fb-footer-social{display:flex;gap:10px;}
.fb-footer-social-btn{width:32px;height:32px;border-radius:50%;border:1px solid rgba(212,175,55,.2);background:rgba(212,175,55,.04);display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;transition:all .3s;}
.fb-footer-social-btn:hover{border-color:var(--gold);background:rgba(212,175,55,.1);}
 
/* ── RESPONSIVE ── */
@media(max-width:900px){
  .fb-nav{padding:16px 24px;}
  .fb-nav-links{display:none;}
  .fb-hero-inner{padding:100px 24px 40px;}
  .fb-today-card{display:none;}
  .fb-hero-bottom{padding:0 24px 24px;}
  .fb-menu-section,.fb-about-section,.fb-gallery-section,.fb-contact-section{padding:80px 24px 60px;}
  .fb-gold-rule{left:24px;right:24px;}
  .fb-about-inner,.fb-contact-inner{grid-template-columns:1fr;gap:36px;}
  .fb-gallery-grid{grid-template-columns:repeat(2,1fr);}
  .fb-gallery-item.span-wide{grid-column:span 1;}
  .fb-footer-top{grid-template-columns:1fr;gap:32px;}
  .fb-footer{padding:40px 24px 24px;}
  .fb-footer-bottom{flex-direction:column;text-align:center;}
}
`;
 
/* ─── HELPERS ─────────────────────────────────────────── */
function useCountUp(target, delay = 2800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const step = Math.ceil(target / 38);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        setVal(cur);
        if (cur >= target) clearInterval(iv);
      }, 45);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return val;
}
 
/* ─── COMPONENTS ──────────────────────────────────────── */
function FairyLights() {
  const COLORS = ["#d4af37", "#f0d060", "#ffd700", "#c8e890", "#90ee70"];
  return (
    <div className="fb-lights-row">
      <div className="fb-lights-wire" />
      {Array.from({ length: 34 }).map((_, i) => {
        const c = COLORS[i % COLORS.length];
        return (
          <div key={i} className="fb-bulb" style={{
            left: `${(i / 33) * 97 + 1.5}%`,
            top: `${4 + Math.sin(i * 0.55) * 7}px`,
            width: "4px", height: "4px",
            background: c, color: c,
            animationDelay: `${(Math.random() * 2.5).toFixed(2)}s`,
            animationDuration: `${(1.4 + Math.random() * 2).toFixed(2)}s`,
          }} />
        );
      })}
    </div>
  );
}
 
function LeafParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="fb-leaf" style={{
          left: `${Math.random() * 65}%`,
          bottom: `${Math.random() * 35 + 5}%`,
          fontSize: `${8 + Math.random() * 6}px`,
          animationDuration: `${(6 + Math.random() * 6).toFixed(1)}s`,
          animationDelay: `${(Math.random() * 12).toFixed(1)}s`,
        }}>🌿</div>
      ))}
    </div>
  );
}
 
function StatBadge({ icon, num, suffix, label, delay }) {
  const val = useCountUp(num, delay);
  return (
    <div className="fb-stat">
      <span className="fb-stat-icon">{icon}</span>
      <div>
        <div className="fb-stat-num">{val}{suffix}</div>
        <div className="fb-stat-lbl">{label}</div>
      </div>
    </div>
  );
}
 
function Navbar() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fb-nav">
      <div className="fb-logo" onClick={() => scrollTo("home")}>
        <div className="fb-logo-row">
          <span className="fb-logo-4b">4B</span>
          <span className="fb-logo-leaf">🌿</span>
        </div>
        <span className="fb-logo-cafe">Cafe</span>
        <span className="fb-logo-tag">— Food Made Better —</span>
      </div>
      <div className="fb-nav-links">
        {NAV_LINKS.map(l => (
          <button key={l} className="fb-nav-link" onClick={() => scrollTo(l.toLowerCase())}>
            {l}
          </button>
        ))}
      </div>
      <button className="fb-reserve-btn" onClick={() => scrollTo("contact")}>
        Reserve a Table →
      </button>
    </nav>
  );
}
 
function HeroSection({ onMenuClick }) {
  const bgRef = useRef(null);
  useEffect(() => {
    const img = bgRef.current;
    if (!img) return;
    if (img.complete) img.classList.add("loaded");
    else img.onload = () => img.classList.add("loaded");
  }, []);
 
  return (
    <section className="fb-hero-section" id="home">
      <img ref={bgRef} className="fb-hero-bg"
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80&auto=format&fit=crop"
        alt="4B Cafe interior" />
      <div className="fb-hero-ov1" /><div className="fb-hero-ov2" />
      <div className="fb-hero-frame" />
      <FairyLights />
      <LeafParticles />
 
      <div className="fb-hero-inner">
        <div className="fb-eyebrow">
          <div className="fb-eyebrow-line" />
          <span className="fb-eyebrow-text">4B· Coffee · Tea · Snacks · Good Vibes</span>
          <div className="fb-eyebrow-line" />
        </div>
        <div className="fb-h1">
          <span className="fb-h1-a">Where Every Cup</span>
          <span className="fb-h1-b">Tells a Story</span>
        </div>
        <p className="fb-subtitle">
          A sanctuary of single-origin beans, bamboo warmth and golden fairy lights —
          your trusted food partner since the very first brew.
        </p>
        <div className="fb-cta-row">
          <button className="fb-cta-main" onClick={onMenuClick}>Explore Menu</button>
          <button className="fb-cta-ghost">
            <span className="fb-arrow-circle">▶</span>Our story
          </button>
        </div>
        <div className="fb-stats-row">
          {STATS.map((s, i) => <StatBadge key={s.label} {...s} delay={2800 + i * 150} />)}
        </div>
      </div>
 
      <div className="fb-today-card">
        <div className="fb-tc-head">
          <div className="fb-tc-title">Today's Pour</div>
          <div className="fb-tc-sub">Single Origin Selection</div>
        </div>
        <div className="fb-tc-div" />
        <div className="fb-tc-body">
          {[
            { color: "#d4af37", name: "Filter Coffee", note: "Floral · Blueberry · Bright" },
            { color: "#8ab87a", name: "Masala Chai",       note: "Caramel · Stone fruit · Silky" },
            { color: "#4a7c3a", name: "Vada Pav", note: "Dark chocolate · Hazelnut" },
          ].map(item => (
            <div className="fb-tc-item" key={item.name}>
              <div className="fb-tc-dot" style={{ background: item.color }} />
              <div>
                <div className="fb-tc-name">{item.name}</div>
                <div className="fb-tc-note">{item.note}</div>
              </div>
            </div>
          ))}
          <button className="fb-tc-footer" onClick={onMenuClick}>View Full Menu →</button>
        </div>
      </div>
 
      <div className="fb-hv">— Heaven Valley —</div>
      <div className="fb-hero-bottom">
        <div className="fb-tags">
          {["☕ Coffee", "🍵 Tea", "🍽️ Snacks", "🍛 Mains", "✨ Good Vibes"].map(t => (
            <span key={t} className="fb-tag">{t}</span>
          ))}
        </div>
        <div className="fb-scroll">
          <div className="fb-scroll-bar" />
          <span className="fb-scroll-txt">Scroll</span>
        </div>
      </div>
    </section>
  );
}
 
function MenuSection() {
  const [activeTab, setActiveTab] = useState("coffee");
  const cat = MENU_CATEGORIES.find(c => c.id === activeTab);
  return (
    <section className="fb-menu-section" id="menu">
      <div className="fb-gold-rule" />
      <div className="fb-sec-label">What We Serve</div>
      <h2 className="fb-sec-title">Our <span>Menu</span></h2>
      <div className="fb-sec-div" />
      <div className="fb-cat-tabs">
        {MENU_CATEGORIES.map(c => (
          <button key={c.id}
            className={`fb-cat-tab${activeTab === c.id ? " active" : ""}`}
            onClick={() => setActiveTab(c.id)}>
            <span className="fb-cat-tab-icon">{c.icon}</span>{c.label}
          </button>
        ))}
      </div>
      <div className="fb-menu-grid">
        {cat.items.map(item => (
          <div className="fb-menu-card" key={item.name}>
            <div className="fb-mc-left">
              <div className="fb-mc-name">{item.name}</div>
              <div className="fb-mc-desc">{item.desc}</div>
            </div>
            <div className="fb-mc-price"><span>₹</span>{item.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
 
function AboutSection() {
  const stats = [
    { num: "2014", label: "Established" }, { num: "4B",    label: "Groups Brand" },
    { num: "320+", label: "Daily Cups"  }, { num: "100%",  label: "Fresh Daily"  },
  ];
  const feats = [
    
    { icon: "☕", text: "Single-origin beans brewed fresh"    },
    { icon: "🍛", text: "Authentic Indian home-style food"    },
    { icon: "✦",  text: "Green wall, fairy lights, warm ambience" },
  ];
  return (
    <section className="fb-about-section" id="about">
      <div className="fb-gold-rule" />
      <div className="fb-about-inner">
        <div className="fb-about-text">
          <div className="fb-sec-label">Our Story</div>
          <h2 className="fb-about-head">More Than a Cafe,<br /><em>A Way of Life</em></h2>
          <p className="fb-about-body">
            Born in Heaven Valley, 4B Cafe is where great food meets great people.
            From the first cup of filter coffee at dawn to the last plate of pav bhaji
            by fairy-light evenings, everything here is made with love, care and the
            finest local ingredients.
          </p>
          <div className="fb-about-features">
            {feats.map(f => (
              <div className="fb-about-feat" key={f.text}>
                <div className="fb-about-feat-icon">{f.icon}</div>{f.text}
              </div>
            ))}
          </div>
        </div>
        <div className="fb-about-stats">
          {stats.map(s => (
            <div className="fb-about-stat" key={s.label}>
              <div className="fb-about-stat-num">{s.num}</div>
              <div className="fb-about-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const filters = ["All", "Coffee", "Tea", "Snacks", "Mains", "Sweets", "Vibes"];
 
  const visible = filter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.tag === filter);
 
  return (
    <section className="fb-gallery-section" id="gallery">
      <div className="fb-gold-rule" />
      <div className="fb-sec-label">Captured Moments</div>
      <h2 className="fb-sec-title">Our <span>Gallery</span></h2>
      <div className="fb-sec-div" />
 
      <div className="fb-gallery-filters">
        {filters.map(f => (
          <button key={f}
            className={`fb-gf-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}>{f}
          </button>
        ))}
      </div>
 
      <div className="fb-gallery-grid">
        {visible.map((item, i) => (
          <div
            key={item.url + i}
            className={`fb-gallery-item${item.span === "wide" ? " span-wide" : item.span === "tall" ? " span-tall" : ""}`}
            onClick={() => setLightbox(item)}
          >
            <img src={item.url} alt={item.label} loading="lazy" />
            <div className="fb-gallery-overlay">
              <div className="fb-gallery-tag">{item.tag}</div>
              <div className="fb-gallery-name">{item.label}</div>
            </div>
            <div className="fb-gallery-strip">
              <div className="fb-gallery-strip-tag">{item.tag}</div>
              <div className="fb-gallery-strip-name">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
 
      {lightbox && (
        <div className="fb-lightbox" onClick={() => setLightbox(null)}>
          <img className="fb-lightbox-img" src={lightbox.url.replace("w=600", "w=1200")} alt={lightbox.label} onClick={e => e.stopPropagation()} />
          <button className="fb-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="fb-lightbox-caption">
            <div className="fb-lightbox-caption-tag">{lightbox.tag}</div>
            <div className="fb-lightbox-caption-name">{lightbox.label}</div>
          </div>
        </div>
      )}
    </section>
  );
}
 
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "", note: "" });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
 
  const hours = [
    { day: "Mon – Fri", time: "7 AM – 11 PM" },
    { day: "Saturday",  time: "7 AM – 12 AM" },
    { day: "Sunday",    time: "8 AM – 11 PM"  },
    { day: "Holidays",  time: "9 AM – 10 PM"  },
  ];
 
  return (
    <section className="fb-contact-section" id="contact">
      <div className="fb-gold-rule" />
      <div className="fb-sec-label">Find Us</div>
      <h2 className="fb-sec-title" style={{ marginBottom: "8px" }}>Come <span>Visit Us</span></h2>
      <div className="fb-sec-div" />
 
      <div className="fb-contact-inner" style={{ marginTop: "48px" }}>
        {/* LEFT — info cards */}
        <div className="fb-contact-info">
          <div className="fb-contact-card">
            <div className="fb-cc-head">
              <div className="fb-cc-icon">📍</div>
              <div className="fb-cc-title">Address</div>
            </div>
            <div className="fb-cc-body">
              <strong>4B Cafe  </strong>
              Avinashi Road, Opposite Fun Republic Mall,<br />
              Peelamedu, Coimbatore — 641 004,<br />
              Tamil Nadu, India
            </div>
          </div>
 
          <div className="fb-contact-card">
            <div className="fb-cc-head">
              <div className="fb-cc-icon">📞</div>
              <div className="fb-cc-title">Contact</div>
            </div>
            <div className="fb-cc-body">
              <strong>Phone </strong>
              <a href="tel:+911234567890">+91 123 456 7890</a><br /><br />
              <strong>Email </strong>
              <a href="mailto:info@4bgroups.com">info@4bgroups.com</a><br /><br />
      
            </div>
          </div>
 
          <div className="fb-contact-card">
            <div className="fb-cc-head">
              <div className="fb-cc-icon">🕐</div>
              <div className="fb-cc-title">Opening Hours</div>
            </div>
            <div className="fb-hours-grid">
              {hours.map(h => (
                <div className="fb-hour-row" key={h.day}>
                  <span className="fb-hour-day">{h.day}</span>
                  <span className="fb-hour-time">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* RIGHT — map + form */}
        <div className="fb-map-wrap">
          <div className="fb-map-frame">
            <iframe
              title="4B Cafe Coimbatore"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.265!2d76.9994!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183a30a2!2sPeelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
 
          <div className="fb-map-badge">
            <span className="fb-map-badge-icon">🗺️</span>
            <div className="fb-map-badge-address">
              <strong>4B Cafe — Heaven Valley</strong>
              Avinashi Road, Peelamedu, Coimbatore — 641 004
            </div>
          </div>
 
          {/* Reservation mini-form */}
          <div className="fb-contact-card fb-reserve-form">
            <div className="fb-reserve-form-title">✦ Reserve a Table ✦</div>
            {submitted ? (
              <div className="fb-form-success">
                🌿 Thank you! We'll confirm your reservation shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="fb-form-row">
                  <input className="fb-form-input" placeholder="Your Name" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input className="fb-form-input" placeholder="Phone Number" required
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="fb-form-row">
                  <input className="fb-form-input" type="date" required
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  <select className="fb-form-input"
                    value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}>
                    <option value="" disabled>Guests</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
                  </select>
                </div>
                <div className="fb-form-row">
                  <textarea className="fb-form-input fb-form-full" rows="2"
                    placeholder="Special requests (optional)"
                    value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                    style={{ resize: "none", gridColumn: "span 2" }} />
                </div>
                <button type="submit" className="fb-form-submit">Confirm Reservation →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="fb-footer">
      <div className="fb-footer-top">
        <div className="fb-footer-brand">
          <div className="fb-footer-logo">4B CAFE 🌿</div>
          <div className="fb-footer-tag">Food Made Better · Heaven Valley</div>
          <p>A space where great food, fresh brews and warm company come together. Come as you are. Leave with a story.</p>
        </div>
        <div>
          <div className="fb-footer-col-title">Navigate</div>
          <div className="fb-footer-nav-links">
            {["Home", "Menu", "About", "Gallery", "Contact"].map(l => (
              <button key={l} className="fb-footer-nav-link"
                onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="fb-footer-col-title">Get in Touch</div>
          <div className="fb-footer-contact-lines">
            <div className="fb-footer-contact-line"><span className="fb-footer-contact-icon">📍</span>Avinashi Road, Peelamedu,<br />Coimbatore — 641 004</div>
            <div className="fb-footer-contact-line"><span className="fb-footer-contact-icon">📞</span>+91 123 456 7890</div>
            <div className="fb-footer-contact-line"><span className="fb-footer-contact-icon">✉️</span>info@4bgroups.com</div>
            <div className="fb-footer-contact-line"><span className="fb-footer-contact-icon">🌐</span>www.4bgroups.com</div>
          </div>
        </div>
      </div>
      <div className="fb-footer-bottom">
        <div className="fb-footer-copy">© 2024 4B Groups · Your Trusted Food Partner</div>
        <div className="fb-footer-social">
          {["📘","📸","🐦","▶"].map((s, i) => (
            <div key={i} className="fb-footer-social-btn">{s}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}
 
/* ─── ROOT ────────────────────────────────────────────── */
export default function App() {
  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
 
  useEffect(() => {
    if (document.getElementById("fb-styles")) return;
    const style = document.createElement("style");
    style.id = "fb-styles";
    style.textContent = CSS;
    document.head.appendChild(style);
  }, []);
 
  return (
    <div className="fb-page">
      <Navbar />
      <HeroSection onMenuClick={scrollToMenu} />
      <MenuSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}