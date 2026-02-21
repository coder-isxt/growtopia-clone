Cosmetic PNG assets folder

How to add a new cosmetic:
1) Put your PNG into one of:
   - assets/cosmetics/clothes/
   - assets/cosmetics/wings/
   - assets/cosmetics/swords/
2) Add or edit the item entry in items.js and set:
   - id
   - slot list (clothes/wings/swords)
   - image: "<slot>/<file>.png"

Notes:
- PNG with transparent background is recommended.
- Missing image files automatically fall back to the old procedural cosmetic rendering.
- Suggested base sizes:
  clothes: around 20x14
  wings: around 36x22
  swords: around 14x6
