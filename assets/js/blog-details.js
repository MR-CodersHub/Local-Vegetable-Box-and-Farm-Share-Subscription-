/**
 * HARVESTBOX — BLOG-DETAILS.JS
 * Renders the selected blog post inside blog-details.html based on the ?post= URL parameter.
 * All blog posts live in BLOG_POSTS below. No separate HTML files needed.
 */

'use strict';

const BLOG_AUTHORS = {
  anita: {
    name: 'Dr. Anita Sharma',
    title: 'Chief Quality Officer',
    role: 'Chief Quality Officer, HarvestBox | PhD Food Science, IIT Delhi',
    bio: 'Anita has spent 10+ years researching food safety and seasonal nutrition. She believes that understanding what to eat and when is the most accessible form of preventive medicine available to everyone.',
    short: 'PhD Food Science, IIT Delhi. 10+ years in food safety research. Passionate about seasonal nutrition and organic farming.'
  },
  vikram: {
    name: 'Chef Vikram Rao',
    title: 'Head of Recipe Development',
    role: 'Head of Recipe Development, HarvestBox',
    bio: 'Vikram spent 12 years leading kitchens in Bengaluru and Mumbai before joining HarvestBox. He builds seasonal recipes that make farm-fresh produce irresistibly easy to cook at home.',
    short: 'Trained at IHM Mumbai, 12 years of restaurant experience across Bengaluru and Mumbai. Specialises in seasonal, zero-waste home cooking.'
  },
  meera: {
    name: 'Meera Krishnan',
    title: 'Organic Certification Lead',
    role: 'Organic Certification Lead, HarvestBox',
    bio: 'Meera walks every partner farm before it joins our network. With 8 years in sustainable agriculture, she ensures every batch meets India Organic certification standards.',
    short: '8+ years in sustainable agriculture. Inspects and certifies all 50+ partner farms across India.'
  }
};

