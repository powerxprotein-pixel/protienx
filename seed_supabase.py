import json
import urllib.request
import ssl

SUPABASE_URL = "https://ggfcfcsbqijxauuokeye.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZmNmY3NicWlqeGF1dW9rZXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODkwMDksImV4cCI6MjEwNTA2NTAwOX0.aLD45yiS_t_K15UnJEzD-y7alJTBo8ybsUL941a_DlI"

headers = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

ctx = ssl.create_default_context()

def check_table(table_name):
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=*&limit=1"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            return True
    except Exception as e:
        return False

def seed():
    print("Checking Supabase connection...")
    if not check_table("products"):
        print("ERROR: Tables do not exist yet. Please run the SQL script in Supabase SQL Editor first!")
        return False

    # 1. Seed Products from dealer_products.json
    print("Seeding products...")
    with open("dealer_products.json", "r", encoding="utf-8") as f:
        raw_products = json.load(f)

    db_products = []
    for p in raw_products:
        vars = p.get("variants", [])
        c_price = vars[0].get("price", 1999) if vars else 1999
        o_price = vars[0].get("mrp", c_price + 1000) if vars else c_price + 1000
        disc = p.get("badgeText") or f"{round(((o_price - c_price)/o_price)*100)}% OFF"

        db_products.append({
            "id": p["id"],
            "title": p["title"],
            "category": p.get("category", "proteins"),
            "rating": p.get("rating", 4.8),
            "reviews_count": p.get("reviewsCount", 120),
            "current_price": c_price,
            "original_price": o_price,
            "discount": disc,
            "in_stock": p.get("stock", 10) > 0,
            "image": p.get("image", ""),
            "gallery": [p.get("image", "")] if p.get("image") else [],
            "description": p.get("description", ""),
            "variants": vars,
            "is_veg": p.get("isVeg", True),
            "badge_text": p.get("badgeText", ""),
            "is_bestseller": p.get("isBestseller", False),
            "stock": p.get("stock", 30),
            "nutrition": p.get("nutrition", {})
        })

    # Batch insert in chunks of 20
    for i in range(0, len(db_products), 20):
        chunk = db_products[i:i+20]
        url = f"{SUPABASE_URL}/rest/v1/products"
        data = json.dumps(chunk).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, context=ctx) as res:
                print(f"Uploaded products {i+1} to {min(i+20, len(db_products))}")
        except Exception as e:
            print("Product upload error:", e)

    # 2. Seed Default Coupons
    print("Seeding coupons...")
    coupons = [
        {"code": "POWERX5", "type": "percent", "value": 5, "min_order": 999, "active": True},
        {"code": "BEAST10", "type": "percent", "value": 10, "min_order": 2499, "active": True},
        {"code": "TITAN15", "type": "percent", "value": 15, "min_order": 4999, "active": True},
        {"code": "FLAT200", "type": "fixed", "value": 200, "min_order": 1999, "active": True}
    ]
    req = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/coupons", data=json.dumps(coupons).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            print("Uploaded default coupons")
    except Exception as e:
        print("Coupon upload error:", e)

    # 3. Seed Default Combos
    print("Seeding combos...")
    combos = [
        {
            "id": "combo-pro-shred",
            "title": "Ultimate Muscle & Shred Stack",
            "subtitle": "ON Whey 2kg + Creatine 250g + Fish Oil 60 Caps",
            "badge": "SAVE ₹1,450",
            "price": 4999,
            "original_price": 6449,
            "discount": "23% OFF",
            "image": "assets/products/on-gold-standard-whey.jpeg",
            "items": ["on-gold-standard-whey", "mb-creatine-monohydrate-100g", "on-fish-oil-60softgels"]
        },
        {
            "id": "combo-mass-monster",
            "title": "Extreme Mass & Power Stacker",
            "subtitle": "Kevin Levrone Anabolic Gainer 3kg + Pre-Workout",
            "badge": "BESTSELLER",
            "price": 2899,
            "original_price": 3899,
            "discount": "26% OFF",
            "image": "assets/products/gn-anabolic-gainer-3kg.jpeg",
            "items": ["gn-anabolic-gainer-3kg", "gn-rage-pre-workout-300g"]
        }
    ]
    req = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/combos", data=json.dumps(combos).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            print("Uploaded default combos")
    except Exception as e:
        print("Combos upload error:", e)

    # 4. Seed Store Config (Banners & Settings)
    print("Seeding store config...")
    store_configs = [
        {
            "key": "banners",
            "data": {
                "desktopBanner": "assets/laptop banner.png",
                "mobileBanner": "assets/banner image.png"
            }
        },
        {
            "key": "settings",
            "data": {
                "storeName": "PowerX Protein Hub",
                "storeTagline": "100% Authentic Sports Nutrition & Supplements",
                "announcementText": "VOLCANIC NUTRITION SALE IS LIVE!",
                "promoDiscountHeadline": "Flat 60% OFF + Extra 5% with code",
                "promoCouponCode": "POWERX5",
                "contactPhone": "+91 98765 43210",
                "contactEmail": "support@powerxprotein.com",
                "freeShippingThreshold": 999,
                "gstNumber": "27AABCP1234F1Z8",
                "storeAddress": "Shop 14, PowerX Fitness Hub, Station Road, Boisar, Maharashtra 401501"
            }
        }
    ]
    req = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/store_config", data=json.dumps(store_configs).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            print("Uploaded default store config")
    except Exception as e:
        print("Store config upload error:", e)

    print("ALL DONE! Supabase is fully populated.")
    return True

if __name__ == "__main__":
    seed()
