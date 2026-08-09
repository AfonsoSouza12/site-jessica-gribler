# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS (no build tools, no dependencies). Confirmed choice. Deploy target: GitHub Pages or similar (free static hosting).

## Users

**Primary:** Two equally important audiences with distinct jobs:

1. **Mothers seeking perinatal psychological care**
   - Job: Find a trusted psychologist for pre-natal and postpartum support; understand approach and schedule appointments
   - Situation: Pregnant or early postpartum, seeking mental health support aligned with personal values
   - Success: Clear conviction about the psychologist's expertise and approach → appointment booked via WhatsApp

2. **Psychologists/psychology students seeking professional development**
   - Job: Discover training, mentorship, or capacity-building in perinatal psychology from a recognized expert
   - Situation: Looking to expand professional skills or launch new practice areas
   - Success: Understand offering (courses, mentorship programs) → purchase/enroll

The site serves both audiences on a single page (bifurcated journey, shared content foundation).

## Product Purpose

Showcase Jéssica Griebler's expertise, clinical experience, and professional positioning as a perinatal psychologist, enabling two outcomes:
1. Convert mothers into consulting clients (pre-natal and postpartum psychological care via WhatsApp booking)
2. Convert psychologists/students into course/mentorship customers (training products via external platforms: Hotmart, Udemy, etc.)

Success: Steady lead flow for consulting + sustainable revenue from course/mentorship products.

## Positioning

**[OPEN — to be confirmed with Jéssica]**

Current hypothesis from existing content: deep clinical experience (5k+ maternal-infant sessions) + humanized, guilt-free care philosophy ("Here I see you, your story, your dreams, and the woman you want to become") + unique ability to teach other psychologists the same standard of care.

Confirm: Is the differentiator primarily **clinical credibility**, **teaching/transmission**, **care philosophy**, or a combination?

## Operating Context

**Jéssica's professional reality:**
- Licensed psychologist (CRP registration TBD)
- Specialist in perinatal psychology + health/hospital psychology
- 5,000+ maternal-infant sessions (documented clinical experience)
- Operates independently (clinical practice + course/mentorship business)
- Active on Instagram (@jessicagriebler)

**Typical customer journeys:**
- *Mothers:* Google/word-of-mouth → land on site → read about approach/experience → book WhatsApp call or send inquiry
- *Psychologists:* Google/LinkedIn/Instagram → land on site → review course offerings → purchase on external platform

## Capabilities and Constraints

**Implemented features:**
- Single-page site with five sections (hero, about, services for mothers, courses for professionals, contact)
- Mobile hamburger menu (responsive: desktop/tablet/mobile)
- WhatsApp integration (pre-filled message for consultations)
- Links to external course platforms (Hotmart, Udemy, Eduzz, etc.)
- Smooth scroll navigation
- Accessible HTML/CSS structure

**Data currently missing (required for launch):**
- [ ] WhatsApp number (real, format: 55DDXXXXXXXXX, e.g. 5511998765432)
- [ ] CRP registration number (format: XX/XXXXX, e.g. 10/12345)
- [ ] Live course/mentorship links (URLs for "Capacitação Do Pré-natal ao Puerpério", "Mentoria em Pré-natal Psicológico", "Mentoria Lumina")
- [ ] Professional photo (replaces "JG" placeholder avatars)
- [ ] Contact email (currently placeholder)

**Technical constraints:**
- Static site (no backend, no dynamic content)
- No database, no CMS, no authentication
- Dependent on external platforms for course sales (Hotmart, Udemy, etc.)
- No built-in analytics (can add GA4 post-launch)
- No email collection/newsletter capability (scope: WhatsApp for mothers, course links for professionals)

## Brand Commitments

**Voice & tone:** Warm, humanized, professional. Emphasizes care and seeing the whole person. No corporate jargon.

**Existing assets:**
- Instagram presence: @jessicagriebler (art direction, color palette, storytelling style)
- Three real products: 
  - "Capacitação Do Pré-natal ao Puerpério" (training course)
  - "Mentoria em Pré-natal Psicológico" (mentorship)
  - "Mentoria Lumina" (mentorship, possibly specialization)
- Two service lines: pre-natal psychological care + postpartum support (explicitly for mothers)
- Signature message: "Aqui eu vejo você, a sua história, os seus sonhos e a mulher que você quer se tornar." [Here I see you, your story, your dreams, and the woman you want to become.]

**Color palette (extracted from Instagram):**
- Primary: #7c06b8 (vibrant violet)
- Secondary: #350340 (deep plum)
- Accent: #b478d9 (light lilac)
- Background: #faf7fb (off-white)
- Text: #2c1533 (near-black)

**Typography:** Playfair Display (headings) + Poppins (body). Already imported and live in CSS.

## Evidence on Hand

**Real content already in site:**
- Full bio (2 paragraphs: hospital background → specialization → autonomous practice)
- Fact highlight: 5,000+ maternal-infant sessions
- Two real service descriptions (pre-natal psychology, postpartum support)
- Three real course/mentorship titles
- Professional mission statement in hero
- Instagram handle (@jessicagriebler) for verification

**Absent evidence (cannot fabricate):**
- Professional photo
- Testimonials/social proof (not collected yet)
- Case studies or detailed client stories
- Published research or credentials beyond CRP

## Product Principles

1. **Dual-user honesty:** Site serves two distinct jobs equally. Navigation, copy, and CTAs reflect different buyer personas without confusing them (no generic "products" section that dilutes the message for mothers seeking care).

2. **Clinical credibility first:** Jéssica's 5,000+ sessions and perinatal specialization are the foundation. Every claim in the site reflects evidence, not aspiration.

3. **Humanized over corporate:** Voice, design, and interaction prioritize warmth and seeing the whole person — consistent with "Aqui eu vejo você" philosophy.

4. **Operational simplicity:** No complex backend, no admin panel. Static site + external platforms for payments. Easy to maintain and iterate.

5. **Conversion clarity:** Every section has one clear job (mothers → WhatsApp booking, professionals → course purchase). No vague "explore more" wandering.

## Accessibility & Inclusion

**Required standards:**
- WCAG 2.1 AA (keyboard navigation, sufficient contrast, semantic HTML, alt text for images)
- Mobile-first responsive design (tested at 320px+)
- Language: Portuguese (Brazil); no i18n scope for now

**Known gaps:**
- None yet (to be identified in audit phase)

---

## Notes for Implementation

- **Positioning:** Confirm with Jéssica the explicit differentiator (clinical depth, teaching ability, care philosophy) before final design pass. Current hypothesis is strong but not yet confirmed in conversation.
- **Photography:** Site quality depends heavily on professional photo. Recommend headshot + studio environment (aligns with brand warmth).
- **Course links:** Ensure all three external URLs are live before launch.
- **Design direction:** Multiple visual concepts explored (Lumina, Acolhimento, Bento, etc.). Final direction TBD pending positioning confirmation and design review.