const BLOG_POSTS = {

  /* ============ EDITOR'S PICK (static default page content) ============ */
  'monsoon-vegetables': {
    title: '10 Seasonal Vegetables You Must Eat This Monsoon Season',
    static: true,
    date: 'Aug 10, 2026',
    img: 'assets/images/gen_home2_vegetables.png'
  },

  /* ============ LATEST ARTICLES ============ */
  'farm-table-recipes': {
    title: 'Farm-to-Table Recipes Using Only Local Produce',
    crumb: 'Kitchen Recipes',
    cat: 'Recipes',
    cat2: 'Local Produce',
    badgeClass: 'badge-terra',
    author: 'vikram',
    date: 'Aug 7, 2026',
    read: '8 min read',
    views: '6,540',
    img: 'assets/images/gen_home2_recipes.png',
    alt: 'Farm-to-table recipes made with local produce',
    intro: 'The closest farm to your kitchen is closer than you think. The five recipes below use nothing beyond what our partner farms in Tamil Nadu and Maharashtra are harvesting this very week.',
    toc: [
      { id: 'how-chosen', label: 'How We Chose These' },
      { id: 'five-recipes', label: 'The 5 Recipes' },
      { id: 'pantry', label: 'Stock the Pantry' }
    ],
    body: `
      <div class="pull-quote">"If it travelled less than 300 kilometres, it's local. If it was pulled from the ground this morning, it's dinner."</div>

      <h2 id="how-chosen" data-spy="how-chosen">How We Chose the Five Recipes</h2>
      <p>Every recipe below is built around a single hero ingredient that is at absolute peak ripeness right now. We start with what the farm is actually producing, and then design a dish around it — never the other way around. That is the whole secret of easy, flavourful, affordable cooking when you shop seasonal.</p>

      <h2 id="five-recipes" data-spy="five-recipes">The Five Recipes</h2>

      <h3>1. Ooty Spinach &amp; Nutmeg Pulao</h3>
      <p>Baby spinach from our Ooty farms is impossibly tender this month. Bloom whole spices in ghee, fold in the spinach until it just wilts, and finish with a whisper of fresh nutmeg. Twenty-five minutes from pot to plate.</p>

      <h3>2. Yercaud Orange &amp; Beet Salad</h3>
      <p>The first sugar-sweet Yercaud hill oranges have arrived. Segment them, toss with roasted beet cubes from Ooty, and dress with orange juice, mustard, and a pinch of flaky salt. The colour alone is worth it.</p>

      <h3>3. Hosur Vine-Tomato Curry</h3>
      <p>Sun-ripened vine tomatoes form the entire sauce — no puree, no canned anything. Cook them down with mustard seeds, curry leaves, and a handful of fresh coriander. Serve with hot rice and ghee.</p>

      <h3>4. Kodaikanal Basil Pesto Pasta</h3>
      <p>Our Kodaikanal herb garden grows sweet basil that smells like it belongs in a perfume bottle. Grind it with roasted peanuts (a South Indian twist), garlic, and olive oil. Toss with any short pasta and cherry tomatoes.</p>

      <h3>5. Kongu Coconut &amp; Ridge Gourd Stir-Fry</h3>
      <p>Ridge gourd is at its monsoon peak — mild, hydrating, and quick-cooking. Stir-fry with grated coconut, slit green chillies, and a pop of mustard seeds. Five ingredients, ten minutes, zero leftovers.</p>

      <h2 id="pantry" data-spy="pantry">Stock the Pantry</h2>
      <p>You do not need a spice drawer of forty jars. A good basmati, cold-pressed oil, mustard seeds, curry leaves, garlic, and one good chilli powder cover 90% of local Indian cooking. Everything else — the vegetables themselves — is the point.</p>
    `,
    recipe: {
      name: 'Ooty Spinach & Nutmeg Pulao',
      desc: 'Ready in 30 minutes. Serves 4.',
      ingredients: [
        '2 cups basmati rice, rinsed',
        '250g fresh baby spinach',
        '1 tbsp ghee + 1 tbsp oil',
        '1 tsp cumin, 4 cloves, 1 bay leaf',
        '1 large onion, sliced',
        '1-inch ginger, julienned',
        'Fresh nutmeg, grated (1/4 tsp)',
        'Salt to taste'
      ],
      details: [['Serves', '4'], ['Prep', '10 minutes'], ['Cook', '20 minutes'], ['Calories', '~320 kcal'], ['Difficulty', 'Easy']]
    }
  },

  'organic-guide': {
    title: 'The Complete Guide to Identifying Organic Produce',
    crumb: 'Organic Tips',
    cat: 'Organic Tips',
    cat2: 'Certification',
    badgeClass: 'badge-leaf',
    author: 'meera',
    date: 'Aug 3, 2026',
    read: '6 min read',
    views: '9,120',
    img: 'assets/images/gen_home2_organic.png',
    alt: 'Organic produce and certification labels',
    intro: 'Anyone can put a leaf on a label. Here is how to tell genuinely organic produce from clever marketing — the same checklist we use when auditing partner farms.',
    toc: [
      { id: 'certification', label: 'Read the Certification Mark' },
      { id: 'appearance', label: 'Question the Appearance' },
      { id: 'smell', label: 'Smell and Taste' },
      { id: 'provenance', label: 'Ask Where It Was Grown' }
    ],
    body: `
      <h2 id="certification" data-spy="certification">Step 1: Read the Certification Mark</h2>
      <p>In India, genuine organic produce carries the India Organic (Jaivik Bharat) mark — a green leaf logo with a unique 12-digit certification number. Farm-direct sellers should be able to show you that number and the certifying body (like Aditi Organic, OneCert, or Control Union). If the only "certification" is a fancy sticker with no number, it is marketing.</p>

      <h2 id="appearance" data-spy="appearance">Step 2: Question the Appearance</h2>
      <p>Organic vegetables are rarely uniform. Expect crooked carrots, slightly imperfect tomatoes, and leaves with the occasional nibble mark. A flaw is not a sign of poor quality — it is a sign that pesticides were not used to produce a flawless-looking product. Shiny, identical, "perfect" produce at commodity prices should make you suspicious.</p>

      <h2 id="smell" data-spy="smell">Step 3: Smell and Taste</h2>
      <p>This is the test shoppers skip most often. A real organic tomato hits you with aroma the moment you cut it. Organic leafy greens taste green — grassy, sweet, alive. If a vegetable smells of nothing, it likely grew on chemical residue, not living soil. Growers who invest in soil health cannot fake the flavour.</p>

      <div class="pull-quote">"The best certification is a farm that will happily let you walk through it."</div>

      <h2 id="provenance" data-spy="provenance">Step 4: Ask Where It Was Grown</h2>
      <p>A vendor who cannot tell you the farm, the district, and the harvest day does not know their supply chain. At HarvestBox every batch is traceable to a specific partner farm and a specific harvest date — and we publish lab test results for pesticide residues on request.</p>
    `
  },

  'immunity-veggies': {
    title: 'Top 8 Vegetables That Naturally Boost Your Immunity',
    crumb: 'Nutrition',
    cat: 'Nutrition',
    cat2: 'Health',
    badgeClass: 'badge-green',
    author: 'anita',
    date: 'Jul 28, 2026',
    read: '7 min read',
    views: '11,340',
    img: 'assets/images/gen_blog_immunity.png',
    alt: 'Immunity boosting vegetables',
    intro: 'Your immune system consumes more energy than any other system in your body — and it is built entirely out of what you eat. These eight vegetables are the most evidence-backed immunity builders available in Indian markets today.',
    toc: [
      { id: 'science', label: 'The Science' },
      { id: 'veg-list', label: 'The 8 Vegetables' },
      { id: 'stir-fry', label: 'The Rainbow Stir-Fry' }
    ],
    body: `
      <h2 id="science" data-spy="science">The Science of Immune-Boosting Foods</h2>
      <p>Immunity is not a switch you flip — it is a daily building process. White blood cells, antibodies, and antioxidant enzymes all depend on micronutrients: zinc, vitamin C, vitamin A, folate, and the polyphenols found in colourful plants. Eating a variety of vegetables across the week gives your immune system the raw materials it needs. No single food "boosts immunity"; a pattern of eating does.</p>

      <h2 id="veg-list" data-spy="veg-list">The Eight Vegetables to Rotate</h2>

      <h3>1. Spinach</h3>
      <p>Rich in folate, iron, and vitamin C — and the lutein and zeaxanthin that protect your skin and eyes. Lightly cook it to release oxalates and improve iron absorption.</p>

      <h3>2. Broccoli</h3>
      <p>A single cup of broccoli covers your daily vitamin C need. Sulforaphane, its signature compound, activates antioxidant enzymes that protect cells from damage. Steam lightly — never boil it into submission.</p>

      <h3>3. Garlic</h3>
      <p>Allicin, released when garlic is crushed and rests for ten minutes, has been shown in trials to reduce the severity of colds and flu. Add it late in cooking to preserve its active compounds.</p>

      <h3>4. Ginger</h3>
      <p>Fresh ginger dampens inflammation and nausea. Its gingerol compound is a natural antimicrobial — rescue a dull dal with a knob of it, grated raw.</p>

      <div class="pull-quote">"The immune system doesn't need a supplement — it needs a vegetable garden."</div>

      <h3>5. Cabbage</h3>
      <p>Fermented or raw, cabbage feeds the gut bacteria that train 70% of your immune cells. Red cabbage adds anthocyanin antioxidants that plain green lacks.</p>

      <h3>6. Carrots</h3>
      <p>Beta-carotene (pro-vitamin A) maintains the mucus membranes — the immune system's front-line barriers. One medium carrot covers your daily need; cook it in a little fat to double absorption.</p>

      <h3>7. Bell Peppers</h3>
      <p>Yellow and red bell peppers contain 2-3x more vitamin C than oranges. Eat them raw in salads to preserve every milligram.</p>

      <h3>8. Beetroot</h3>
      <p>Betanin, the pigment that stains your fingers, is one of the strongest natural antioxidants studied. Roast beetroots weekly and keep them in the fridge for easy addition to bowls and salads.</p>

      <h2 id="stir-fry" data-spy="stir-fry">Put Them Together: The Rainbow Stir-Fry</h2>
      <p>The easiest immunity habit is a weekly "rainbow wok" — grated carrot, sliced cabbage, broccoli florets, bell pepper, garlic, and ginger, flash-fried in cold-pressed oil. All eight vegetables, one pan, twenty minutes. Recipe below.</p>
    `,
    recipe: {
      name: 'Immunity Rainbow Stir-Fry',
      desc: 'Ready in 20 minutes. Serves 2.',
      ingredients: [
        '1 cup broccoli florets',
        '1 cup cabbage, shredded',
        '1 bell pepper, sliced',
        '1 medium carrot, julienned',
        '4 garlic cloves, sliced',
        '1-inch ginger, julienned',
        '1 tbsp cold-pressed oil',
        '1 tbsp toasted sesame seeds',
        'Salt and pepper to taste'
      ],
      details: [['Serves', '2'], ['Prep', '10 minutes'], ['Cook', '8 minutes'], ['Calories', '~140 kcal'], ['Difficulty', 'Easy']]
    }
  },

  'kurinji-valley-farmers': {
    title: 'Meet the Farmers: A Day at Kurinji Valley Farm',
    crumb: 'Farm Stories',
    cat: 'Farm Story',
    cat2: 'Ooty, Tamil Nadu',
    badgeClass: 'badge-terra',
    author: 'meera',
    date: 'Jul 22, 2026',
    read: '5 min read',
    views: '4,860',
    img: 'assets/images/gen_blog_farm.png',
    alt: 'A day at Kurinji Valley Farm in Ooty',
    intro: 'We spent 24 hours at one of our oldest partner farms — 8 acres of certified organic land above Ooty, run by Meenakshi & Selvam since 1998 — to understand what it truly takes to grow food without shortcuts.',
    toc: [
      { id: 'harvest-window', label: '4:30 AM — Harvest Window' },
      { id: 'sorting', label: '8:30 AM — Sorting' },
      { id: 'soil', label: '11 AM — The Soil Philosophy' },
      { id: 'numbers', label: 'The Numbers' }
    ],
    body: `
      <h2 id="harvest-window" data-spy="harvest-window">4:30 AM — The Harvest Window</h2>
      <p>Harvesting at Kurinji Valley starts before sunrise, literally by headlamp. Vegetables pulled in the cool hours hold water and nutrients far better than those harvested under midday heat. By 6 AM, crates of leafy greens are already loaded into the chilled van that drives down the ghat to our Coimbatore hub.</p>

      <h2 id="sorting" data-spy="sorting">8:30 AM — Sorting and Grading</h2>
      <p>At the sorting shed, the Selvam family stands shoulder to shoulder. Damaged leaves are stripped for compost; misshapen produce is not wasted — it goes to a local temple kitchen programme. Only the best 80% of the harvest ever reaches your order box. "We grade honestly," says Selvam, "because our name is on every box."</p>

      <div class="pull-quote">"We grade honestly, because our name is on every box." — Selvam, Kurinji Valley Farm</div>

      <h2 id="soil" data-spy="soil">11 AM — The Soil Philosophy</h2>
      <p>Walk the terraces and you will find compost pits, neem trees planted as windbreaks, and basil rows between vegetable beds — a live pest-management system. The farm has not used synthetic fertiliser in 14 years. Instead, cow dung from their own herd, vermicompost, and green manure crops rebuild the soil that grows the food. Healthy soil is the entire business model.</p>

      <h2 id="numbers" data-spy="numbers">The Numbers Behind the Day</h2>
      <p>8 acres · 30 varieties · 6,000 crates a year · zero synthetic inputs since 2012 · 3 full-time families on the payroll. The economics work because the buyers (that is, you) pay enough for food that was grown properly — the exact trade-off HarvestBox was built around.</p>
    `
  },

  'mango-guide': {
    title: 'Mango Season is Here: A Complete Variety Guide',
    crumb: 'Seasonal',
    cat: 'Seasonal',
    cat2: 'Fruits',
    badgeClass: 'badge-gold',
    author: 'vikram',
    date: 'Jul 15, 2026',
    read: '4 min read',
    views: '13,270',
    img: 'assets/images/gen_blog_mango.png',
    alt: 'Tamil Nadu mango varieties guide',
    intro: 'Malgova, Banganapalli, Neelam, Rumani — Tamil Nadu grows hundreds of mango varieties across Salem, Krishnagiri and Dindigul orchards. Here is how to tell the great ones apart, and exactly when each one peaks.',
    toc: [
      { id: 'malgova', label: 'Malgova' },
      { id: 'banganapalli', label: 'Banganapalli' },
      { id: 'neelam', label: 'Neelam' },
      { id: 'rumani', label: 'Rumani' },
      { id: 'ripen', label: 'Ripen & Store' }
    ],
    body: `
      <h2 id="malgova" data-spy="malgova">Malgova — Pride of the Salem Orchards</h2>
      <p>Grown in the red soils around Salem, Malgova is Tamil Nadu’s most fragrant mango — honey-sweet, fibreless, with an aroma that fills the room. Our farm-share box mango through the season. Peak: May to July. Ripen at room temperature; refrigerate only once soft.</p>

      <h2 id="banganapalli" data-spy="banganapalli">Banganapalli — The Juicy All-Rounder</h2>
      <p>Big, pale-gold and famously juicy, Banganapalli has almost no fibre and purees like silk — the smoothest mango for milkshakes, lassi and aamras. Peak: April to June.</p>

      <h2 id="neelam" data-spy="neelam">Neelam — The Late-Season Gift</h2>
      <p>Small, fragrant and intensely sweet, Neelam arrives just as other mangoes bow out. A South Indian favourite for pickles and fresh eating alike. Peak: June to August.</p>

      <h2 id="rumani" data-spy="rumani">Rumani — The Everyday Red-Gold</h2>
      <p>Blushed red-gold skin with sweet-tart flesh that holds its shape in salads. The reliable daily mango of Tamil Nadu households. Peak: June to July.</p>

      <div class="pull-quote">"Eat mango the way it arrived: at room temperature, cut cheeks first, and never mind the sticky fingers."</div>

      <h2 id="ripen" data-spy="ripen">How to Ripen and Store</h2>
      <p>Keep mangoes at room temperature, away from sunlight, wrapped loosely in newspaper. Check daily by gentle squeeze near the stem. Once ripe, they last 4-5 days in the fridge crisper — or about ten minutes on your kitchen counter, realistically.</p>
    `,
    recipe: {
      name: 'Easy Malgova Aamras',
      desc: 'Ready in 10 minutes. Serves 4.',
      ingredients: [
        '2 large ripe Malgova mangoes',
        '1/2 cup full-fat milk (or coconut milk)',
        '1 tsp cardamom powder',
        '1 tbsp raw honey (optional)',
        'Saffron strands, for garnish',
        '2 tbsp chopped pistachios'
      ],
      details: [['Serves', '4'], ['Prep', '10 minutes'], ['Cook', '0 minutes'], ['Calories', '~110 kcal'], ['Difficulty', 'Easy']]
    }
  },

  'smoothie-bowls': {
    title: '5 Vibrant Smoothie Bowls for a Healthy Monsoon Morning',
    crumb: 'Kitchen Recipes',
    cat: 'Recipes',
    cat2: 'Breakfast',
    badgeClass: 'badge-terra',
    author: 'vikram',
    date: 'Jul 8, 2026',
    read: '6 min read',
    views: '8,910',
    img: 'assets/images/blog_smoothie.jpg',
    alt: 'Vibrant smoothie bowls with fruit toppings',
    intro: 'Monsoon mornings call for something bright. These five bowls are built entirely from seasonal organic fruits — thick enough to eat with a spoon, colourful enough to make rain feel optional.',
    toc: [
      { id: 'golden-rule', label: 'The Golden Rule' },
      { id: 'five-bowls', label: 'The 5 Bowls' },
      { id: 'toppings', label: 'Toppings That Matter' }
    ],
    body: `
      <h2 id="golden-rule" data-spy="golden-rule">The Golden Rule of Smoothie Bowls</h2>
      <p>A good smoothie bowl is 30% smoothie and 70% toppings — texture is everything. Freeze your fruit the night before, blend it with barely any liquid, and spoon it into a bowl while it is still thick enough to hold a nut trail. Think of the base as a canvas, not the dish.</p>

      <h2 id="five-bowls" data-spy="five-bowls">The Five Bowls</h2>

      <h3>1. Mango–Turmeric Sunrise</h3>
      <p>Frozen Malgova chunks, a pinch of raw turmeric, and a splash of coconut milk. Topped with toasted coconut flakes and pomegranate. The golden bowl that fights inflammation and tastes like summer.</p>

      <h3>2. Banana–Ginger Green Bowl</h3>
      <p>Frozen banana, baby spinach, and a thumb of ginger blended with yoghurt. Top with kiwi coins and granola. The ginger wakes you up better than coffee.</p>

      <h3>3. Beet–Cocoa Power Bowl</h3>
      <p>Roasted and frozen beet cubes, raw cacao, dates, and milk of choice — a chocolate bowl with honest nutrition. Top with cacao nibs and banana slices.</p>

      <h3>4. Papaya–Lime Tropical Bowl</h3>
      <p>Frozen papaya, lime zest, and mint leaves blended with coconut water. Digestive-friendly and absurdly refreshing — the monsoon morning reset.</p>

      <h3>5. Berry–Basil Glow Bowl</h3>
      <p>Mixed frozen berries with sweet basil (yes, basil) and a spoon of honey. Bright, tangy, antioxidant-dense — and the basil makes it unforgettable. Full recipe below.</p>

      <div class="pull-quote">"Texture is not a garnish problem. It is the whole point of the bowl."</div>

      <h2 id="toppings" data-spy="toppings">Toppings That Matter</h2>
      <p>Keep five jars ready: granola, toasted coconut, chopped nuts, chia seeds, and seasonal fruit coins. Five minutes of topping assembly turns a smoothie into a meal — and a meal into a picture worth posting.</p>
    `,
    recipe: {
      name: 'Berry\u2013Basil Glow Bowl',
      desc: 'Ready in 10 minutes. Serves 1.',
      ingredients: [
        '1 cup mixed frozen berries',
        '1 frozen banana',
        '6 fresh basil leaves',
        '1 tbsp raw honey',
        '2 tbsp cold milk or yoghurt',
        'Toppings: granola, chia, kiwi coins'
      ],
      details: [['Serves', '1'], ['Prep', '10 minutes'], ['Cook', '0 minutes'], ['Calories', '~220 kcal'], ['Difficulty', 'Easy']]
    }
  },

  /* ============ POPULAR RECIPES ============ */
  'monsoon-salad': {
    title: 'Monsoon Garden Salad with Lemon-Herb Dressing',
    crumb: 'Popular Recipes',
    cat: 'Recipes',
    cat2: 'Popular',
    badgeClass: 'badge-terra',
    author: 'vikram',
    date: 'Jun 29, 2026',
    read: '4 min read',
    views: '12,400',
    img: 'assets/images/blog_monsoon_salad.png',
    alt: 'Fresh monsoon salad ingredients flat lay',
    intro: 'The classic answer to "what can I do with all this seasonal produce?" — a crunchy, citrussy salad that uses whatever the garden (or the market) gave you that morning.',
    toc: [
      { id: 'building', label: 'Building the Salad' },
      { id: 'dressing', label: 'The Lemon-Herb Dressing' },
      { id: 'meal', label: 'Make It a Meal' }
    ],
    body: `
      <h2 id="building" data-spy="building">Building the Perfect Monsoon Salad</h2>
      <p>Start with crunch, add colour, finish with greens. The formula that never fails: one shredded vegetable (carrot), one ribboned vegetable (cucumber), one sweet element (cherry tomatoes), one fragrant leaf (fresh methi or basil), and one textural hero (roasted peanuts). Mango is at its peak — if you have a ripe one, cubes of it make this salad unforgettable.</p>

      <h2 id="dressing" data-spy="dressing">The Lemon-Herb Dressing</h2>
      <p>Whisk the juice of two lemons with a teaspoon of mustard, a clove of crushed garlic, three tablespoons of cold-pressed oil, and a pinch of salt and black pepper. Then the secret: torn coriander and mint stirred in at the last minute. Thirty seconds of emulsion work; ten times more flavour than any bottled dressing.</p>

      <div class="pull-quote">"A salad is only as good as its last herb. Chop late, dress just before serving, and nobody will believe it took fifteen minutes."</div>

      <h2 id="meal" data-spy="meal">Make It a Meal</h2>
      <p>Add a toasted cup of moong sprouts or leftover rice to turn this side into a light monsoon dinner. For a fuller version, crumble some fresh paneer or add a soft-boiled farm egg on top. The base recipe stays the same — it scales quietly.</p>
    `,
    recipe: {
      name: 'Monsoon Garden Salad with Lemon-Herb Dressing',
      desc: 'Ready in 15 minutes. Serves 4.',
      ingredients: [
        '2 cups mixed monsoon greens',
        '1 medium carrot, julienned',
        '1 cucumber, ribboned',
        '1/2 cup cherry tomatoes, halved',
        '1/4 cup fresh methi or basil leaves',
        '1/4 cup roasted peanuts',
        'Juice of 2 lemons',
        '1 tsp mustard, 1 clove garlic',
        '3 tbsp cold-pressed oil',
        'Coriander and mint, torn'
      ],
      details: [['Serves', '4'], ['Prep', '15 minutes'], ['Cook', '0 minutes'], ['Calories', '~95 kcal'], ['Difficulty', 'Easy']]
    }
  },

  'veggie-biryani': {
    title: 'Farm-Fresh Vegetable Biryani (One-Pot)',
    crumb: 'Popular Recipes',
    cat: 'Recipes',
    cat2: 'Popular',
    badgeClass: 'badge-terra',
    author: 'vikram',
    date: 'Jun 18, 2026',
    read: '7 min read',
    views: '9,800',
    img: 'assets/images/blog_veggie_biryani.png',
    alt: 'One-pot vegetable biryani with farm vegetables',
    intro: 'The biryani that makes a weekday dinner feel like a Sunday feast — one pot, layered rice, and whatever vegetables are freshest at your market this week.',
    toc: [
      { id: 'one-pot', label: 'Why One-Pot Works' },
      { id: 'flavour', label: 'Layers of Flavour' },
      { id: 'method', label: 'The 3-Step Method' },
      { id: 'pairing', label: 'Pairing Suggestions' }
    ],
    body: `
      <h2 id="one-pot" data-spy="one-pot">Why One-Pot Works</h2>
      <p>Classic biryani fans will object, but for a home kitchen the one-pot method wins every weeknight: all the steam stays in the pot, so the vegetables steam themselves to perfect tenderness inside the rice. Less washing up, less skill required, and the layered flavour still lands.</p>

      <h2 id="flavour" data-spy="flavour">Layers of Flavour</h2>
      <p>Three layers do the work. First, a spiced base of onions, ginger-garlic, and tomato cooked dark and jammy. Second, your vegetables — root veg first, leafy last. Third, the rice with whole spices, saffron milk, and herbs scattered on top before the lid goes on for good.</p>

      <div class="pull-quote">"In a one-pot biryani, the vegetables are not a filling — they are the architecture of the dish."</div>

      <h2 id="method" data-spy="method">The 3-Step Method</h2>
      <p><strong>Step 1:</strong> Rinse and soak basmati for 20 minutes while the spiced base cooks. <strong>Step 2:</strong> Lay in the vegetables, then the rice, then pour over boiled water with saffron and a sealed lid. <strong>Step 3:</strong> Twelve minutes on high, then eight minutes resting with the lid ON — the resting is where the magic happens. Never stir.</p>

      <h2 id="pairing" data-spy="pairing">Pairing Suggestions</h2>
      <p>Cool cucumber raita with roasted cumin, a wedge of lime, and sliced onions in lemon juice. If mango is in season, a small bowl of aamras on the side is the most luxurious contrast you can manage for under five rupees of fruit.</p>
    `,
    recipe: {
      name: 'Farm-Fresh Vegetable Biryani',
      desc: 'Ready in 1 hour. Serves 4-6.',
      ingredients: [
        '2 cups basmati rice',
        '2 large onions, sliced',
        '2 tomatoes, chopped',
        '2 tbsp ginger-garlic paste',
        '1 cup carrots + beans, chopped',
        '1 cup cauliflower florets',
        '1/2 cup fresh peas',
        'Whole spices: cloves, cardamom, cinnamon',
        'Saffron strands in warm milk',
        'Fresh coriander and mint',
        '3-4 cups boiled water',
        'Salt and ghee to taste'
      ],
      details: [['Serves', '4-6'], ['Prep', '20 minutes'], ['Cook', '45 minutes'], ['Calories', '~480 kcal'], ['Difficulty', 'Medium']]
    }
  },

  'green-juice': {
    title: 'Green Immunity Booster Juice (5 Ingredients)',
    crumb: 'Nutrition',
    cat: 'Nutrition',
    cat2: 'Popular',
    badgeClass: 'badge-green',
    author: 'anita',
    date: 'Jun 9, 2026',
    read: '3 min read',
    views: '8,200',
    img: 'assets/images/blog_green_juice.png',
    alt: 'Green smoothie bowl with fresh fruit',
    intro: 'Five ingredients, five minutes, one very serious glass of green. This is the recipe our quality team actually drinks every morning during monsoon season.',
    toc: [
      { id: 'why-five', label: 'Why Only Five' },
      { id: 'the-five', label: 'The Five Ingredients' },
      { id: 'when', label: 'When to Drink It' }
    ],
    body: `
      <h2 id="why-five" data-spy="why-five">Why Only Five Ingredients</h2>
      <p>Every ingredient in this juice earns its place: one leafy base for micronutrients, one root for anti-inflammatory power, one spice for antimicrobial action, one fruit for vitamin C, and water. Beyond that, you are just diluting the potency. Five is the maximum useful number.</p>

      <h2 id="the-five" data-spy="the-five">The Five Ingredients</h2>
      <p><strong>1. Baby spinach</strong> — folate, iron, vitamin C.<br><strong>2. Raw turmeric root</strong> — fresh curcumin is five times more bioavailable than the dried powder.<br><strong>3. Fresh ginger</strong> — gingerol for inflammation and nausea.<br><strong>4. Lemon</strong> — vitamin C plus the citric acid that helps curcumin absorb.<br><strong>5. A pinch of black pepper</strong> — piperine multiplies curcumin absorption by 2,000%.</p>

      <div class="pull-quote">"Piperine is the difference between drinking turmeric and absorbing it. Never skip the pepper."</div>

      <h2 id="when" data-spy="when">When to Drink It</h2>
      <p>On an empty stomach, before breakfast, every day during monsoon. The curcumin compounds are fat-soluble — if the juice makes your stomach feel sharp, add a teaspoon of coconut oil and blend. Expect the first noticeable difference in energy within a week.</p>
    `,
    recipe: {
      name: 'Green Immunity Booster Juice',
      desc: 'Ready in 5 minutes. Serves 2.',
      ingredients: [
        '1 cup fresh baby spinach',
        '1-inch raw turmeric root, peeled',
        '1-inch fresh ginger',
        'Juice of 1 lemon',
        'A pinch of black pepper',
        '150ml cold water',
        '1 tsp coconut oil (optional)'
      ],
      details: [['Serves', '2'], ['Prep', '5 minutes'], ['Cook', '0 minutes'], ['Calories', '~45 kcal'], ['Difficulty', 'Easy']]
    }
  },

  'mango-lassi': {
    title: 'Mango Lassi with Raw Honey (No Sugar Added)',
    crumb: 'Popular Recipes',
    cat: 'Seasonal',
    cat2: 'Popular',
    badgeClass: 'badge-gold',
    author: 'vikram',
    date: 'May 30, 2026',
    read: '4 min read',
    views: '7,600',
    img: 'assets/images/blog_mango_lassi.png',
    alt: 'Mango lassi with raw honey and cardamom',
    intro: 'The most famous drink of the Indian summer, fixed properly: ripe mango, thick curd, a little milk, and raw honey instead of sugar. No syrups, no shortcuts.',
    toc: [
      { id: 'ratio', label: 'The Perfect Ratio' },
      { id: 'honey', label: 'Why Raw Honey' },
      { id: 'occasions', label: 'A Lassi for Every Occasion' }
    ],
    body: `
      <h2 id="ratio" data-spy="ratio">The Perfect Ratio</h2>
      <p>Two parts ripe mango to one part thick curd, a splash of milk to loosen the blend, and honey only if the mango needs it. A truly ripe Malgova or Banganapalli is sweet enough on its own — the honey is insurance, not a requirement. Ice goes in the glass, never in the blender.</p>

      <h2 id="honey" data-spy="honey">Why Raw Honey Beats Sugar</h2>
      <p>White sugar adds sweetness and nothing else. Raw honey carries antioxidants, enzymes, and a floral dimension that changes the whole flavour profile. Use it sparingly — a tablespoon per two glasses is plenty. The cardamom is the secret handshake: two crushed pods make the difference between a good lassi and a memorable one.</p>

      <div class="pull-quote">"A great lassi is 90% the quality of its mango and 10% nerve. Buy the best fruit you can afford."</div>

      <h2 id="occasions" data-spy="occasions">A Lassi for Every Occasion</h2>
      <p>For breakfast, blend in a spoon of chia and serve thick. For the classic thali finish, keep it frothy and tall with a chilled steel glass. For a grown-up twist, an extra pinch of roasted cumin powder on top cuts the sweetness beautifully. One recipe, three moods, zero sugar.</p>
    `,
    recipe: {
      name: 'Mango Lassi with Raw Honey',
      desc: 'Ready in 10 minutes. Serves 2.',
      ingredients: [
        '2 ripe Malgova or Banganapalli mangoes',
        '1 cup thick curd (yoghurt)',
        '1/2 cup cold milk',
        '1 tbsp raw honey (optional)',
        '2 cardamom pods, crushed',
        'Ice cubes for serving',
        'Saffron or pistachio, to garnish'
      ],
      details: [['Serves', '2'], ['Prep', '10 minutes'], ['Cook', '0 minutes'], ['Calories', '~180 kcal'], ['Difficulty', 'Easy']]
    }
  }
};

/* ================================================================
   RENDER LOGIC
   ================================================================ */
const renderBlogPost = () => {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('post');
  const post   = BLOG_POSTS[slug];

  /* Related posts are always regenerated (fallback = monsoon post) */
  renderRelated(post && !post.static ? slug : 'monsoon-vegetables');

  /* Static default (monsoon) stays as-is for no-JS / direct visits */
  if (!post || post.static) return;

  const a = BLOG_AUTHORS[post.author];

  /* ---- SEO ---- */
  document.title = post.title + ' \u2014 HarvestBox Blog';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', post.intro.slice(0, 152));
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', post.title + ' \u2014 HarvestBox Blog');

  /* ---- Breadcrumb ---- */
  const crumb = document.getElementById('p-crumb');
  if (crumb) crumb.textContent = post.crumb;

  /* ---- Hero badges ---- */
  const badges = document.getElementById('p-badges');
  if (badges) {
    badges.innerHTML =
      '<span class="badge ' + post.badgeClass + '">' + post.cat + '</span>' +
      '<span class="badge" style="background:rgba(255,255,255,0.2);color:white;">' + post.cat2 + '</span>';
  }

  /* ---- Hero title ---- */
  const heading = document.getElementById('article-heading');
  if (heading) heading.textContent = post.title;

  /* ---- Hero meta ---- */
  const meta = document.getElementById('p-hero-meta');
  if (meta) {
    meta.innerHTML =
      '<div style="display:flex;align-items:center;gap:0.5rem;"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>' + a.name + '</span></div>' +
      '<div><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + post.date + '</div>' +
      '<div><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + post.read + '</div>' +
      '<div>' + post.views + ' views</div>';
  }

  /* ---- Hero image ---- */
  const heroImg = document.getElementById('p-hero-img');
  if (heroImg) {
    heroImg.innerHTML =
      '<img src="' + post.img + '" alt="' + post.alt + '" style="width:100%;border-radius:var(--radius-xl);">';
  }

  /* ---- Article body ---- */
  const body = document.getElementById('p-article-body');
  if (body) {
    body.innerHTML =
      '<p itemprop="description">' + post.intro + '</p>' + post.body +
      '<div style="margin-top:1.5rem;"><a href="home2.html#daily-produce" class="btn btn-primary btn-lg">Shop Today\'s Picks \u2192</a></div>';
  }

  /* ---- Schema meta ---- */
  const dateMeta = document.querySelector('meta[itemprop="datePublished"]');
  if (dateMeta) dateMeta.setAttribute('content', '2026-01-01');
  const authorMeta = document.querySelector('meta[itemprop="author"]');
  if (authorMeta) authorMeta.setAttribute('content', a.name);

  /* ---- TOC ---- */
  const toc = document.getElementById('p-toc');
  if (toc) {
    toc.innerHTML = post.toc.map(t =>
      '<li><a href="#' + t.id + '" data-spy="' + t.id + '">' + t.label + '</a></li>'
    ).join('');
  }

  /* ---- Sidebar author card ---- */
  const authorCard = document.getElementById('p-author-card');
  if (authorCard) {
    authorCard.innerHTML =
      '<div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:1rem;">' +
        '<div style="width:52px;height:52px;background:var(--color-forest-50);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--color-forest);flex-shrink:0;" aria-hidden="true"><svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>' +
        '<div><div style="font-weight:600;color:var(--text-primary);font-size:var(--text-sm);">' + a.name + '</div>' +
        '<div style="font-size:var(--text-xs);color:var(--color-leaf);">' + a.title + '</div></div>' +
      '</div>' +
      '<p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:var(--lh-relaxed);">' + a.short + '</p>';
  }

  /* ---- Author bio section ---- */
  const bioName = document.getElementById('p-bio-name');
  if (bioName) bioName.textContent = a.name;
  const bioRole = document.getElementById('p-bio-role');
  if (bioRole) bioRole.textContent = a.role;
  const bioText = document.getElementById('p-bio-text');
  if (bioText) bioText.textContent = a.bio;

  /* ---- Featured recipe section ---- */
  const recipeSec = document.getElementById('recipe-section');
  const recipeBox = document.getElementById('p-recipe');
  if (recipeSec && recipeBox) {
    if (!post.recipe) {
      recipeSec.style.display = 'none';
    } else {
      recipeSec.style.display = '';
      const r = post.recipe;
      recipeBox.innerHTML =
        '<div class="section-label" data-reveal="fade-up"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 11a8 8 0 0 0 16 0H4z"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/></svg> Featured Recipe</div>' +
        '<h2 class="section-title" id="recipe-section-heading" data-reveal="fade-up" data-delay="100">Featured <span class="highlight">Recipe</span></h2>' +
        '<div class="recipe-box" data-reveal="fade-up" data-delay="200" itemscope itemtype="https://schema.org/Recipe">' +
          '<meta itemprop="name" content="' + r.name + '">' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">' +
            '<div>' +
              '<h3 itemprop="recipeIngredient" style="color:var(--color-forest);display:flex;align-items:center;gap:0.375rem;"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 11a8 8 0 0 0 16 0H4z"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/></svg> Ingredients</h3>' +
              '<ul style="color:var(--text-secondary);font-size:var(--text-sm);list-style:disc;padding-left:1.25rem;">' +
                r.ingredients.map(i => '<li itemprop="recipeIngredient">' + i + '</li>').join('') +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h3 style="color:var(--color-forest);display:flex;align-items:center;gap:0.375rem;"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Details</h3>' +
              '<div style="display:flex;flex-direction:column;gap:0.5rem;font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:1rem;">' +
                r.details.map(d => '<div>' + d[0] + ': <strong>' + d[1] + '</strong></div>').join('') +
              '</div>' +
              '<p style="font-size:var(--text-xs);color:var(--text-muted);line-height:var(--lh-relaxed);">' + r.desc + '</p>' +
              '<a href="blog-details.html?post=' + slug + '" class="btn btn-primary" style="margin-top:1rem;">Full Recipe \u2192</a>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  }

  /* ---- Re-enable reveal + scrollspy on injected content ---- */
  if (typeof initScrollReveal === 'function') initScrollReveal();
  if (typeof initScrollSpy === 'function') initScrollSpy();
};

/* ---- Related posts grid ---- */
const renderRelated = (except) => {
  const grid = document.getElementById('p-related');
  if (!grid) return;

  const picks = Object.keys(BLOG_POSTS).filter(k => k !== except).slice(0, 3);

  grid.innerHTML = picks.map((key, i) => {
    const p = BLOG_POSTS[key];
    return '<article class="blog-card" data-reveal="fade-up" data-delay="' + (i + 1) * 100 + '">' +
      '<div class="blog-card-img" style="background:var(--color-forest-50);display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
        '<img src="' + p.img + '" alt="' + p.title + '" style="width:100%;height:100%;object-fit:cover;">' +
      '</div>' +
      '<div class="blog-card-body">' +
        '<div class="blog-meta"><span>' + p.date + '</span></div>' +
        '<h3 class="blog-title"><a href="blog-details.html?post=' + key + '">' + p.title + '</a></h3>' +
        '<a href="blog-details.html?post=' + key + '" class="blog-read-more">Read More \u2192</a>' +
      '</div>' +
    '</article>';
  }).join('');

  if (typeof initScrollReveal === 'function') initScrollReveal();
};

document.addEventListener('DOMContentLoaded', renderBlogPost);